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
  if (!sp.month || !sp.year) return null;

  const { data } = await grabData<IHaydayResponse['hayday-order']['level'][]>(API_ROUTE.HAY_DAY.ORDER.DISTRIBUTION, sp);
  if (!data) return null;

  const opt: EChartsOption = {
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: data.map(x => x.level)
    },
    series: [
      {
        name: 'Revenue Boxplot',
        type: 'boxplot',
        // data: [
        //   [data.boxplot.min, data.boxplot.q1, data.boxplot.median, data.boxplot.q3, data.boxplot.max],
        // ],
        data: data.map(x => ([x.boxplot.min, x.boxplot.q1, x.boxplot.median, x.boxplot.q3, x.boxplot.max]))
      },
      // {
      //   name: 'outliers',
      //   type: 'scatter',
      //   data: data.boxplot.outliers,
      //   tooltip: {
      //     show: false
      //   }
      // }
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
  };

  return (
    <Section name='Level Distribution' variant='h6' caption='Distribution on revenue based on level'>
      <Paper className='min-h-75 w-full'>
        <EChart option={opt} className='min-h-75' />
      </Paper>
    </Section>
  );
}
