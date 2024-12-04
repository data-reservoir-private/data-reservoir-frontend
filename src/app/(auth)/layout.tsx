import BottomNavigation from '@/components/app/bottom-nav/BottomNavigation';
import QueryComponent from '@/components/app/QueryComponent';
import React from 'react'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full h-full min-h-[100svh] p-4 bg-bluish pb-24'>
      <QueryComponent>
        <div className='w-full flex justify-center overflow-scroll scrollbar-none'>
          <div className='max-w-[1100px] '>
            {children}
          </div>
        </div>
        <BottomNavigation/>
      </QueryComponent>
    </div>
  )
}
