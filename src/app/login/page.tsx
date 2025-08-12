import Paper from '@/components/common/paper/Paper';
import React from 'react';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SignInButton } from '@clerk/nextjs';
import Button from '@mui/material/Button';
import { FaGithub } from 'react-icons/fa6';
import { currentUser } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: 'Login - Data Reservoir'
};

type searchParamsType = Promise<{ message: string }>

export default async function LoginPage(props: { searchParams: searchParamsType }) {
  const searchP = await props.searchParams;

  const user = await currentUser();
  if (user) redirect('/dashboard');

  return (
    <>
      <Box className='w-full h-[100svh] flex items-center justify-center'>
        <Paper className='w-fit px-12 py-7'>
          <Box className='flex gap-2 flex-col'>
            {
              searchP.message && (
                <div color='failure' className='p-2 text-sm'>
                  <span>{searchP.message}</span>
                </div>
              )
            }
            <Box className='flex justify-between items-center'>
              <Typography variant='h5' textAlign='center' fontWeight='bold'>Data Reservoir</Typography>
              <SignInButton oauthFlow='redirect' fallbackRedirectUrl={'/dashboard'} forceRedirectUrl={'/dashboard'}>
                <Button startIcon={<FaGithub />} className='pl-4 pr-4' variant='contained'>
                  Github Login
                </Button>
              </SignInButton>
            </Box>
            <Typography variant='subtitle1'>
              This is a private app. Please ask the (sole) dev to give you access hehe
            </Typography>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
