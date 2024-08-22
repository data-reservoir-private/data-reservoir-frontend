'use client'

import HaydayProduct from "@/components/app/hayday/HaydayProduct";
import Loading from "@/components/common/loading/Loading";
import Paper from "@/components/common/paper/Paper";
import Picker from "@/components/common/picker/Picker";
import { API_ROUTE } from "@/constant/api-route";
import { CategoryType, FarmFrenzyTableType, HaydayMenu, HaydayTab, NasiGorengTableType, TheSimsTableType } from "@/constant/tables";
import { DashboardRequest } from "@/model/request/dashboard";
import { DashboardResponse } from "@/model/response/dashboard";
import { request } from "@/utilities/http";
import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useState } from "react";

type TablePickerType =
  TheSimsTableType |
  HaydayMenu |
  NasiGorengTableType |
  FarmFrenzyTableType;

interface TableSummaryState<T extends TablePickerType> {
  pickedTab: T | null
}

interface TableSummaryProps<T extends TablePickerType> {
  initialTab: T,
  category: CategoryType,
  pickerOption: {[key in T as string]: string }
}

interface TableSummaryState<T extends TablePickerType> {
  pickedTab: T | null
}

export default function TableSummary<T extends TablePickerType>(props: TableSummaryProps<T>) {
  const [state, setState] = useState<TableSummaryState<T>>({
    pickedTab: props.category
  });

  let { isLoading, data: summaryData } = useQuery({
    queryKey: [props.category],
    queryFn: async () => {
      let j = await request<DashboardResponse[], DashboardRequest>({
        method: "GET",
        url: API_ROUTE.DASHBOARD,
        data: {
          category: props.category
        }
      });
      return j.data;
    }
  });

  let onClickCategory = (pickedTable: string, enabled: boolean) => {
    setState(produce(s => {
      if (enabled) s.pickedTab = pickedTable as TablePickerType
      else s.pickedTab = null
    }))
  }

  return (
    <div className='flex flex-col gap-4 text-white'>
      <div className='grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-lg:grid-rows-2'>
        <Paper className='px-6'>
          <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Tables</p>
          <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{
            isLoading ? <Loading /> :
              !summaryData ? "-" :
                summaryData.flatMap(x => x.tables).length
          }</h1>
        </Paper>
        <Paper className='px-6'>
          <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Records</p>
          <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{
            isLoading ? <Loading /> :
              !summaryData ? "-" :
                summaryData.flatMap(x => x.tables).reduce((prev, current) => prev + current.rowCount, 0)
          }</h1>
        </Paper>
        <Paper className='px-4 col-span-2 p-4 text-xs max-lg:col-span-2'>
          <Picker options={Object.entries(props.pickerOption).map(([k, v]) => ({ label: v, value: k }))} onClickCategory={onClickCategory} singleOption selected={state.pickedTab} className="!grid-cols-1"/>
        </Paper>
      </div>
    </div>
  )
}