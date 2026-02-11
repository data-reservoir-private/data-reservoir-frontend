import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http';
import { EChartsOption } from 'echarts'
import React from 'react'
import { HaydayOrderFormSchema } from '../form';
import { EChart } from '@/components/common/chart/Chart';
import Section from '@/components/common/paper/Section';

export default async function DailyPage() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  if (!sp.month || !sp.year) return <></>;

  const { data } = await grabData<IHaydayResponse['hayday-order']['daily'][]>(API_ROUTE.HAY_DAY.ORDER.DAILY, sp);

  const opt: EChartsOption = {
    xAxis: {
      type: 'category',
      data: data.map(x => x.date)
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      show: true
    },
    series: [
      {
        name: 'Revenue',
        type: 'line',
        data: data.map(x => x.revenue),
        symbolSize: 12,
        color: '#05df72',
        lineStyle: {
          width: 4,
          color: '#05df72'
        }
      },
      {
        name: 'Coin',
        type: 'bar',
        data: data.map(x => x.coin),
        stack: 'bar',
        color: '#efb100'
      },
      {
        name: 'XP',
        type: 'bar',
        data: data.map(x => x.xp),
        stack: 'bar',
        color: '#0084d1'
      }
    ],
    grid: {
      top: 40,
      left: 80,
      right: 20,
      bottom: 40,
    },
    dataZoom: [
      {
        show: true,
        start: 70,
        end: 100
      },
    ]
  }

  return (
    <Section name='Daily Revenue' variant='h6'>
      <Paper className='min-h-75 w-full'>
        <EChart option={opt} className='min-h-75' />
      </Paper>
    </Section>
  )
}
