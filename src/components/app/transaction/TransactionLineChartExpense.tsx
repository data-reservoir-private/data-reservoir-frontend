import { TransactionMonthlyResponse } from '@/model/response/transaction';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import React from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { request } from '@/utilities/http';
import { API_ROUTE } from '@/constant/api-route';
import Loading from '@/components/common/loading/Loading';

export default function TransactionLineChartExpense() {

  const { isLoading, data } = useQuery({
    queryKey: ["transaction-monthly"],
    queryFn: async () => {
      const j = await request<TransactionMonthlyResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSACTION.MONTHLY,
      });
      return (j?.data ?? []);
    }
  });

  if (isLoading) return <Loading />;
  else if (!data) return <p>Data unavailable</p>;

  const LIMIT = 3_000_000;
  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      axisLabel: { rotate: 45 },
      data: data.map(x => dayjs(new Date(x.year, x.month - 1)).format("MM-YYYY"))
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: v => (v / 1_000_000).toString() + "M"
      }
    },
    series: [
      {
        name: "",
        type: 'bar',
        data: data.map(x => ({
          value: x.total,
          itemStyle: {
            color: x.total > LIMIT ? 'red' : 'yellow'
          }
        })),
        
      },
      {
        name: "",
        type: 'line',
        smooth: true,
        data: data.map(x => x.total),
        markLine: {
          data: [
            {
              yAxis: LIMIT,
              name: 'Spending Limit',
              label: {
                shadowColor: 'transparent',
                textShadowColor: 'transparent',
                borderRadius: 0,
                color: 'white'
              },
              itemStyle: {
                shadowBlur: 0,
                color: 'red',
                shadowColor: 'transparent'
              }
            }
          ]
        }
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
