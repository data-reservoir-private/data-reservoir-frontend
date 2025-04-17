import { Button, ButtonProps } from '@headlessui/react'
import classNames from 'classnames'
import React from 'react'

export default function SimpleButton(props: ButtonProps) {
  return (
    <Button {...props} className={classNames(
      'rounded bg-sky-600 py-1 px-3 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700'
    )}>

    </Button>
  )
}
