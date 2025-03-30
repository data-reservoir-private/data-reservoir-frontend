import Paper from '@/components/common/paper/Paper'
import React from 'react'

interface TransactionPageProps {
  summary: React.ReactNode,
  children: React.ReactNode
}

export default function TransactionPage(props: TransactionPageProps) {
  return (
    <div className='w-full flex flex-col gap-5'>
      <Paper className='w-full text-center text-2xl font-bold p-2'>
        All-time Expenses
      </Paper>
      { props.summary }
      <Paper className='w-full text-center text-2xl font-bold p-2'>
        Monthly Report
      </Paper>
      { props.children }
    </div>
  )
}
