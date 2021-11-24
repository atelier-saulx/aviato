import React, { FunctionComponent } from 'react'
import { useColor } from '../../theme'
import { SvgProps } from '..'

const Search: FunctionComponent<SvgProps> = ({
  color,
  framed,
  size,
  frameColor,
}) => {
  const c = useColor(color)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {framed ? (
        <rect width="24" height="24" rx="4" fill={useColor(frameColor)} />
      ) : null}
      <path
        d="M11.0078 17.0156C12.3125 17.0156 13.5156 16.5938 14.5 15.8906L18.2031 19.5938C18.375 19.7656 18.6016 19.8516 18.8438 19.8516C19.3516 19.8516 19.7109 19.4609 19.7109 18.9609C19.7109 18.7266 19.6328 18.5 19.4609 18.3359L15.7812 14.6484C16.5547 13.6328 17.0156 12.375 17.0156 11.0078C17.0156 7.70312 14.3125 5 11.0078 5C7.71094 5 5 7.69531 5 11.0078C5 14.3125 7.70312 17.0156 11.0078 17.0156ZM11.0078 15.7188C8.42969 15.7188 6.29688 13.5859 6.29688 11.0078C6.29688 8.42969 8.42969 6.29688 11.0078 6.29688C13.5859 6.29688 15.7188 8.42969 15.7188 11.0078C15.7188 13.5859 13.5859 15.7188 11.0078 15.7188Z"
        fill={c}
      />
    </svg>
  )
}

export default Search
