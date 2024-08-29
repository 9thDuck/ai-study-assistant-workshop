import { ApiChatMessage } from '@/services/api'

export type FileType =
  | 'folder'
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'pdf'

export type FileData = {
  id: string
  name: string
  type: FileType
  excerpt?: string
  tags?: string[]
  path: string[]
  extension?: string

  children?: FileData[]

  metadata: {
    id: string
    __typename: string
  }
}

export type FileTypeFilter = Omit<FileType, 'folder'> | 'all'

export type PersistedMessasge = ApiChatMessage

export type PersistedChat = {
  id: number
  title: string
  files: string[]
  fileType: FileTypeFilter
  messages: PersistedMessasge[]
  createdAt: number
}
