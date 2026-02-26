'use client'

import Box from '@mui/material/Box'
import { useClerk, useUser } from '@clerk/nextjs';
import Button from '@mui/material/Button';
import { FaPowerOff } from "react-icons/fa";
import Typography from '@mui/material/Typography';
import SimpleImage from '../SimpleImage';

export default function PersonalInfo() {
  const { user } = useUser();
  const { signOut } = useClerk();

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
          <Button
            variant='contained'
            title='Logout'
            color='error'
            size='small'
            className='w-fit min-w-0 aspect-square'
            onClick={() => signOut({ redirectUrl: '/login' })}
          >
            <FaPowerOff />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
