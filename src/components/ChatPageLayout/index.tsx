import { PersistedChat } from '@/types/data.types'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'
import NewChatIcon from '../icons/NewChatIcon'
import SidebarIcon from '../icons/SidebarIcon'

type PageProps = {
  children: ReactNode
  onOpenNewChat: () => void
  chats: PersistedChat[]
  selectedChatId: number | null
  onSelectChat: (chatId: number) => void
}

const SidebarToggleButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="ghost"
    className="absolute top-5 left-0 border-none w-fit h-fit z-[1] rounded-lg"
    onClick={onClick}
  >
    <SidebarIcon className="w-6 h-6" />
  </Button>
)

const NewChatButton = ({ onClick }: { onClick: () => void }) => (
  <Button
    variant="ghost"
    className="w-fit h-fit flex items-center justify-center border-none rounded-lg"
    onClick={onClick}
  >
    <NewChatIcon className="w-5 h-5" />
  </Button>
)

const ChatList = ({
  chats,
  selectedChatId,
  onSelectChat,
}: {
  chats: PersistedChat[]
  selectedChatId: number | null
  onSelectChat: (chatId: number) => void
}) => (
  <div className="flex flex-col gap-1">
    {chats.map((chat) => (
      <Button
        key={chat.id}
        variant="ghost"
        className={clsx(
          'w-full h-fit flex items-center justify-start gap-2 p-2 rounded-sm',
          chat.id === selectedChatId ? 'bg-gray-200' : 'bg-white border-none',
        )}
        onClick={() => onSelectChat(chat.id)}
      >
        {chat.title}
      </Button>
    ))}
  </div>
)

const Sidebar = ({
  isOpen,
  onOpenNewChat,
  chats,
  selectedChatId,
  onSelectChat,
}: {
  isOpen: boolean
  onOpenNewChat: () => void
  chats: PersistedChat[]
  selectedChatId: number | null
  onSelectChat: (chatId: number) => void
}) => (
  <aside
    className={clsx(
      'w-[280px] bg-gray-50 shadow-md absolute top-0 left-0 h-full transition-transform duration-300 ease-in-out p-2',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    )}
  >
    <div className="h-[60px] flex items-center justify-end px-4 w-full">
      <NewChatButton onClick={onOpenNewChat} />
    </div>
    <ChatList
      chats={chats}
      selectedChatId={selectedChatId}
      onSelectChat={onSelectChat}
    />
  </aside>
)

const MainContent = ({
  children,
  isSidebarOpen,
}: {
  children: ReactNode
  isSidebarOpen: boolean
}) => (
  <section
    className={clsx(
      'flex-1 p-2 border-x-small border-gray-200 transition-margin duration-300 ease-in-out pl-5',
      isSidebarOpen ? 'ml-[280px]' : 'ml-0',
    )}
  >
    {children}
  </section>
)

const Page = ({
  children,
  onOpenNewChat,
  chats,
  onSelectChat,
  selectedChatId,
}: PageProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <main className="h-screen flex container mx-auto relative overflow-hidden">
      <SidebarToggleButton onClick={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        onOpenNewChat={onOpenNewChat}
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={onSelectChat}
      />
      <MainContent isSidebarOpen={isSidebarOpen}>{children}</MainContent>
    </main>
  )
}

export default Page
