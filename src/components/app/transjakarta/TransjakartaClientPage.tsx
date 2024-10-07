'use client'

import React from 'react'
import Paper from '@/components/common/paper/Paper'
import { useAppStore } from '@/store/store'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import TransjakartaBusStopDetail from './TransjakartaBusStopDetail'
import { useQuery } from '@tanstack/react-query'
import { request } from '@/utilities/http'
import { TransjakartaCorridorStyleResponse } from '@/model/response/transjakarta'
import { API_ROUTE } from '@/constant/api-route'
import Loading from '@/components/common/loading/Loading'

const DynamicMap = dynamic(() => import("./TransjakartaBusStopMap"), { ssr: false })

export default function TransjakartaClientPage() {
  const [busStopCode, corridorColors, setCorridorColors] = useAppStore(x => [x.newTransjakarta.busStopCode, x.newTransjakarta.corridorColors, x.newTransjakarta.setCorridorStyle]);

  const { isLoading } = useQuery({
    queryKey: ['PERSIST'],
    queryFn: async () => {
      let j = await request<TransjakartaCorridorStyleResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSJAKARTA.STYLE,
      });
      setCorridorColors(j.data.map(x => ({
        code: x.corridorCode,
        color: x.corridorHexColor
      })));
      return j.data;
    }
  });
  if (isLoading || Object.keys(corridorColors).length === 0) return <Loading/>

  return (
    <div className='flex flex-col gap-4'>
      <div className={classNames('grid', {
        'grid-cols-[7fr_3fr] gap-4': !!busStopCode
      })}>
        <Paper className='p-4 h-full'>
          <DynamicMap/>
        </Paper>
        {
          !!busStopCode && <TransjakartaBusStopDetail/>
        }
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
