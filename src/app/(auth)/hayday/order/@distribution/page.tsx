import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http';
import { EChartsOption } from 'echarts'
import React from 'react'
import { HaydayOrderFormSchema } from '../form';
import { EChart } from '@/components/common/chart/Chart';
import Typography from '@mui/material/Typography';

export default async function DistributionPage() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  const { data } = await grabData<IHaydayResponse['hayday-order']['distribution']>(API_ROUTE.HAY_DAY.ORDER.DISTRIBUTION, sp);

  if (!data) {
    return (
      <Paper className='w-full flex justify-center items-center p-2'>
        <Typography>No data</Typography>
      </Paper>
    )
  }


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
          [data.boxplot.min, data.boxplot.q1, data.boxplot.median, data.boxplot.q3, data.boxplot.max],
        ],
      },
      {
        name: 'outliers',
        type: 'scatter',
        data: data.boxplot.outliers,
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
    },
    grid: {
      top: 40,
      left: 80,
      right: 80,
      bottom: 40,
    },
  }

  return (
    <Paper className='min-h-75 w-full'>
      <EChart option={opt} className='min-h-75 w-full' />
    </Paper>
  )
}
