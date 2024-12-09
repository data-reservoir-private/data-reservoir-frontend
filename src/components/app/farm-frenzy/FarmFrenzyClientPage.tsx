'use client'

import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { FarmFrenzyTableType, FarmFrenzyTableTypeOptions } from '@/constant/tables'
import { DashboardRequest } from '@/model/request/dashboard';
import { DashboardResponse } from '@/model/response/dashboard';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import classNames from 'classnames';
import { BsChevronDown } from 'react-icons/bs';
import FarmFrenzyProduct from './FarmFrenzyProduct';
import SimpleListbox from '@/components/common/simple-listbox/SimpleListbox';

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

  const keyLabels = FarmFrenzyTableTypeOptions.reduce((obj, currValue) => ({ ...obj, [currValue]: currValue }), {});


  if (isLoading || !summaryData) return (<Loading />)
  else {
    return (
      <div className='flex flex-col gap-4 text-white w-full h-modal'>
        <Paper className='p-2'>
          <SimpleListbox onChange={e => setState({ pickedTable: e as FarmFrenzyTableType })} options={keyLabels} value={state.pickedTable}/>
        </Paper>
        { state.pickedTable === "farm_frenzy_one_product" && <FarmFrenzyProduct key={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.ONE_PRODUCT}/> }
        { state.pickedTable === "farm_frenzy_two_product" && <FarmFrenzyProduct key={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.TWO_PRODUCT}/> }
        { state.pickedTable === "farm_frenzy_two_pizza_product" && <FarmFrenzyProduct key={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.TWO_PIZZA_PRODUCT}/> }
        { state.pickedTable === "farm_frenzy_three_product" && <FarmFrenzyProduct key={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.THREE_PRODUCT}/> }
      </div>
    )
  }
}