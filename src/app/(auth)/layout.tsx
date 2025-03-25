import QueryComponent from '@/components/app/QueryComponent';
import SideNavigation from '@/components/app/side-nav/SideNavigation';
import React from 'react';

export default async function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='w-full flex justify-center overflow-scroll scrollbar-none box-border !h-[100dvh] max-md:flex-col-reverse'>
      <SideNavigation />
      <QueryComponent>
        <div className='flex-grow p-4 max-h-[100dvh] h-[100dvh] overflow-x-auto scrollbar-none overflow-y-scroll max-md:mb-24'>
          {children}
        </div>
      </QueryComponent>
    </div>
  );
}
