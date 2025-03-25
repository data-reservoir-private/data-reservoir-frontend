import React from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';
import { getCategoryColorHex } from '@/utilities/color';

export interface TableBarChartProps{
  data: {
    tableName: string,
    rowCount: number,
    category: string
  }[]
}

export default function TableBarChart(props : TableBarChartProps) {
  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: props.data.map(x => x.tableName),
      axisLabel: {
        rotate: 50,
        fontSize: 9,
        overflow: 'truncate',
        show: false
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        // data: props.data.map(x => x.rowCount),
        data: props.data.sort((a, b) => b.rowCount - a.rowCount).map(x => ({
          value: x.rowCount,
          itemStyle: {
            color: getCategoryColorHex(x.category)
          },
        })),
        type: 'bar',
        barGap: '0%',
        barMinWidth: 12,
      }
    ],
    tooltip: {
      trigger: 'item',
      
    },
    dataZoom: [
      {
        type: 'slider',
        show: true,
        maxSpan: 70,
        handleSize: 8
      },
    ],
    grid: {
      top: 20
    }
  };

  return (
    <div className='overflow-x-scroll h-full scrollbar-default'>
      <ReactECharts
        option={option}
        className='h-full'
      />
    </div>
  );
}
