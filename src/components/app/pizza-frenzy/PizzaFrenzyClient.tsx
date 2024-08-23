'use client'

import Loading from "@/components/common/loading/Loading";
import Paper from "@/components/common/paper/Paper";
import { API_ROUTE } from "@/constant/api-route";
import { DashboardRequest } from "@/model/request/dashboard";
import { DashboardResponse } from "@/model/response/dashboard";
import { request } from "@/utilities/http";
import { useQuery } from "@tanstack/react-query";
import PizzaFrenzyTable from "./PizzaFrenzyTable";
import TableSummary from "../shared/TableSummary";

export default function PizzaFrenzyClientPage() {
  let { isLoading, data: summaryData } = useQuery({
    queryKey: ["pizza-frenzy-topping"],
    queryFn: async () => {
      let j = await request<DashboardResponse[], DashboardRequest>({
        method: "GET",
        url: API_ROUTE.DASHBOARD,
        data: {
          category: "pizza_frenzy"
        }
      });
      return j.data;
    }
  });

  if (isLoading || !summaryData) return (<Loading/>)
  else {
    let totalTable = summaryData.flatMap(x => x.tables).length;
    let totalData = summaryData.flatMap(x => x.tables).reduce((prev, current) => prev + current.rowCount, 0);

    return (
      <div className='flex flex-col gap-4 text-white'>
        <TableSummary category="pizza_frenzy"/>

        <div className='min-h-[100vh]'>
          <PizzaFrenzyTable/>
        </div>
      </div>
    )
  }
}