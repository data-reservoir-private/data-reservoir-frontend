'use client'

import React, { useState } from 'react'
import TableSummary from '../shared/TableSummary'
import Paper from '@/components/common/paper/Paper'
import TransjakartaCorridor from './TransjakartaCorridor'
import TransjakartaCorridorDetail from './TransjakartaCorridorDetail'

export default function TransjakartaClientPage() {
  const [code, setCode] = useState<string>("");

  return (
    <div className='flex flex-col gap-4 text-white'>
      <TableSummary category="transjakarta" />
      {
        (code.length > 0) && <Paper className='!p-0'>
          <TransjakartaCorridorDetail code={code}/>
        </Paper>
      }
      <div className='h-[500px] grid grid-cols-2 max-lg:grid-cols-1 gap-4'>
        <Paper className='h-full'>
          <TransjakartaCorridor onClickCorridor={e => { console.log(e); setCode(e) }}/>
        </Paper>
        {/* <Paper className='p-4 !h-[400px]'>
          <TransjakartaBusStopMap selectedID={[]}/>
        </Paper> */}
      </div>
    </div>
  )
}
