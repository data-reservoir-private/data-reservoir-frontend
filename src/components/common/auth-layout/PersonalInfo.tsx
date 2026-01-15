import { SignOutButton, useUser } from '@clerk/tanstack-react-start';
import Button from '@mui/material/Button';
import { FaPowerOff } from "react-icons/fa";
import Typography from '@mui/material/Typography';
import SimpleImage from '../SimpleImage';
import { Box } from '@mui/material';

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
              <Typography variant='subtitle2'>{user.firstName}</Typography>
            </Box>
          }
          <SignOutButton redirectUrl='/login'>
            <Box>
              <Button variant='contained' title='Logout' color='error' size='small' className='aspect-square min-w-0!'>
                <FaPowerOff />
              </Button>
            </Box>
          </SignOutButton>
        </Box>
      </Box>
    </Box>
  )
}
