import { Checkbox, CheckboxProps } from '@headlessui/react'
import classNames from 'classnames'
import React from 'react'
import { BiCheck } from 'react-icons/bi'

export default function SimpleCheckbox(props: CheckboxProps) {
  return (
    <Checkbox {...props} className={classNames('group block size-4 rounded border bg-none data-[checked]:bg-white')}>
      <BiCheck className='text-blackish hidden group-data-[checked]:block font-bold'/>
    </Checkbox>
  )
}
