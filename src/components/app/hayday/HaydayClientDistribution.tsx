'use client'

import React from 'react'
import Chart from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { HayDayOrderSummaryResponse } from '@/model/response/hayday';

type HaydayClientDistributionProps = {
  data: HayDayOrderSummaryResponse['clients']
}

export default function HaydayClientDistribution({ data }: HaydayClientDistributionProps) {
  const label = data.map(x => x.name);
  const count = data.map(x => x.count);
  const t = count.reduce((acc, curr) => acc + curr, 0);
  const average = data.map(x => Math.round(x.total / x.count));
  const averageAll = data.map(x => Math.round(x.total / t));
  const boxplotOption: EChartsOption = {
    series: [
      {
        name: 'Coin',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        color: '#f5e320',
        data: data.map(x => x.income.coin)
      },
      {
        name: 'XP',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        color: '#00aaff',
        data: data.map(x => x.income.xp)
      },
      {
        name: '# Of Orders',
        data: count,
        type: 'line',
      },
      {
        name: 'Average per Client',
        data: average,
        type: 'line',
      },
      {
        name: 'Average Global',
        data: averageAll,
        type: 'line',
      },
    ],
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: label
    },
    tooltip: {
      trigger: 'axis'
    }
  }

  return (
    <Chart option={boxplotOption} />
  )
}
