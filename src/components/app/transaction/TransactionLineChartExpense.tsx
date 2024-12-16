import { TransactionResponse } from '@/model/response/transaction';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import React from 'react';
import dayjs from 'dayjs';

export interface TransactionLineChartExpenseProps {
  expense: TransactionResponse[];
}

export default function TransactionLineChartExpense(props: TransactionLineChartExpenseProps) {
  console.log(props.expense);
  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      axisLabel: { rotate: 30 },
      data: props.expense.map(x => dayjs(new Date(x.year, x.month - 1)).format("MMM YYYY"))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: "",
        type: 'bar',
        data: props.expense.map(x => x.total),
      },
      {
        name: "",
        type: 'line',
        smooth: true,
        data: props.expense.map(x => x.total),
        markLine: {
          data: [
            {
              yAxis: 3_000_000,
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
      maxSpan: 100,
      minSpan: 20,
      bottom: 7
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
      <ReactECharts option={option}/>
    </div>
  );
}
