'use client';

import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { TransactionMonthlyResponse } from '@/model/response/transaction';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TransactionLineChartExpense from './TransactionLineChartExpense';
import Loading from '@/components/common/loading/Loading';
import TransactionPieChartCategory from './TransactionPieChartCategory';

export default function TransactionClientPage() {
  return (
    <div className='w-full h-full flex flex-col gap-5'>
      <Paper className='w-full text-center text-2xl font-bold p-2'>
        All-time Expenses
      </Paper>
      <div className='grid grid-cols-2 gap-6'>
        <Paper>
          <TransactionLineChartExpense/>
        </Paper>
        <Paper>
          <TransactionPieChartCategory/>
        </Paper>
      </div>
    </div>
  );
}
