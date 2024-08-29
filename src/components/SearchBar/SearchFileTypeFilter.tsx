import { FileTypeFilter } from '@/types/data.types'
import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import {
  AudioFileIcon,
  DescriptionIcon,
  ImageIcon,
  PdfFileIcon,
  VideoFileIcon,
} from '../icons'
import WithTooltip from '../WithTooltip'

type SearchFileTypeFilterProps = {
  fileType: FileTypeFilter
  setFileType: (fileType: FileTypeFilter) => void
}

const SearchFileTypeFilter = ({
  fileType,
  setFileType,
}: SearchFileTypeFilterProps) => {
  const buttons = [
    {
      icon: DescriptionIcon,
      label: 'Docs',
      color: 'fill-blue-500',
      value: 'document',
    },
    { icon: PdfFileIcon, label: 'PDF', color: 'fill-red-500', value: 'pdf' },
    { icon: ImageIcon, label: 'Images', color: 'fill-red-500', value: 'image' },
    {
      icon: AudioFileIcon,
      label: 'MP3/Audio',
      color: 'fill-orange-500',
      value: 'audio',
    },
    {
      icon: VideoFileIcon,
      label: 'MP4/Video',
      color: 'fill-blue-500',
      value: 'video',
    },
  ]

  const handleClick = (value: FileTypeFilter) => {
    if (value === fileType) {
      setFileType('all')
    } else {
      setFileType(value)
    }
  }

  return (
    <div className="flex gap-4 w-full mt-5 justify-center items-center flex-wrap">
      {buttons.map(({ icon: Icon, label, color, value }) => {
        const selected = fileType === value
        return (
          <WithTooltip
            tooltip={`${selected ? 'Remove filter ' : 'Filter '}by ${label}`}
            position="top"
            key={value}
          >
            <Button
              variant="light"
              className={clsx(
                'px-3 py-2 min-w-0 h-auto rounded-r-full rounded-l-full transition-all',
                selected ? 'bg-gray-100' : 'hover:bg-gray-50',
              )}
              onClick={() => handleClick(value)}
            >
              <Icon className={clsx('w-5 h-5', color)} />
              <span className="ml-2 text-sm text-gray-600">{label}</span>
            </Button>
          </WithTooltip>
        )
      })}
    </div>
  )
}

export default SearchFileTypeFilter
