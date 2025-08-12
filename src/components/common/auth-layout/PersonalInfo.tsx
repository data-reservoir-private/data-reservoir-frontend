'use client'

import Box from '@mui/material/Box'
import Image from 'next/image';
import React from 'react'
import { useClerk, useUser } from '@clerk/nextjs';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FaPowerOff } from "react-icons/fa";

export default function PersonalInfo() {
  const { isLoaded, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded || !user) return (
    <Box>
      <Skeleton variant='circular' width={30} height={30} />
    </Box>
  )

  return (
    <Box>
      <Box className='w-full'>
        <Box className='flex gap-2 items-center p-1 rounded'>
          <Image src={user.imageUrl ?? ""} alt={user.username ?? "User"} className='rounded-full' width={30} height={30} />
          <Typography variant='body2'>{user.username ?? "USER"}</Typography>
          <Button variant='contained' color='error' size='small' className='w-fit min-w-0 aspect-square' onClick={() => signOut({ redirectUrl: '/login' })}>
            <FaPowerOff />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
