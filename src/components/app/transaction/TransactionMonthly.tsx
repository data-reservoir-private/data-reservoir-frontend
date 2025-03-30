'use client'

import BasicWrapper from '@/components/common/basic-wrapper/BasicWrapper';
import Paper from '@/components/common/paper/Paper';
import SimpleListboxNew from '@/components/common/simple-listbox/SimpleListboxNew';
import { API_ROUTE } from '@/constant/api-route';
import { Months } from '@/constant/date';
import { TransactionMonthlyResponse } from '@/model/response/transaction';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import TransactionMonthlyTables from './TransactionMonthlyTables';

interface TransactionMonthlyState {
  month: number,
  year: number
}

export default function TransactionMonthly() {

  const [state, setState] = useState<TransactionMonthlyState>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const queryResult = useQuery({
    queryKey: [state.month, state.year, 'transaction-monthly'],
    queryFn: async () => {
      return (await request<TransactionMonthlyResponse, {month: number, year: number}>({
        method: 'GET',
        url: API_ROUTE.TRANSACTION.MONTHLY,
        data: {
          month: state.month,
          year: state.year
        }
      })).data;
    }
  });

  const curr = new Date()
  const yearOptions = Object.fromEntries([curr.getFullYear(), curr.getFullYear() - 1, curr.getFullYear() - 2]
    .map(x => [x.toString(), x]));

  return (
    <>
      <div className='flex gap-5'>
        <SimpleListboxNew options={yearOptions} value={state.year} onChange={x => setState({ ...state, year: x })}/>
        <SimpleListboxNew options={Months} value={state.month} onChange={x => setState({ ...state, month: x })}/>
      </div>
      <BasicWrapper queryResult={queryResult}>
        {/* Income vs Expenses */}
        <Paper className='w-full h-full p-3'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <span className='text-sm italic'>Income</span>
              <span className='text-lg font-bold'>IDR {queryResult.data?.income.total}</span>
            </div>
            <div className='flex flex-col text-right'>
              <span className='text-sm italic'>Expense</span>
              <span className='text-lg font-bold'>IDR {queryResult.data?.expense.total}</span>
            </div>
          </div>
          <div className='w-full h-8 flex rounded-md overflow-hidden'>
            <div className='bg-green-600 h-full flex justify-center items-center' style={{ width: `${queryResult.data?.income.percentage}%` }}>{queryResult.data?.income.percentage}</div>
            <div className='bg-yellow-400 h-full flex justify-center items-center' style={{ width: `${queryResult.data?.expense.percentage}%` }}>{queryResult.data?.expense.percentage}</div>
          </div>
        </Paper>
        <div>
          <TransactionMonthlyTables income={queryResult.data?.income.detail ?? []} expense={queryResult.data?.expense.topTen ?? []}/>
        </div>
      </BasicWrapper>
    </>
  );
}
