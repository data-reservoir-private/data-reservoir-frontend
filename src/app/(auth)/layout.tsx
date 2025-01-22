import QueryComponent from '@/components/app/QueryComponent';
import SideNavigation from '@/components/app/side-nav/SideNavigation';
import { supabaseServer } from '@/utilities/supabase-server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const supabase = await supabaseServer();

  // const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) redirect('/login');

  return (
    <div className='w-full flex justify-center overflow-scroll scrollbar-none box-border !h-[100dvh]'>
      <SideNavigation />
      <div className='flex-grow p-4 max-h-[100dvh] h-[100dvh] overflow-x-auto scrollbar-none'>
        <QueryComponent>
          {children}
        </QueryComponent>
      </div>
    </div>
  );
}
