import { getSearchParam, grabData } from '@/utilities/http';
import { TransactionMonthlyFormSchema } from '../form';
import { ITransactionMonthlyResponse } from '@/model/response/transaction';
import { API_ROUTE } from '@/constant/api-route';
import Section from '@/components/common/paper/Section';
import Box from '@mui/material/Box';
import { EChartsOption } from 'echarts';
import { EChart } from '@/components/common/chart/Chart';
import Paper from '@/components/common/paper/Paper';
import { DaysArray, MonthsArray } from '@/constant/date';
import Typography from '@mui/material/Typography';

export default async function TransactionDaily() {
  const sp = await getSearchParam<TransactionMonthlyFormSchema>();
  const { data: dailyData } = await grabData<ITransactionMonthlyResponse['daily'][]>(API_ROUTE.TRANSACTION.MONTHLY.DAILY, {
    year: sp.year ?? new Date().getFullYear(),
    month: sp.month ?? (new Date().getMonth() + 1)
  });

  // Echarts pie option for expense by category
  const dailyBarChartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: dailyData.map(item => {
        const d = new Date(item.date);
        const month = MonthsArray.find(x => x.value === d.getMonth() + 1)!.label;
        const dayName = DaysArray[d.getDay()];
        return `${dayName}, ${d.getDate()} ${month}`;
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
        data: dailyData.map(item => item.total),
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
    <Section name='Daily Expense' variant='h6'>
      {/* Two pie chars about income-expense and expense by category */}
      <Box className='w-full min-h-80 flex'>
        <Paper className='min-h-80 w-full flex justify-center'>
          {
            dailyData.length > 0 ?
              <EChart option={dailyBarChartOption} className='w-full min-h-80' /> :
              <Box className='w-full min-h-80 flex flex-col items-center justify-center'>
                <Typography>
                  No data available for the selected month.
                </Typography>
              </Box>
          }
        </Paper>
      </Box>
    </Section>
  )
}
