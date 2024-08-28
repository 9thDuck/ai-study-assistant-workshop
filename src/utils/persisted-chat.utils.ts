import { PersistedChat } from '@/types/data.types'
import { settle } from './async.utils'

export const persistChat = async (chats: PersistedChat[]): Promise<void> => {
  const [_, err] = await settle(
    new Promise((res, rej) => {
      localStorage.setItem('chats', JSON.stringify(chats))
      res(void 0)
    }),
  )

  if (err) {
    console.error('Error persisting chat', err)
  }
}

export const getChats = async (): Promise<PersistedChat[]> => {
  const [chats, err] = await settle(
    new Promise<PersistedChat[]>((res, rej) => {
      res(JSON.parse(localStorage.getItem('chats') || '[]'))
    }),
  )

  if (err) {
    console.error('Error getting chats', err)
    return []
  }

  return chats
}
