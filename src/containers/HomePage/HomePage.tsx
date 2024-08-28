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
} from '@/utils/persisted-chat.utils'
import { populateDirs } from '@/utils/populateDirs.util'
import React, { useEffect, useMemo, useState } from 'react'

export type HomePageProps = React.HTMLProps<HTMLDivElement>

export const HomePage: React.FC<HomePageProps> = ({ className, ...props }) => {
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

  const onPrompt = async (prompt: string) => {
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

    const timeNowInMs = Date.now()

    if (!selectedChatId) {
      const chatId = timeNowInMs
      const newChat = {
        id: chatId,
        title: prompt,
        files: selectedFiles,
        fileType,
        messages: [
          { ...userMessage, createdAt: timeNowInMs },
          { ...messageRes.message, createdAt: timeNowInMs },
        ],
        createdAt: timeNowInMs,
      }

      setSelectedChatId(chatId)

      const updatedChats = [...chats, newChat]
      persistChats(updatedChats)
      setChats(updatedChats)
    } else {
      const updatedChats = chats.map((chat) => {
        if (chat.id !== selectedChatId) {
          return chat
        }

        return {
          ...chat,
          messages: [
            ...chat.messages,
            { ...userMessage, createdAt: timeNowInMs },
            { ...messageRes.message, createdAt: timeNowInMs },
          ],
        }
      })

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
    if (!chat) return

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
