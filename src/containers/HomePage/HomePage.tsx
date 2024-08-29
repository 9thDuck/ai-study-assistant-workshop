import { ChatMessages } from '@/components/ChatMessages'
import ChatPageLayout from '@/components/ChatPageLayout'
import { MessageBar } from '@/components/MessageBar'
import { Search } from '@/components/Search'
import { ChatLayout } from '@/layouts/ChatLayout/Chat.layout'
import { useSearch } from '@/queries/useSearch'
import { ApiChatMessage, chatApi } from '@/services/api'
import { FileTypeFilter, PersistedChat } from '@/types/data.types'
import {
  getChats,
  persistChat as persistChats,
} from '@/utils/persistChat.utils'
import { populateDirs } from '@/utils/populateDirs.util'
import React, { useEffect, useMemo, useState } from 'react'

export type HomePageProps = React.HTMLProps<HTMLDivElement>

export const HomePage: React.FC<HomePageProps> = () => {
  const [query, setQuery] = useState('')
  const [prompt, setPrompt] = useState('')
  const [fileType, setFileType] = useState<FileTypeFilter>('all')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [messages, setMessages] = useState<ApiChatMessage[]>([])
  const [generating, setGenerating] = useState(false)
  const [chats, setChats] = useState<PersistedChat[]>([])
  const [selectedChatId, setSelectedChatId] = useState<number | null>(
    chats?.[0]?.id || null,
  )
  const [messageUnderEditIdx, setMessageUnderEditIdx] = useState<number | null>(
    null,
  )
  const [autoTriggerPrompt, setAutoTriggerPrompt] = useState(false)

  const handleStartMessageEdit = (messageIdx: number) => {
    setMessageUnderEditIdx(messageIdx)
    setPrompt(messages[messageIdx].message)
  }

  const handleCancelMessageEdit = () => {
    setMessageUnderEditIdx(null)
    setPrompt('')
  }

  const search = useSearch(
    { query, type: fileType },
    {
      cacheTime: 0,
      enabled: false,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )

  const fileList = useMemo(
    () => populateDirs(search.data?.files || []),
    [search.data],
  )

  const onSearch = async () => {
    search.refetch()
  }

  useEffect(() => {
    if (!autoTriggerPrompt) return

    onPrompt(prompt)
    setAutoTriggerPrompt(false)
  }, [autoTriggerPrompt])

  const onPrompt = async (prompt: string) => {
    const timeNowInMs = Date.now()
    // If we were editing a message before submitting the prompt, we will create a new chat with the edited message(along with history upto that message) and push it to the top of the list
    if (messageUnderEditIdx !== null) {
      const messageHistory = [...messages.slice(0, messageUnderEditIdx)]
      const newChat: PersistedChat = {
        files: selectedFiles,
        fileType,
        messages: messageHistory,
        createdAt: timeNowInMs,
        id: timeNowInMs,
        title: prompt,
      }
      const newChats = [newChat, ...chats]
      setChats(newChats)
      persistChats(newChats)
      setSelectedChatId(newChat.id)
      setMessages(messageHistory)
      setMessageUnderEditIdx(null)
      // We will also trigger a new prompt submission once we have created a new chat and navigated to it.
      setAutoTriggerPrompt(true)
      return
    }

    setGenerating(true)
    const userMessage: ApiChatMessage = {
      role: 'user',
      message: prompt,
    }

    setMessages((value) => [...value, userMessage])

    const messageRes = await chatApi({
      prompt,
      files: fileList.filter((f) => selectedFiles.includes(f.id)),
      history: messages,
    })

    setGenerating(false)
    setMessages((value) => [...value, messageRes.message])
    setPrompt('')

    // Create new chat if no chat is selected
    if (!selectedChatId) {
      const chatId = timeNowInMs
      const newChat: PersistedChat = {
        id: chatId,
        title: prompt,
        files: selectedFiles,
        fileType,
        messages: [userMessage, messageRes.message],
        createdAt: timeNowInMs,
      }

      setSelectedChatId(chatId)

      const updatedChats = [...chats, newChat]
      persistChats(updatedChats)
      setChats(updatedChats)
    } else {
      let updatedChatIdx = -1

      const updatedChats = chats.map((chat, idx) => {
        if (chat.id !== selectedChatId) {
          return chat
        }

        updatedChatIdx = idx

        return {
          ...chat,
          messages: [...chat.messages, userMessage, messageRes.message],
        }
      })

      // Bring the updated chat to the top of the list
      updatedChats.unshift(updatedChats.splice(updatedChatIdx, 1)[0])

      persistChats(updatedChats)
      setChats(updatedChats)
    }
  }

  useEffect(() => {
    setSelectedFiles([])
  }, [search.data])

  useEffect(() => {
    onSearch()
    getChats().then(setChats)
  }, [])

  const handleOpenNewChat = () => {
    setSelectedFiles([])
    setMessages([])
    setPrompt('')
    setSelectedChatId(null)
    setGenerating(false)
    setFileType('all')
    setQuery('')
    onSearch()
  }

  const handleSelectChat = (chatId: number) => {
    const chat = chats.find((c) => c.id === chatId)
    if (!chat || generating) return

    setSelectedFiles(chat.files)
    setMessages(chat.messages)
    setPrompt('')
    setFileType(chat.fileType)
    setSelectedChatId(chatId)
    setGenerating(false)
    setQuery('')
  }

  return (
    <ChatPageLayout
      selectedChatId={selectedChatId}
      onOpenNewChat={handleOpenNewChat}
      chats={chats}
      onSelectChat={handleSelectChat}
    >
      <ChatLayout
        messageBar={
          <MessageBar
            hide={selectedFiles.length === 0}
            prompt={prompt}
            onPromptChange={setPrompt}
            onSubmit={(prompt) => onPrompt(prompt)}
            loading={generating}
            disabled={generating}
          />
        }
      >
        <Search
          fileType={fileType}
          setFileType={setFileType}
          compact={messages.length > 0}
          searching={search.isFetching}
          query={query}
          onQueryChange={(v) => setQuery(v)}
          onSearch={onSearch}
          results={fileList}
          onSelect={(selected) => setSelectedFiles(selected)}
          selectedFiles={selectedFiles}
        />
        <ChatMessages
          messageUnderEditIdx={messageUnderEditIdx}
          onStartMessageEdit={handleStartMessageEdit}
          onCancelMessageEdit={handleCancelMessageEdit}
          className="py-[20px]"
          data={messages.map((msg) => ({
            role: msg.role,
            message: msg.message,
          }))}
        />
      </ChatLayout>
    </ChatPageLayout>
  )
}
