import React from 'react';
import { BiSolidTrafficBarrier } from 'react-icons/bi';

export default function ComingSoon(props: { message: string }) {
  return (
    <div className='flex flex-col justify-center items-center text-center'>
      <BiSolidTrafficBarrier className='text-9xl text-white/10'/>
      <h1 className='font-bold text-3xl'>Under Construction</h1>
      <p className='italic font-light'>{props.message}</p>
    </div>
  );
}
