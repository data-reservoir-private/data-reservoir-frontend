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
    return (
      <div className='flex flex-col gap-4 text-white w-full'>
        <Paper className='relative w-full p-2'>
          <Listbox
            onChange={e => setState({ pickedTable: e as FarmFrenzyTableType })}
          >
            <ListboxButton
              className={classNames("w-full overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50", 
                "inline-flex items-center rounded-sm border-2 px-3 py-1 text-sm border-gray-500 bg-gray-600 text-white outline-none"
              )}
            >
              <div className='flex justify-between w-full items-center'>
                {state.pickedTable}
                <BsChevronDown/>
              </div>
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              className={classNames("w-[var(--button-width)] flex flex-col gap-2 overflow-hidden rounded-sm disabled:cursor-not-allowed disabled:opacity-50 outline-0 cursor-pointer",
                "border-gray-500 bg-gray-600 text-white text-sm border-2 border-t-0 rounded-t-none"
              )}
            >
              {
                FarmFrenzyTableTypeOptions.map(opt => (
                  <ListboxOption value={opt} key={opt} className='p-0.5 px-2.5 hover:bg-gray-700'>
                    { opt.replaceAll("_", " ") }
                  </ListboxOption>
                ))
              }
            </ListboxOptions>
          </Listbox>
        </Paper>
        <div className='flex-grow'>
          { state.pickedTable === "farm_frenzy_one_product" && <FarmFrenzyProduct key={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.ONE_PRODUCT}/> }
          { state.pickedTable === "farm_frenzy_two_product" && <FarmFrenzyProduct key={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.TWO_PRODUCT}/> }
          { state.pickedTable === "farm_frenzy_two_pizza_product" && <FarmFrenzyProduct key={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.TWO_PIZZA_PRODUCT}/> }
          { state.pickedTable === "farm_frenzy_three_product" && <FarmFrenzyProduct key={state.pickedTable.replaceAll('_', '-')} url={API_ROUTE.FARM_FRENZY.THREE_PRODUCT}/> }
        </div>
      </div>
    )
  }
}