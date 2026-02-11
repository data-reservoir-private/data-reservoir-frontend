import Paper from '@/components/common/paper/Paper';
import { Suspense } from 'react';
import { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SignInButton } from '@clerk/nextjs';
import Button from '@mui/material/Button';
import { FaGithub } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Login - Data Reservoir'
};

type searchParamsType = Promise<{ message: string }>

export default async function LoginPage(props: { searchParams: searchParamsType }) {
  const searchP = props.searchParams;
  return (
    <>
      <Box className='w-full h-svh flex items-center justify-center p-10'>
        <Paper className='w-fit px-12 py-7'>
          <Box className='flex gap-2 flex-col'>
            <Suspense fallback={<></>}>
              <Message message={searchP} />
            </Suspense>
            <Box className='flex justify-between items-center max-md:flex-col max-md:gap-2'>
              <Typography variant='h5' textAlign='center' fontWeight='bold'>Data Reservoir</Typography>
              <SignInButton component='div' oauthFlow='redirect' fallbackRedirectUrl={'/dashboard'} forceRedirectUrl={'/dashboard'}>
                <Button startIcon={<FaGithub />} className='pl-4 pr-4 max-md:w-full' variant='contained'>
                  Github Login
                </Button>
              </SignInButton>
            </Box>
            <Typography variant='subtitle1' className='text-center'>
              This is a private app. Please ask the (sole) dev to give you access hehe
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

async function Message({ message }: { message: searchParamsType }) {
  const msg = await message;
  return msg.message && (
    <Box color='failure' className='p-2 text-sm'>
      <Box component='span'>{msg.message}</Box>
    </Box>
  )
}