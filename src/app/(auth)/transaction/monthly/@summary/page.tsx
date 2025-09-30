import { getSearchParam, grabData } from '@/utilities/http';
import { TransactionMonthlyFormSchema } from '../form';
import { ITransactionMonthlyResponse } from '@/model/response/transaction';
import { API_ROUTE } from '@/constant/api-route';
import Section from '@/components/common/paper/Section';
import Box from '@mui/material/Box';
import { EChartsOption } from 'echarts';
import { EChart } from '@/components/common/chart/Chart';
import Paper from '@/components/common/paper/Paper';
import Typography from '@mui/material/Typography';

export default async function TransactionMonthlySummary() {
  const sp = await getSearchParam<TransactionMonthlyFormSchema>();
  const { data: categoryData } = await grabData<ITransactionMonthlyResponse['category'][]>(API_ROUTE.TRANSACTION.MONTHLY.CATEGORY, {
    year: sp.year ?? new Date().getFullYear(),
    month: sp.month ?? (new Date().getMonth() + 1)
  });
  const { data: incomeData } = await grabData<ITransactionMonthlyResponse['income'][]>(API_ROUTE.TRANSACTION.MONTHLY.INCOME, {
    year: sp.year ?? new Date().getFullYear(),
    month: sp.month ?? (new Date().getMonth() + 1)
  });

  const hasData = categoryData.length > 0 || incomeData.length > 0;

  // Expense total
  const expenseTotal = categoryData?.reduce((acc, curr) => acc + curr.total, 0) ?? 0;
  const incomeTotal = incomeData?.reduce((acc, curr) => acc + curr.total, 0) ?? 0;

  // Echarts pie optionn for income v expense
  const incomeExpenseOption: EChartsOption = {
    series: [
      {
        type: 'pie',
        data: [
          { value: incomeTotal, name: 'Income' },
          { value: expenseTotal, name: 'Expense' },
        ],
        label: {
          color: 'white',
        }
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: `{b} : <b>{c} ({d}%)</b>`
    },
    color: ['#1862c4', '#c95320']
  };

  // Echarts pie option for expense by category
  const expenseByCategoryOption: EChartsOption = {
    series: [
      {
        type: 'pie',
        data: categoryData.map(item => ({
          value: item.total,
          name: item.category
        })),
        label: {
          color: 'white',
        },
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: `{b} : <b>{c} ({d}%)</b>`
    }
  };

  return (
    <Section name='Summary' variant='h6'>
      {/* Two pie chars about income-expense and expense by category */}
      <Box className='w-full min-h-80 flex gap-4 max-lg:flex-col'>
        <Paper className='min-h-80 w-full flex justify-center'>
          {
            hasData ?
              <EChart option={incomeExpenseOption} className='w-full min-h-80' /> :
              <Box className='w-full min-h-80 flex flex-col items-center justify-center'>
                <Typography>
                  No data available for the selected month.
                </Typography>
              </Box>
          }
        </Paper>
        <Paper className='min-h-80 w-full flex justify-center'>
          {
            hasData ?
            <EChart option={expenseByCategoryOption} className='w-full min-h-80' /> :
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
