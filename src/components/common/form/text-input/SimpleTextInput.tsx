import classNames from 'classnames'
import React, { HTMLProps } from 'react'

export default function SimpleTextInput(props: HTMLProps<HTMLInputElement>) {
  return (
    <input {...props} className={classNames(
      'overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50',
      'inline-flex items-center rounded-sm border-2 px-3 py-1 text-sm border-gray-500 bg-gray-600 text-white outline-none',
      props.className)
    }></input>
  )
}
