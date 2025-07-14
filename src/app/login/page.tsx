import Paper from '@/components/common/paper/Paper';
import { supabaseServer } from '@/utilities/supabase-server';
import React from 'react';
import { redirect } from 'next/navigation';
import { FaGithub } from "react-icons/fa";
import { login } from './actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Data Reservoir'
};

type searchParamsType = Promise<{[key: string]: string | undefined}>

export default async function LoginPage(props: { searchParams: searchParamsType }) {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect('/dashboard');

  const searchP = await props.searchParams;

  return (
    <div className='w-full h-[100svh] flex items-center justify-center'>
      <Paper className='w-fit px-12 py-7'>
        <form action={login} className='flex gap-2 flex-col'>
          {
            searchP['message'] && (
              <div color='failure' className='p-2 text-sm'>
                <span>{searchP['message']}</span>
              </div>
            )
          }
          <button className='font-bold text-lg flex items-center gap-5 align-middle' color='success' type='submit'>
            <span className='flex justify-center items-center text-2xl pr-4'>
              <FaGithub className='flex items-center'/>
            </span>
            <span className='flex items-center'>
              Login using Github
            </span>
          </button>
          <span className='text-[9px]'>
            This is a private app. No one else can login :D
          </span>
        </form>
      </Paper>
    </div>
  );
}
