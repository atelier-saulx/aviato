import React, { FunctionComponent } from 'react'

export const Arrow: FunctionComponent = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
        fill="#0F1013"
        fillOpacity="0.1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 7.83443C9 7.19139 9.50233 6.79074 9.90232 7.11475L14.7023 11.2803C15.0992 11.6018 15.0992 12.3982 14.7023 12.7197L9.90232 16.8852C9.50233 17.2093 9 16.8086 9 16.1656V7.83443Z"
        fill="#0F1013"
        fillOpacity="0.87"
      />
    </svg>
  )
}
