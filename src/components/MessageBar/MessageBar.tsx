import { Button, TextAreaProps, Textarea } from '@nextui-org/react'
import clsx from 'clsx'
import React, { memo } from 'react'
import { SendIcon } from '../icons/SendIcon'
import WithTooltip from '../WithTooltip'

export type MessageBarProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'onSubmit'
> & {
  hide?: boolean
  disabled?: boolean
  loading?: boolean
  prompt?: string
  onSubmit?: (prompt: string) => void
  onPromptChange?: (prompt: string) => void

  textareaProps?: TextAreaProps
}

export const MessageBar: React.FC<MessageBarProps> = memo(
  ({
    prompt,
    hide,
    disabled = false,
    loading = false,
    onPromptChange,
    onSubmit,
    textareaProps = {},
    ...props
  }) => {
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (prompt && onSubmit) {
        onSubmit(prompt)
      }
    }

    return (
      <div
        {...props}
        className={clsx(
          'pb-2 transition translate-y-0 opacity-100 w-auto max-w-full',
          hide && ['opacity-0', 'invisible', 'translate-y-full'],
          props.className,
        )}
      >
        <form
          className="flex flex-row gap-2 items-end p-3"
          onSubmit={onFormSubmit}
        >
          <Textarea
            size="lg"
            minRows={1}
            maxRows={8}
            value={prompt}
            variant="bordered"
            placeholder="Type a message..."
            classNames={{
              inputWrapper: 'border-gray-100 hover:border-gray-100',
            }}
            onValueChange={(value) => onPromptChange?.(value)}
            isDisabled={disabled || loading}
            {...textareaProps}
            className={clsx(textareaProps.className)}
          />
          <WithTooltip position="left" tooltip="Send">
            <Button
              isIconOnly
              color="primary"
              size="lg"
              type="submit"
              isDisabled={
                disabled ||
                loading ||
                prompt?.replaceAll('\n', '').trim().length === 0
              }
              isLoading={loading}
            >
              <SendIcon className="fill-white" />
            </Button>
          </WithTooltip>
        </form>
      </div>
    )
  },
)
