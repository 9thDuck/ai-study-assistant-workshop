import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { ChatMessage, ChatMessageProps } from '../ChatMessage'

export type ChatMessagesProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'data'
> & {
  data?: Pick<ChatMessageProps, 'message' | 'role' | 'disableAnimation'>[]
  onStartMessageEdit: (messageIdx: number) => void
  onCancelMessageEdit: () => void
  messageUnderEditIdx: number | null
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({
  data = [],
  onStartMessageEdit,
  onCancelMessageEdit,
  messageUnderEditIdx,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const messagesRef = useRef(data)

  useEffect(() => {
    if (!ref.current) return

    const scrollToBottom = () => {
      const scrollElement = ref.current?.parentElement || ref.current
      scrollElement!.scrollTop = scrollElement!.scrollHeight
    }

    if (messagesRef.current.length !== data.length) {
      scrollToBottom()
    }

    const resizeObserver = new ResizeObserver(() => {
      scrollToBottom()
    })

    resizeObserver.observe(ref.current)

    messagesRef.current = data

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current)
      }
    }
  }, [data])

  return (
    <div
      {...props}
      ref={ref}
      className={clsx(
        'flex flex-col gap-8 w-full overflow-x-hidden',
        props.className,
      )}
    >
      {data.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          message={message.message}
          disableAnimation={message.disableAnimation || index < data.length - 1}
          onStartMessageEdit={() => onStartMessageEdit(index)}
          onCancelMessageEdit={onCancelMessageEdit}
          messageUnderEdit={messageUnderEditIdx === index}
        />
      ))}
    </div>
  )
}
