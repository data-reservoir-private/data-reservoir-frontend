import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import React from 'react'

export default function GridLoading() {
  return (
    <Box className='flex flex-col gap-3'>
      <Skeleton className='w-full h-10' variant='rounded'/>
      <Skeleton className='w-full h-40' variant='rounded' />
      <Box className='flex flex-wrap justify-center gap-4'>
        {
          new Array(20).fill(0).map((_, idx) => 
            <Skeleton className='w-20 h-20' variant='rounded' key={idx}/>
          )
        }
      </Box>
    </Box>
  )
}
