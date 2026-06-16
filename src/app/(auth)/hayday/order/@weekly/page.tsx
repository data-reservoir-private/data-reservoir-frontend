import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http';
import { EChartsOption } from 'echarts';
import { HaydayOrderFormSchema } from '../form';
import { EChart } from '@/components/common/chart/Chart';
import Section from '@/components/common/paper/Section';

export default async function WeeklyPage() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  if (sp.month && sp.year) return <></>;

  const { data } = await grabData<IHaydayResponse['hayday-order']['weekly'][]>(API_ROUTE.HAY_DAY.ORDER.WEEKLY, sp);

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
        name: 'Coin',
        type: 'bar',
        data: data.map(x => x.coinEvent),
        stack: 'event',
        color: '#efb100',
      },
      {
        name: 'XP',
        type: 'bar',
        data: data.map(x => x.xpEvent),
        stack: 'event',
        color: '#0084d1'
      },
      {
        name: 'Coin (Event)',
        type: 'bar',
        data: data.map(x => x.coin),
        stack: 'nonEvent',
        color: '#c1860080'
      },
      {
        name: 'XP (Event)',
        type: 'bar',
        data: data.map(x => x.xp),
        stack: 'nonEvent',
        color: '#005f8d80'
      },
      {
        name: 'Revenue (Event)',
        type: 'line',
        data: data.map(x => x.revenueEvent),
        symbolSize: 12,
        color: '#05df72',
        lineStyle: {
          width: 4,
          color: '#05df72'
        }
      },
      {
        name: 'Revenue',
        type: 'line',
        data: data.map(x => x.revenue),
        symbolSize: 12,
        color: '#028a4d',
        lineStyle: {
          width: 4,
          color: '#028a4d80'
        }
      },
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
        start: 50,
        end: 100
      },
    ]
  };

  return (
    <Section name='Weekly Revenue' variant='h6' caption='Transluscent chart means revenue without event or ad bonus'>
      <Paper className='min-h-75 w-full'>
        <EChart option={opt} className='min-h-75' />
      </Paper>
    </Section>
  );
}
