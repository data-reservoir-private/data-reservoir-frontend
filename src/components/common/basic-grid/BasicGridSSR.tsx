import 'server-only';
import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

export interface BasicGridSSRProps<TData> {
  data: TData[]
  display?: (d: TData) => React.ReactNode
  imageSrc: (d: TData) => string,
  imageAlt: (d: TData) => string,
  linkOnClick: (d: TData) => string,

  gridContainerClasses?: string,
  gridImageClasses?: string,
  gridImageUnoptimized?: boolean,
}

export default function BasicGridSSR<TData extends { id: string }>(props: BasicGridSSRProps<TData>) {
  return (  
    <div className='flex gap-4 flex-grow justify-between overflow-y-scroll scrollbar-none'>
      <div className='min-h-0'>
        <div className={classNames('flex flex-wrap gap-2 overflow-y-auto scrollbar-default max-h-full min-h-0')}>
          {
            props.data.map(d => (
              <Link
                href={props.linkOnClick(d)}
                passHref
                key={d.id.toString()}
                className={classNames('flex justify-center items-center bg-blackish border-slate-600 border-solid border-2 rounded w-20 h-20 text-center hover:bg-slate-800 origin-center cursor-pointer', props.gridContainerClasses ?? "")}
              >
                {
                  props.display ? props.display(d) :
                    <Image src={props.imageSrc(d)} alt={props.imageAlt(d)} width={20} height={20} unoptimized={props?.gridImageUnoptimized} className={classNames('inline-block object-contain w-full h-full p-3', props.gridImageClasses ?? "")}/>
                }
                </Link>
            ))
          }
        </div>
      </div>
    </div>
  );
}
