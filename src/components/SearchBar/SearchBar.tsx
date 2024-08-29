import { FileTypeFilter } from '@/types/data.types'
import { Button, Input, InputProps } from '@nextui-org/react'
import clsx from 'clsx'
import React from 'react'
import { SearchIcon } from '../icons'
import WithTooltip from '../WithTooltip'
import SearchFileTypeFilter from './SearchFileTypeFilter'

export type SearchBarProps = Omit<
  React.HTMLProps<HTMLDivElement>,
  'value' | 'onChange'
> & {
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  pending?: boolean
  fileType: FileTypeFilter
  setFileType: (fileType: FileTypeFilter) => void

  inputProps?: InputProps
  formProps?: React.HTMLProps<HTMLFormElement>
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  pending = false,
  onChange,
  onSubmit,
  fileType,
  setFileType,
  inputProps = {},
  formProps = {},
  className,
  ...props
}) => {
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(e)
    }
  }

  return (
    <div className={clsx('w-full', className)} {...props}>
      <form
        className={clsx(
          formProps.className,
          'w-full flex items-center gap-2 flex-col',
        )}
        onSubmit={onFormSubmit}
        {...formProps}
      >
        <div className="flex items-center gap-2 w-full">
          <Input
            placeholder="Search..."
            variant="bordered"
            radius="none"
            value={value}
            onChange={onChange}
            className={clsx(inputProps.className)}
            {...inputProps}
          />
          <WithTooltip position="left" tooltip="Search">
            <Button
              isIconOnly
              radius="none"
              variant="solid"
              color="primary"
              className="fill-white"
              type="submit"
              isLoading={pending}
            >
              <SearchIcon />
            </Button>
          </WithTooltip>
        </div>
        <SearchFileTypeFilter fileType={fileType} setFileType={setFileType} />
      </form>
    </div>
  )
}
