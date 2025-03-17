import { API_ROUTE } from '@/constant/api-route'
import { DashboardResponse } from '@/model/response/dashboard';
import { GetDashboardData } from '@/service/dashboard';
import { request } from '@/utilities/http'
import { FaTableList } from "react-icons/fa6";
import Link from 'next/link';
import React from 'react'

export interface DashboardNavigationProps {
  category: 'The Sims'
}

export default async function DashboardNavigation(props: DashboardNavigationProps) {
  const data = await GetDashboardData(props.category);
  const finalData = data[0];

  return (
    <div>
      <div className='flex flex-col gap-4'>
        {
          finalData.tables.sort((a, b) => b.rowCount - a.rowCount).map(x => (
            <Link href={x.tableUrl} passHref key={x.tableName}
              className='w-full h-full text-white bg-bluish-200/30 hover:bg-bluish-200/50 p-2 rounded-sm flex gap-3 items-center'
            >
              <div className='rounded-sm bg-bluish-200/60 aspect-square h-full w-auto flex justify-center items-center min-w-10'>
                <FaTableList/>
              </div>
              <div>
                <p className='capitalize text-lg font-bold'>{x.tableName.replaceAll('_', ' ')}</p>
                <p className='text-sm'>Data: {x.rowCount}</p>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
