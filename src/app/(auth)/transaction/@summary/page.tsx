import TransactionLineChartExpense from '@/components/app/transaction/TransactionLineChartExpense'
import TransactionPieChartCategory from '@/components/app/transaction/TransactionPieChartCategory'
import Paper from '@/components/common/paper/Paper'
import { GetSummary } from '@/service/transaction'
import React from 'react'

export default async function SummaryPage() {

  const data = await GetSummary();

  return (
    <div className='grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:grid-rows-1'>
      <Paper>
        <TransactionLineChartExpense data={data.monthly} />
      </Paper>
      <Paper>
        <TransactionPieChartCategory data={data.category} />
      </Paper>
    </div>
  )
}
