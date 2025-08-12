import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: "404 Not Found - Data Reservoir"
}

export default function NotFoundPage() {
  return (
    <Box className="w-full flex flex-col items-center justify-center gap-3 p-3 h-[80svh]">
      <Typography variant='h2' className='text-white'>🔎</Typography>
      <Typography variant='h4' className='text-white'>Hmm... where on earth are we?</Typography>
      <Link passHref href='/'>
        <Button type='button' variant='contained'>Take me back</Button>
      </Link>
    </Box>
  )
}
