import { HasID } from '@/model/response/base'
import React, { useState } from 'react'
import Paper from '../paper/Paper'
import classNames from 'classnames'

export interface BasicGridProps<TData> {
  data: TData[]
  display: (d: TData) => React.ReactNode
  detail: (d: TData) => React.ReactNode
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
    <div className='flex gap-4 h-full'>
      <div className={classNames('flex flex-wrap gap-2 overflow-y-auto scrollbar-default h-min max-h-[650px]', {
        '': state.data
      })}>
        {
          props.data.map(d => (
            <div
              key={d.id}
              onClick={() => handleOnClick(d)}
              className={classNames('bg-blackish border-slate-600 border-solid border-2 p-2 rounded w-15 h-15 text-center hover:bg-slate-800 origin-center cursor-pointer', {
                'bg-slate-900': d.id === state.data?.id
              })}
            >
              { props.display(d) }
            </div>
          ))
        }
      </div>
      <Paper className='min-w-80 flex-grow flex p-3 max-h-[700px] overflow-hidden'>
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
