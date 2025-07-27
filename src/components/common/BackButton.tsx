'use client'

import ButtonBase from '@mui/material/ButtonBase'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaAngleLeft } from 'react-icons/fa6'

export default function BackButton() {
  const router = useRouter();
  
  return (
    <ButtonBase title='Back to Previous Page' className='w-7 rounded-sm' onClick={() => router.back()}>
      <FaAngleLeft />
    </ButtonBase>
  )
}
