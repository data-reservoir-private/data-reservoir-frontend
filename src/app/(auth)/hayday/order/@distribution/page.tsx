import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http';
import { EChartsOption } from 'echarts'
import React from 'react'
import { HaydayOrderFormSchema } from '../form';
import { EChart } from '@/components/common/chart/Chart';

export default async function DistributionPage() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  const { data: { boxplot } } = await grabData<IHaydayResponse['hayday-order']['distribution']>(API_ROUTE.HAY_DAY.ORDER.DISTRIBUTION, sp);

  const opt: EChartsOption = {
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: ['Revenue']
    },
    series: [
      {
        name: 'Revenue Boxplot',
        type: 'boxplot',
        data: [
          [boxplot.min, boxplot.q1, boxplot.median, boxplot.q3, boxplot.max],
        ],
      },
      {
        name: 'outliers',
        type: 'scatter',
        data: boxplot.outliers,
        tooltip: {
          show: false
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      confine: false
    },
    label: {
      show: true,
      position: 'top',
      color: 'white'
    }
  }

  return (
    <Paper className='min-h-[300px] w-full'>
      <EChart option={opt} className='min-h-[300px] w-full' />
    </Paper>
  )
}
