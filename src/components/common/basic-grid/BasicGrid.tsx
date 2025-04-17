import { HasID } from '@/model/response/base';
import React, { useState } from 'react';
import Paper from '../paper/Paper';
import classNames from 'classnames';
import Image from 'next/image';

export interface BasicGridProps<TData> {
  data: TData[]
  display?: (d: TData) => React.ReactNode
  detail?: (d: TData) => React.ReactNode
  imageSrc: (d: TData) => string,
  imageAlt: (d: TData) => string,
  onClick?: (d: TData) => void;

  gridContainerClasses?: string,
  gridImageClasses?: string,
  gridImageUnoptimized?: boolean,
}

export interface BasicGridState<TData> {
  data?: TData
}

export default function BasicGrid<TData extends HasID>(props: BasicGridProps<TData>) {
  const handleOnClick = ((d: TData) => props.onClick && props.onClick(d));

  return (  
    <div className='flex gap-4 flex-grow justify-between overflow-y-scroll scrollbar-none'>
      <div className='min-h-0'>
        <div className={classNames('flex flex-wrap justify-between gap-2 overflow-y-auto scrollbar-default max-h-full min-h-0', {

        })}>
          {
            props.data.map(d => (
              <div
                key={d.id}
                onClick={() => handleOnClick(d)}
                className={classNames('flex justify-center items-center bg-blackish border-slate-600 border-solid border-2 rounded w-20 h-20 text-center hover:bg-slate-800 origin-center cursor-pointer', props.gridContainerClasses ?? "", {
                  // 'bg-slate-900 hover:bg-slate-900': d.id === state.data?.id
                })}
              >
                {
                  props.display ? props.display(d) :
                    <Image src={props.imageSrc(d)} alt={props.imageAlt(d)} width={0} height={0} unoptimized={props?.gridImageUnoptimized} className={classNames('inline-block object-contain w-full h-full p-3', props.gridImageClasses ?? "")}/>
                }
                </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
