import React from 'react'

type CloseIconProps = React.SVGAttributes<SVGElement>

const CloseIcon: React.FC<CloseIconProps> = ({ ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {' '}
        <rect width="24" height="24" fill="white"></rect>{' '}
        <path
          d="M7 17L16.8995 7.10051"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{' '}
        <path
          d="M7 7.00001L16.8995 16.8995"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{' '}
      </g>
    </svg>
  )
}

export default CloseIcon
