import React from 'react'
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { getCategoryColorHex } from '@/utilities/color';

export interface TablePieChartProps{
  data: {
    rowCount: number,
    category: string
  }[]
}

export default function TablePieChart(props : TablePieChartProps) {
  const option: EChartsOption = {
    series: [
      {
        data: props.data.sort((a, b) => b.rowCount - a.rowCount).map(x => ({
          value: x.rowCount,
          name: x.category,
          itemStyle: {
            color: getCategoryColorHex(x.category),
          },
        })),
        type: 'pie',
        label: {
          show: true,
          position: 'inside',
          formatter: '{d}%',
        },
        tooltip: {
          formatter: '{d}%'
        },
        emphasis: {
          label: {
            show: false
          }
        },
        labelLine: {
          show: false
        },
        top: '15%'
      }
    ],
    legend: {
      top: '5%',
      padding: 6,
      left: 'center',
      textStyle: {
        color: 'white'
      }
    },

    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: 20
    }
  }

  return (
    <div className='h-full'>
      <ReactECharts
        option={option}
        className='h-full'
      />
    </div>
  )
}
