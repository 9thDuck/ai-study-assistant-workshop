import React from 'react'

type EditIconProps = React.SVGAttributes<SVGElement>

const EditIcon: React.FC<EditIconProps> = ({ ...props }) => {
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
        <g id="Edit / Edit_Pencil_02">
          {' '}
          <path
            id="Vector"
            d="M4 16.0001V20.0001L8 20.0001L18.8686 9.13146L18.8695 9.13061C19.265 8.73516 19.4628 8.53736 19.5369 8.3092C19.6021 8.10835 19.6022 7.89201 19.5369 7.69117C19.4627 7.46284 19.2646 7.26474 18.8686 6.86872L17.1288 5.12892C16.7345 4.7346 16.5369 4.53704 16.3091 4.46301C16.1082 4.39775 15.8919 4.39775 15.691 4.46301C15.463 4.53709 15.2652 4.73488 14.8704 5.12976L14.8686 5.13146L4 16.0001Z"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>{' '}
        </g>{' '}
      </g>
    </svg>
  )
}

export default EditIcon
