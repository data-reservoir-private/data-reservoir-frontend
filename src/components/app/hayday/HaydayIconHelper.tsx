import Image from 'next/image';
import React from 'react';

export interface HaydayIconHelperProps {
  type: 'coins' | 'xp' | 'time'
}

export default function HaydayIconHelper(props: HaydayIconHelperProps) {
  return (
    <Image src={`/image/hay_day/${props.type}.png`} alt={props.type} width={20} height={20} quality={40}/>
  );
}
