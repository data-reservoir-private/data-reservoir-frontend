import BasicTable from '@/components/common/basic-table/BasicTable';
import Paper from '@/components/common/paper/Paper'
import { TransactionMonthlyResponse } from '@/model/response/transaction'
import { createColumns, createIndexColumn } from '@/utilities/table';
import React from 'react'

interface TransactionMonthlyTablesProps {
  income: TransactionMonthlyResponse['income']['detail'],
  expense: TransactionMonthlyResponse['expense']['topTen'],
}

export default function TransactionMonthlyTables({ income, expense }: TransactionMonthlyTablesProps) {
  const incomeCol = createColumns<typeof income[0]>(colHelper => [
    createIndexColumn(colHelper),
    colHelper.accessor('name', {
      cell: p => p.getValue(),
      header: "Source"
    }),
    colHelper.accessor('total', {
      cell: p => p.getValue(),
      header: "Income (IDR)",
      enableSorting: true,
    }),
  ]);

  const expenseCol = createColumns<typeof expense[0]>(colHelper => [
    createIndexColumn(colHelper),
    colHelper.accessor('tenant', {
      cell: p => p.getValue(),
      header: "Tenant"
    }),
    colHelper.accessor('total', {
      cell: p => p.getValue(),
      header: "Expense (IDR)",
      enableSorting: true,
    }),
  ]);

  return (
    <div className='grid grid-cols-2 max-md:grid-cols-1 max-md:grid-rows-1 gap-4'>
      <Paper className='p-3'>
        <BasicTable columns={incomeCol} data={income} />
      </Paper>
      <Paper className='p-3'>
        <BasicTable columns={expenseCol} data={expense} />
      </Paper>
    </div>
  )
}
