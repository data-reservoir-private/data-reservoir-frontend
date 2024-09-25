'use client'

import React from 'react'
import Paper from '@/components/common/paper/Paper'
import TransjakartaCorridorDetail from './TransjakartaCorridorDetail'
import { useAppStore } from '@/store/store'
import TransjakartaBusStopMap from './TransjakartaBusStopMap'
import classNames from 'classnames'
import dynamic from 'next/dynamic'

const DynamicMap = dynamic(() => import("./TransjakartaBusStopMap"), { ssr: false })

export default function TransjakartaClientPage() {
  const code = useAppStore(x => x.transjakarta.corridorCode);

  return (
    <div className='flex flex-col gap-4'>
      <div className={classNames('grid', {
        'grid-cols-[7fr_3fr]': code && code.length > 0
      })}>
        <Paper className='p-4 h-full'>
          <DynamicMap/>
        </Paper>
        <div>
          {
            (code && code.length > 0) && <Paper className='!p-0 overflow-hidden'>
              <TransjakartaCorridorDetail/>
            </Paper>
          }
        </div>
      </div>
    </div>
  )
  // return (
  //   <div className='flex flex-col gap-4 text-white'>
  //     {
  //       (code && code.length > 0) && <Paper className='!p-0 overflow-hidden'>
  //         <TransjakartaCorridorDetail/>
  //       </Paper>
  //     }
  //     <div className='min-h-[600px] grid grid-cols-2 max-lg:grid-cols-1 gap-4'>
  //       <Paper className='h-full'>
  //         <TransjakartaCorridorTable/>
  //       </Paper>
  //       <Paper className='p-4 h-full'>
  //         <TransjakartaBusStopMap/>
  //         {/* <MyAwesomeMap/> */}
  //       </Paper>
  //     </div>
  //   </div>
  // )
}
