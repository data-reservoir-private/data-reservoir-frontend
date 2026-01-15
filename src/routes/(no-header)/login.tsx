import { createFileRoute } from '@tanstack/react-router'
import Paper from '@/components/common/paper/Paper';
import { Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FaGithub } from 'react-icons/fa6';
import { SignInButton } from '@clerk/tanstack-react-start';
import z from 'zod';

const searchParamSchema = z.object({
  message: z.string().optional(),
});

export const Route = createFileRoute('/(no-header)/login')({
  component: RouteComponent,
  validateSearch: (s) => searchParamSchema.parse(s),
  head: () => ({
    meta: [{ title: 'Login - Data Reservoir' }]
  })
});

export default function RouteComponent() {
  const { message } = Route.useSearch();
  return (
    <Box className='w-full h-svh flex items-center justify-center p-10'>
      <Paper className='w-fit px-12 py-7'>
        <Box className='flex gap-2 flex-col'>
          {
            message && (
              <Box color='failure' className='p-2 text-sm'>
                <Box component='span'>{message}</Box>
              </Box>
            )
          }
          <Box className='flex justify-between items-center max-md:flex-col max-md:gap-2'>
            <Typography variant='h5' textAlign='center' fontWeight='bold'>Data Reservoir</Typography>
            <SignInButton oauthFlow='popup' fallbackRedirectUrl={'/dashboard'}>
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
  );
}