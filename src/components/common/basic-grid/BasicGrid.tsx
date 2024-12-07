import { HasID } from '@/model/response/base'
import React from 'react'

export interface BasicGridProps<TData> {
  data: TData[]
  display: (d: TData) => React.ReactNode
}

export default function BasicGrid<TData extends HasID>(props: BasicGridProps<TData>) {
  return (
    <div>
      <div className='grid gap-1 auto-cols-[minmax(0,2rem)] justify-center'>
        {
          props.data.map(d => (
            <div key={d.id} className='bg-blackish p-2 rounded w-fit text-center'>
              { props.display(d) }
            </div>
          ))
        }
      </div>
    </div>
  )
}
