import React from 'react'
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { getCategoryColorHex } from '@/utilities/color';
import { DashboardResponse } from '@/model/response/dashboard';

export interface TableTreeMapProps{
  data: DashboardResponse[]
}

export default function TableTreeMap(props : TableTreeMapProps) {
  const option: EChartsOption = {
    series: [
      {
        // data: props.data.map(x => x.rowCount),
        nodeClick: false,
        scaleLimit: {
          min: 1.2,
          max: 4
        },
        zoom: 1.2,
        data: props.data.map(x => ({
          name: x.category,
          color: x.tables.map(o => getCategoryColorHex(x.category)),
          children: x.tables.map(y => ({
            name: y.tableName,
            value: y.rowCount
          }))
        })),
        type: 'treemap',
        levels: [
          {
            itemStyle: {
              borderWidth: 0,
              gapWidth: 5
            }
          },
          {
            itemStyle: {
              gapWidth: 1
            }
          },
          {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
              gapWidth: 1,
              borderColorSaturation: 0.6
            }
          }
        ]
      }
    ],
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: 5,
      left: 5,
      right: 5,
      bottom: 5
    }
  }

  return (
    <div className='overflow-x-scroll !h-full'>
      <ReactECharts
        option={option}
        className='!h-full'
      />
    </div>
  )
}
