import React, { FunctionComponent } from 'react'

type CheckedIconProps = {
  size?: 'small' | 'medium'
}

export const CheckedIcon: FunctionComponent<CheckedIconProps> = ({
  size = 'small',
}) => {
  if (size === 'small') {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.43254 7.87189L2.78033 6.21968C2.48743 5.92679 2.01256 5.92679 1.71967 6.21968C1.42678 6.51257 1.42678 6.98745 1.71967 7.28034L3.96966 9.53032C4.2876 9.84826 4.81193 9.81692 5.08972 9.46336L10.3397 3.46339C10.5956 3.13769 10.539 2.6662 10.2133 2.41029C9.88763 2.15438 9.41614 2.21096 9.16023 2.53666L4.43254 7.87189Z"
          fill="white"
        />
      </svg>
    )
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.91006 10.4959L3.7071 8.29291C3.31658 7.90239 2.68342 7.90239 2.29289 8.29291C1.90237 8.68343 1.90237 9.3166 2.29289 9.70712L5.29288 12.7071C5.7168 13.131 6.4159 13.0892 6.7863 12.6178L13.7863 4.61786C14.1275 4.18359 14.0521 3.55494 13.6178 3.21372C13.1835 2.87251 12.5549 2.94795 12.2136 3.38222L5.91006 10.4959Z"
        fill="white"
      />
    </svg>
  )
}

type IndeterminateIconProps = {
  size?: 'small' | 'medium'
}

export const IndeterminateIcon: FunctionComponent<IndeterminateIconProps> = ({
  size = 'small',
}) => {
  if (size === 'small') {
    return (
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="1.5" y="5.25" width="9" height="1.5" rx="0.75" fill="white" />
      </svg>
    )
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="7" width="12" height="2" rx="1" fill="white" />
    </svg>
  )
}
