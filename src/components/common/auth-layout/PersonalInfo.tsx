'use client'

import Box from '@mui/material/Box'
import React from 'react'
import { useClerk } from '@clerk/nextjs';
import Button from '@mui/material/Button';
import { FaPowerOff } from "react-icons/fa";

export default function PersonalInfo() {
  const { signOut } = useClerk();

  return (
    <Box>
      <Box className='w-full'>
        <Box className='flex gap-2 items-center p-1 rounded'>
          <Button variant='contained' title='Logout' color='error' size='small' className='w-fit min-w-0 aspect-square' onClick={() => signOut({ redirectUrl: '/login' })}>
            <FaPowerOff />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
