import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { getSearchParam, grabData } from '@/utilities/http';
import { EChartsOption } from 'echarts';
import { HaydayOrderFormSchema } from '../form';
import { EChart } from '@/components/common/chart/Chart';
import Section from '@/components/common/paper/Section';

export default async function DistributionPage() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  if (sp.month || sp.year) return null;

  const { data } = await grabData<IHaydayResponse['hayday-order']['level'][]>(API_ROUTE.HAY_DAY.ORDER.LEVEL, sp);
  if (!data) return null;

  const opt: EChartsOption = {
    yAxis: {
      type: 'value',
      axisLine: {
        show: true
      }
    },
    xAxis: {
      type: 'category',
      data: data.filter(x => x.level > 0).map(x => x.level)
    },
    series: [
      {
        name: 'Revenue Boxplot',
        type: 'boxplot',
        data: data.filter(x => x.level > 0).map(x => ([x.boxplot.min, x.boxplot.q1, x.boxplot.median, x.boxplot.q3, x.boxplot.max]))
      },
      {
        name: 'Outliers',
        type: 'scatter',

        data: data.filter(x => x.level > 0).flatMap(x => x.boxplot.outliers.map(y => [x.level.toString(), y ])),
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
    dataZoom: [
      {
        show: true,
        start: 50
      },
    ]
  };

  return (
    <Section name='Level Distribution' variant='h6' caption='Distribution on revenue based on level'>
      <Paper className='min-h-300 w-full'>
        <EChart option={opt} className='min-h-300' />
      </Paper>
    </Section>
  );
}
