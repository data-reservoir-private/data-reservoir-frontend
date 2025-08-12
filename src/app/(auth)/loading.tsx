import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

export default function Loading() {
  return (
    <Box className="p-0 flex flex-col gap-2">
      <Skeleton variant='rounded' className='w-full h-24' />
      <Skeleton variant='rounded' className='w-full h-2' />

      <Box className="flex gap-3">
        <Skeleton variant='rounded' className='w-full h-36' />
        <Skeleton variant='rounded' className='w-full h-36' />
        <Skeleton variant='rounded' className='w-full h-36' />
      </Box>

      <Skeleton variant='rounded' className='w-full h-72' />
    </Box>
  )
}
