'use client'

import Box from '@mui/material/Box'
import { SignOutButton, useUser } from '@clerk/nextjs';
import Button from '@mui/material/Button';
import { FaPowerOff } from "react-icons/fa";
import Typography from '@mui/material/Typography';
import SimpleImage from '../SimpleImage';

export default function PersonalInfo() {
  const { user } = useUser();

  return (
    <Box>
      <Box className='w-full'>
        <Box className='flex gap-2 items-center p-1 rounded'>
          {
            user &&
            <Box className='flex gap-2 items-center'>
              <Box className='w-10 h-10 rounded-full relative'>
                <SimpleImage src={user.imageUrl} className='rounded-full' alt='Picture' unoptimized/>
              </Box>
              <Typography variant='subtitle2' className='max-sm:hidden'>{user.firstName}</Typography>
            </Box>
          }
          <SignOutButton component='div' redirectUrl='/login'>
            <Button variant='contained' title='Logout' color='error' size='small' className='w-fit min-w-0 aspect-square'>
              <FaPowerOff />
            </Button>
          </SignOutButton>
        </Box>
      </Box>
    </Box>
  )
}
