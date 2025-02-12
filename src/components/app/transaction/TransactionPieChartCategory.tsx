import { TransactionCategoryResponse } from '@/model/response/transaction';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import React from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { request } from '@/utilities/http';
import { API_ROUTE } from '@/constant/api-route';
import Loading from '@/components/common/loading/Loading';
import Error from '@/components/common/error/Error';

export default function TransactionPieChartCategory() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["transaction-category"],
    queryFn: async () => {
      const j = await request<TransactionCategoryResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSACTION.CATEGORY,
      });
      return (j?.data ?? []);
    }
  });

  if (isLoading) return <Loading />;
  else if (!data || isError) return <Error message={error?.message}/>;

  const refinedData: Record<string, number> = {};
  data.forEach(x => {
    if (refinedData[x.category] === undefined) refinedData[x.category] = x.total;
    else refinedData[x.category] += x.total;
  });

  const option: EChartsOption = {
    series: [
      {
        name: "",
        type: 'pie',
        radius: ['40%', '70%'],
        data: Object.entries(refinedData).map(x => ({ name: x[0], value: Math.round(x[1]) })).sort((a, b) => b.value - a.value)
      }
    ],
    dataZoom: {
      type: 'slider',
      show: true,
      bottom: 7,
      maxValueSpan: 11,
      minValueSpan: 5
    },
    tooltip: {
      triggerOn: 'mousemove',
      trigger: 'item',
      
    },
    grid: {
      top: 15,
      // bottom: -2
    }
  };
  
  return (
    <div className='w-full p-4'>
      <h1 className='text-xl text-left font-bold'>Expenses</h1>
      <ReactECharts option={option} className='w-full'/>
    </div>
  );
}
