'use client'

import React from 'react'
import Chart from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { HayDayOrderSummaryResponse } from '@/model/response/hayday';
import { CallbackDataParams } from 'echarts/types/dist/shared';

type HaydayBoxChart = HayDayOrderSummaryResponse['revenue']

export default function HaydayBoxChart({ event, non_event, combined }: HaydayBoxChart) {
  const label = ['Event', 'Non Event', 'Combined'];
  const boxplotOption: EChartsOption = {
    series: [
      {
        name: 'Income',
        type: 'boxplot',
        datasetIndex: 1,
        itemStyle: {
          color: '#b8c5f2',
        },
        encode: {
          itemName: 'name',
          tooltip: [1, 2, 3, 4, 5]
        }
      },
      {
        name: 'outlier',
        type: 'scatter',
        datasetIndex: 2,
      }
    ],
    dataset: [
      {
        id: 'T1',
        source: [event, non_event, combined]
      },
      {
        id: 'T2',

        // Results:
        // ['boxplotdata', 'outlierdata']
        // When we use this dataset, only the 'boxplotdata' will be used
        fromDatasetId: 'T1',
        transform: {
          type: 'boxplot',
          config: { layout: 'horizontal', itemNameFormatter: (params: CallbackDataParams) => label[params.value as number] }
        },
      },
      {
        id: 'T3',
        fromDatasetId: 'T2',

        // Get the 1st index from T2, which is our outlier data
        fromDatasetIndex: 1,
        fromTransformResult: 1
      }
    ],
    tooltip: {
      trigger: 'item'
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    yAxis: {
      type: 'category',
      boundaryGap: true,
      nameGap: 30,
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    xAxis: {
      type: 'value',
      name: 'Revenue (Coin + XP)',
      splitArea: {
        show: true
      }
    },
  }

  return (
    <Chart option={boxplotOption} />
  )
}
