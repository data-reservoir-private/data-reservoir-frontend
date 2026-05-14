import { getSearchParam, grabData } from '@/utilities/http';
import { TransactionBreakdownFormSchema } from '../form';
import { ITransactionBreakdownResponse } from '@/model/response/transaction';
import { API_ROUTE } from '@/constant/api-route';
import Section from '@/components/common/paper/Section';
import Box from '@mui/material/Box';
import { EChartsOption } from 'echarts';
import { EChart } from '@/components/common/chart/Chart';
import Paper from '@/components/common/paper/Paper';
import { MonthsArray } from '@/constant/date';
import Typography from '@mui/material/Typography';
import { round } from '@/utilities/general';

export default async function TransactionMonthly() {
  const sp = await getSearchParam<TransactionBreakdownFormSchema>();
  if (sp.month) return <></>;

  const { data: monthlyData } = await grabData<ITransactionBreakdownResponse['monthly'][]>(API_ROUTE.TRANSACTION.BREAKDOWN.MONTHLY, {
    year: sp.year,
  });

  // Echarts pie option for expense by category
  const monthlyBarChartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: monthlyData.map(item => {
        const d = new Date(item.date);
        const month = MonthsArray.find(x => x.value === d.getMonth() + 1)!.label;
        return `${month} ${d.getFullYear()}`;
      }),
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      show: true
    },
    series: [
      {
        type: 'bar',
        data: monthlyData.map(item => round(item.total, 0)),
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
  };

  return (
    <Section name='Monthly Expense' variant='h6'>
      <Box className='w-full min-h-80 flex'>
        <Paper className='min-h-80 w-full flex justify-center'>
          {
            monthlyData.length > 0 ?
              <EChart option={monthlyBarChartOption} className='w-full min-h-80' /> :
              <Box className='w-full min-h-80 flex flex-col items-center justify-center'>
                <Typography>
                  No data available for the selected year.
                </Typography>
              </Box>
          }
        </Paper>
      </Box>
    </Section>
  );
}
