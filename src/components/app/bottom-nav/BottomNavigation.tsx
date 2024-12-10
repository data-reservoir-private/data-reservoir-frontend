'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { ROUTES } from '@/constant/route';

export default function BottomNavigation() {
  const path = usePathname();
  return (
    <div className='fixed bottom-0 left-0 bg-bluish-200 text-white py-4 w-full m-auto z-50'>
      <div className='flex gap-5 w-full overflow-x-scroll overflow-y-hidden px-5 scrollbar-none'>
        {
          ROUTES.map(route => (
            <Link key={route.id} href={(path === route.link || route.inactive) ? '#' : route.link} className={classNames(
              'm-auto h-full p-2 bg-bluish min-h-9 rounded-md text-2xl flex justify-center items-center text-white/60', {
                '!bg-slate-400 border-slate-500 border-4': path === route.link,
                // 'hover:text-white/35': path !== route.link && !route.inactive,
                'bg-bluish/50 !text-white/10 cursor-default': route.inactive,
                'hover:bg-bluish/35': !route.inactive
            })}>
              <route.icon/>
            </Link>
          ))
        }
      </div>
    </div>
  );
}
