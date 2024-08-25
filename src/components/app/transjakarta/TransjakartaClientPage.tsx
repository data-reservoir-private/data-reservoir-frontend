'use client'

import React, { useState } from 'react'
import TableSummary from '../shared/TableSummary'
import Paper from '@/components/common/paper/Paper'
import TransjakartaCorridorTable from './TransjakartaCorridorTable'
import TransjakartaCorridorDetail from './TransjakartaCorridorDetail'
import TransjakartaBusStopMap from './TransjakartaBusStopMap'
import { useAppStore } from '@/store/store'
import dynamic from 'next/dynamic'

const MyAwesomeMap = dynamic(() => import("./TransjakartaBusStopMap"), { ssr: false })


export default function TransjakartaClientPage() {
  const code = useAppStore(x => x.transjakarta.corridorCode);

  return (
    <div className='flex flex-col gap-4 text-white'>
      <TableSummary category="transjakarta" />
      {
        (code && code.length > 0) && <Paper className='!p-0'>
          <TransjakartaCorridorDetail/>
        </Paper>
      }
      <div className='h-[600px] grid grid-cols-2 max-lg:grid-cols-1 gap-4'>
        <Paper className='h-full'>
          <TransjakartaCorridorTable/>
        </Paper>
        <Paper className='p-4 h-full'>
          {/* <TransjakartaBusStopMap/> */}
          <MyAwesomeMap/>
        </Paper>
      </div>
    </div>
  )
}
