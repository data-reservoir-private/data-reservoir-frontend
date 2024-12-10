import QueryComponent from '@/components/app/QueryComponent';
import SideNavigation from '@/components/app/side-nav/SideNavigation';
import React from 'react';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full flex justify-center overflow-scroll scrollbar-none box-border !h-[100dvh]'>
      <SideNavigation />
      <div className='flex-grow p-4 max-h-[100dvh] h-[100dvh]'>
        {children}
      </div>
    </div>
  );
}
