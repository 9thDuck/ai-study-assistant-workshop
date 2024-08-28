import clsx from 'clsx'
import React, { useState } from 'react'

interface WithTooltipProps extends React.HTMLProps<HTMLDivElement> {
  tooltip: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const WithTooltip: React.FC<WithTooltipProps> = ({
  children,
  tooltip,
  position = 'bottom',
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const tooltipClasses = clsx(
    'absolute z-10 bg-gray-800 text-white p-2 rounded shadow-lg whitespace-nowrap',
    {
      'bottom-full left-1/2 transform -translate-x-1/2 mb-2':
        position === 'top',
      'top-full left-1/2 transform -translate-x-1/2 mt-2':
        position === 'bottom',
      'right-full top-1/2 transform -translate-y-1/2 mr-2': position === 'left',
      'left-full top-1/2 transform -translate-y-1/2 ml-2': position === 'right',
    },
  )

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && <div className={tooltipClasses}>{tooltip}</div>}
    </div>
  )
}

export default WithTooltip
