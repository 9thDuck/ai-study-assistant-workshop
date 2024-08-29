import { Avatar } from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'
import { useAnimatedText } from '../AnimatedText'
import CloseIcon from '../icons/CloseIcon'
import EditIcon from '../icons/EditIcon'
import WithTooltip from '../WithTooltip'

export type ChatMessageProps = Omit<React.HTMLProps<HTMLDivElement>, 'role'> & {
  message: string
  role: 'user' | 'assistant'
  disableAnimation?: boolean
  onStartMessageEdit: () => void
  onCancelMessageEdit: () => void
  messageUnderEdit: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  role,
  disableAnimation = false,
  onStartMessageEdit,
  onCancelMessageEdit,
  messageUnderEdit,
  ...props
}) => {
  const content = useAnimatedText(message, {
    maxTime: 1000,
    disabled: role === 'user' || disableAnimation,
  })

  return (
    <div {...props} className={clsx('', props.className)}>
      <div className="flex flex-row gap-4 items-start">
        <Avatar
          className="flex-shrink-0"
          showFallback
          color={role === 'assistant' ? 'primary' : 'default'}
          name={role === 'assistant' ? 'A' : ''}
          classNames={{
            name: 'text-[16px]',
          }}
        />
        <div className="flex items-start justify-between flex-grow border border-gray-200 rounded-lg p-4 text-md bg-white shadow-sm -mt-1">
          <div className="whitespace-pre-wrap break-words flex-grow-6 pr-3">
            {content}
          </div>
          {role === 'user' &&
            (messageUnderEdit ? (
              <WithTooltip tooltip="Cancel edit">
                <CloseIcon
                  className="w-6 h-6 mr-20"
                  onClick={onCancelMessageEdit}
                />
              </WithTooltip>
            ) : (
              <WithTooltip tooltip="Edit message">
                <EditIcon
                  className="w-6 h-6 mr-20"
                  onClick={onStartMessageEdit}
                />
              </WithTooltip>
            ))}
        </div>
      </div>
    </div>
  )
}
