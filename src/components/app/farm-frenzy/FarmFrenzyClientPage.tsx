'use client'

import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import Picker from '@/components/common/picker/Picker';
import { API_ROUTE } from '@/constant/api-route';
import { FarmFrenzyTableLabel, FarmFrenzyTableType } from '@/constant/tables'
import { DashboardRequest } from '@/model/request/dashboard';
import { DashboardResponse } from '@/model/response/dashboard';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { produce } from 'immer';
import React, { useState } from 'react'
import FarmFrenzyOneProduct from './FarmFrenzyOneProduct';
import FarmFrenzyTwoProduct from './FarmFrenzyTwoProduct';
import FarmFrenzyTwoPizzaProduct from './FarmFrenzyTwoPizzaProduct';
import FarmFrenzyThreeProduct from './FarmFrenzyThreeProduct';

interface FarmFrenzyClientPageState {
  pickedTable: FarmFrenzyTableType | null
}

export default function FarmFrenzyClientPage() {
  const [state, setState] = useState<FarmFrenzyClientPageState>({
    pickedTable: 'farm_frenzy_one_product'
  });

  let { isLoading, data: summaryData } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      let j = await request<DashboardResponse[], DashboardRequest>({
        method: "GET",
        url: API_ROUTE.DASHBOARD,
        data: {
          category: "farm_frenzy"
        }
      });
      return j.data;
    }
  });

  if (isLoading || !summaryData) return (<Loading />)
  else {
    let totalTable = summaryData.flatMap(x => x.tables).filter(x => !state.pickedTable || state.pickedTable === x.tableName).length;
    let totalData = summaryData.flatMap(x => x.tables).filter(x => !state.pickedTable || state.pickedTable === x.tableName).reduce((prev, current) => prev + current.rowCount, 0);

    let onClickCategory = (pickedTable: string, enabled: boolean) => {
      setState(produce(s => {
        if (enabled) s.pickedTable = pickedTable as FarmFrenzyTableType
        else s.pickedTable = null
      }))
    }

    return (
      <div className='flex flex-col gap-4 text-white'>
        {/* Layer 1 : Angka2 dan filter */}
        <div className='grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-lg:grid-rows-2'>
          <Paper className='px-6'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Tables</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalTable}</h1>
          </Paper>
          <Paper className='px-6'>
            <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Records</p>
            <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{totalData}</h1>
          </Paper>
          <Paper className='px-4 col-span-2 p-4 text-xs max-lg:col-span-2'>
            <Picker className='!grid-cols-2 !grid-rows-2' options={Object.entries(FarmFrenzyTableLabel).map(([k, v]) => ({ label: v, value: k }))} onClickCategory={onClickCategory} singleOption selected={state.pickedTable} />
          </Paper>
        </div>

        {/* Layer 2 : Table dan Treemap */}
        <div className=''>
          { state.pickedTable === "farm_frenzy_one_product" && <FarmFrenzyOneProduct/> }
          { state.pickedTable === "farm_frenzy_two_product" && <FarmFrenzyTwoProduct/> }
          { state.pickedTable === "farm_frenzy_two_pizza_product" && <FarmFrenzyTwoPizzaProduct/> }
          { state.pickedTable === "farm_frenzy_three_product" && <FarmFrenzyThreeProduct/> }
        </div>
      </div>
    )
  }
}