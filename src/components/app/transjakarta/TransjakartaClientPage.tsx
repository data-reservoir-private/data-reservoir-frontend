'use client'

import React from 'react'
import TableSummary from '../shared/TableSummary'
import TransjakartaBusStopMap from './TransjakartaBusStopMap'
import Paper from '@/components/common/paper/Paper'

export default function TransjakartaClientPage() {
  return (
    <div className='flex flex-col gap-4 text-white'>
      <TableSummary category="transjakarta"/>

      <div className='min-h-[100vh]'>
        <div>

        </div>
        <div>
          <Paper className='p-4'>
            <TransjakartaBusStopMap selectedID={[]}/>
          </Paper>
        </div>
      </div>
    </div>
  )
}
