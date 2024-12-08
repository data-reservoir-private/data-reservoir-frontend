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
    pickedTable: 'farm_frenzy_three_product'
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