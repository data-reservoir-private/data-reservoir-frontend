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
    <div className='flex my-4'>
      <div className={classNames('flex flex-wrap gap-2 justify-around', {
        '': state.data
      })}>
        {
          props.data.map(d => (
            <div
              key={d.id}
              onClick={() => handleOnClick(d)}
              className={classNames('bg-blackish border-slate-600 border-solid border-2 p-2 rounded w-fit text-center hover:scale-150 origin-center cursor-pointer', {
                'bg-slate-900': d.id === state.data?.id
              })}
            >
              { props.display(d) }
            </div>
          ))
        }
      </div>
      {
        <div className=''>
          <Paper className='w-[400px]'>
            { state.data && props.detail(state.data) }
          </Paper>
        </div>
      }
    </div>
  )
}
