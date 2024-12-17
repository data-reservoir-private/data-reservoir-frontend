'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { ROUTES } from '@/constant/route';
import { FaPowerOff } from "react-icons/fa";
import { Logout } from '@/app/(auth)/logout/actions';

export default function SideNavigation() {
  const path = usePathname();
  return (
    <div className='bg-bluish-200 text-white py-4 m-auto z-50 h-full w-20'>
      <div className='flex gap-5 h-full flex-col overflow-x-scroll overflow-y-hidden px-5 scrollbar-none justify-center box-border items-center'>
        {
          ROUTES.map(route => (
            <Link key={route.id} title={route.name} href={(path === route.link || route.inactive) ? '#' : route.link} className={classNames(
              'm-auto h-full bg-bluish min-h-9 rounded-md text-2xl flex justify-center items-center text-white/60 relative overflow-hidden', {
              '!bg-slate-400 border-slate-500': path === route.link,
              // 'hover:text-white/35': path !== route.link && !route.inactive,
              'bg-bluish/50 !text-white/10 cursor-default': route.inactive,
              'hover:bg-bluish/35': !route.inactive
            })}>
              {route.beta && <div className='text-[8px] leading-[10px] p-0.5 absolute top-0 right-0 bg-orange-600 rounded-sm text-white'>Beta</div>}
              {route.new && <div className='text-[8px] leading-[10px] p-0.5 absolute top-0 right-0 bg-yellow-400 rounded-sm text-white'>New</div>}
              <div className='p-2'>
                <route.icon />
              </div>
            </Link>
          ))
        }

        <form action={Logout}>
          <button type='submit' key='logout' title='logout' className={classNames(
            'm-auto h-full bg-red-950/80 min-h-9 rounded-md text-2xl flex justify-center items-center relative overflow-hidden'
          )}>
            <div className='p-2 text-red-400/70'>
              <FaPowerOff/>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}
