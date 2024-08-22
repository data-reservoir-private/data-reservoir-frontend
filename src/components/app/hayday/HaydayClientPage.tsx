'use client'

import HaydayProduct from "@/components/app/hayday/HaydayProduct";
import Loading from "@/components/common/loading/Loading";
import Paper from "@/components/common/paper/Paper";
import Picker from "@/components/common/picker/Picker";
import { API_ROUTE } from "@/constant/api-route";
import { HaydayMenu, HaydayTab } from "@/constant/tables";
import { DashboardRequest } from "@/model/request/dashboard";
import { DashboardResponse } from "@/model/response/dashboard";
import { request } from "@/utilities/http";
import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useState } from "react";
import HaydayBuilding from "./HaydayBuilding";

interface HaydayClientPageState {
  pickedTab: HaydayMenu | null
}

export default function HaydayClientPage() {
  const [state, setState] = useState<HaydayClientPageState>({
    pickedTab: 'building'
  });

  let { isLoading, data: summaryData } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      let j = await request<DashboardResponse[], DashboardRequest>({
        method: "GET",
        url: API_ROUTE.DASHBOARD,
        data: {
          category: "hayday"
        }
      });
      return j.data;
    }
  });

  if (isLoading || !summaryData) return (<Loading/>)
  else {
    let totalTable = summaryData.flatMap(x => x.tables).length;
    let totalData = summaryData.flatMap(x => x.tables).reduce((prev, current) => prev + current.rowCount, 0);

    let onClickCategory = (pickedTable: string, enabled: boolean) => {
      setState(produce(s => {
        if (enabled) s.pickedTab = pickedTable as HaydayMenu
        else s.pickedTab = null
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
            <Picker options={Object.entries(HaydayTab).map(([k, v]) => ({ label: v, value: k }))} onClickCategory={onClickCategory} singleOption selected={state.pickedTab} className="!grid-cols-1"/>
          </Paper>
        </div>
        

        {/* Layer 2 : Table dan Treemap */}
        <div className='min-h-[100vh]'>
          { state.pickedTab === 'product' && <HaydayProduct/> }
          { state.pickedTab === 'building' && <HaydayBuilding/> }
        </div>
      </div>
    )
  }
}