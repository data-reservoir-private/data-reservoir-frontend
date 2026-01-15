import { EChart } from '../chart/Chart';
import { EChartsOption } from 'echarts';
import { IDashboardResponse } from '@/model/response/dashboard';
import Paper from '../paper/Paper';

interface SimpleBarTableChartProps {
  response: IDashboardResponse
}

export default function SimpleBarTableChart(props : SimpleBarTableChartProps) {
  const opt: EChartsOption = {
    xAxis: {
      type: 'category',
      show: false,
      data: props.response.datasets.map(x => x.name)
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: props.response.datasets.map(x => x.total),
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          color: 'white'
        }
      }
    ],
    tooltip: {
      show: true
    },
    grid: {
      top: 40,
      left: 40,
      right: 40,
      bottom: 40,
    },
  }

  return (
    <Paper className='p-2'>
      <EChart className='w-full h-[300px]' option={opt}/>
    </Paper>
  );
}
