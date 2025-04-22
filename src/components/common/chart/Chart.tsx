'use client'

import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react';


interface ChartProps {
  option: EChartsOption,
  className?: string
}

export default function Chart(props: ChartProps) {
  return (
    <ReactECharts option={props.option} className={''} />
  );
}
