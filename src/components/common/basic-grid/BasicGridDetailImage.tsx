import React from 'react';
import Paper from '../paper/Paper';
import Image from 'next/image';
import classNames from 'classnames';

export interface BasicGridDetailImageProps {
  src: string;
  alt: string;

  width?: number;
  height?: number;
  className?: string;
  unoptimized?: boolean;
}

export default function BasicGridDetailImage(props: BasicGridDetailImageProps) {
  return (
    <Paper className='w-full h-[276px] flex justify-center items-center aspect-square bg-blackish-200 border-2 border-white/20'>
      <Image src={props.src} width={props.width ?? 64} height={props.height ?? 64} alt={props.alt} unoptimized={props.unoptimized} className={classNames('p-4 object-contain w-full h-full', props.className ?? "")}/>
    </Paper>
  );
}