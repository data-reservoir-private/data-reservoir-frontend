'use client'

import Loading from "@/components/common/loading/Loading";
import Paper from "@/components/common/paper/Paper";
import Picker from "@/components/common/picker/Picker";
import { API_ROUTE } from "@/constant/api-route";
import { CategoryType, FarmFrenzyTableType, HaydayMenu, NasiGorengTableType, TheSimsTableType } from "@/constant/tables";
import { DashboardRequest } from "@/model/request/dashboard";
import { DashboardResponse } from "@/model/response/dashboard";
import { request } from "@/utilities/http";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { Draft, produce } from "immer";
import { useEffect, useState } from "react";

type TablePickerType =
  TheSimsTableType |
  HaydayMenu |
  NasiGorengTableType |
  FarmFrenzyTableType;

interface TableSummaryState<T extends TablePickerType> {
  pickedTab?: T | null
}

type TableSummaryProps<T extends TablePickerType> = {
  category: CategoryType,
  hasPicker?: false
} | {
  category: CategoryType,
  pickerOption: {[key in T as string]: string}
  initialTab: T,
  hasPicker: true,
  onPickCategory: (s: T | null) => void
}

export default function TableSummary<T extends TablePickerType>(props: TableSummaryProps<T>) {
  const [state, setState] = useState<TableSummaryState<T>>({
    pickedTab: props.hasPicker ? props.initialTab : undefined
  });

  // First trigger
  useEffect(() => {
    props.hasPicker && props.onPickCategory(state.pickedTab ?? null);
  }, [props, state.pickedTab]);

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
      let choice = enabled ? pickedTable : null;
      s.pickedTab = choice as Draft<T>

      // props.hasPicker && props.onPickCategory(choice as T | null)
    }))
  }

  return (
    <div className='flex flex-col gap-4 text-white'>
      <div className={classNames('grid gap-4', 
        {
          'grid-cols-4 max-lg:grid-cols-2 max-lg:grid-rows-2': props.hasPicker,
          'grid-cols-2': !props.hasPicker
        }
      )}>
        <Paper className='px-6 py-4'>
          <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Tables</p>
          <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{
            isLoading ? <Loading message=""/> :
              !summaryData ? "-" :
                summaryData.flatMap(x => x.tables).length
          }</h1>
        </Paper>
        <Paper className='px-6 py-4'>
          <p className='xl:text-xl lg:text-lg max-lg:text-xl max-sm:text-sm'>Records</p>
          <h1 className='xl:text-5xl lg:text-3xl max-lg:text-4xl max-sm:text-2xl text font-bold'>{
            isLoading ? <Loading message=""/> :
              !summaryData ? "-" :
                summaryData.flatMap(x => x.tables).reduce((prev, current) => prev + current.rowCount, 0)
          }</h1>
        </Paper>
        {
          (props.hasPicker && !!props.pickerOption) && 
          <Paper className='px-4 col-span-2 p-4 text-xs max-lg:col-span-2'>
            <Picker options={Object.entries(props.pickerOption).map(([k, v]) => ({ label: v, value: k }))} onClickCategory={onClickCategory} singleOption selected={state.pickedTab ?? null}/>
          </Paper>
        }
      </div>
    </div>
  )
}