import React, { Suspense } from 'react';
import AuthLayout from '@/components/common/auth-layout/AuthLayout';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Box>
      <AuthLayout/>
      <Box className='relative min-sm:left-[250px] min-sm:w-[calc(100%-250px)] p-2 min-h-[100svh]'>
        <Toolbar variant='dense' />
        <Box className='p-4'>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </Box>
      </Box>
    </Box>
  )
}
