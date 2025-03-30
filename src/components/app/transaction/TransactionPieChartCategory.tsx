'use client'

import { TransactionSummaryCategoryResponse } from '@/model/response/transaction';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import React from 'react';

interface TransactionPieChartCategoryProps {
  data: TransactionSummaryCategoryResponse[]
}

export default function TransactionPieChartCategory({ data } : TransactionPieChartCategoryProps) {
  const option: EChartsOption = {
    series: [
      {
        name: "",
        type: 'pie',
        radius: ['40%', '70%'],
        data: data.map(x => ({ name: x.category, value: Math.round(x.total) })).sort((a, b) => b.value - a.value)
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
      <ReactECharts option={option} className='w-full' opts={{ renderer: 'svg' }}/>
    </div>
  );
}
