import { HasID } from '@/model/response/base'
import React, { useState } from 'react'
import Paper from '../paper/Paper'
import classNames from 'classnames'
import Image from 'next/image'

export interface BasicGridProps<TData> {
  data: TData[]
  display?: (d: TData) => React.ReactNode
  detail: (d: TData) => React.ReactNode
  imageSrc: (d: TData) => string,
  imageAlt: (d: TData) => string
}

export interface BasicGridState<TData> {
  data?: TData
}

export default function BasicGrid<TData extends HasID>(props: BasicGridProps<TData>) {

  const [state, setState] = useState<BasicGridState<TData>>({
    data: undefined
  });

  const handleOnClick = ((d: TData) => setState({ data: d === state.data ? undefined : d }));

  return (
    <div className='flex gap-4 !h-[inherit]'>
      <div className={classNames('flex flex-wrap gap-2 overflow-y-auto scrollbar-default', {
        '': state.data
      })}>
        {
          props.data.map(d => (
            <div
              key={d.id}
              onClick={() => handleOnClick(d)}
              className={classNames('bg-blackish border-slate-600 border-solid border-2 p-2 rounded w-16 h-16 text-center hover:bg-slate-800 origin-center cursor-pointer', {
                'bg-slate-900': d.id === state.data?.id
              })}
            >
              {
                props.display ? props.display(d) :
                  <Image src={props.imageSrc(d)} alt={props.imageAlt(d)} width={48} height={48} className='w-12 max-h-12 rendering-crisp-edges'/>
              }
              </div>
          ))
        }
      </div>
      <Paper className='min-w-80 flex-grow flex p-3 overflow-hidden'>
        {
          state.data ? props.detail(state.data) :
          <div className='flex justify-center items-center w-full italic text-white/50 text-sm'>
            Pick any object
          </div>
        }
      </Paper>
    </div>
  )
}
