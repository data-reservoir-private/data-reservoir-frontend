'use client';

import Paper from '@/components/common/paper/Paper';
import React, { useState } from 'react';
import TransactionLineChartExpense from './TransactionLineChartExpense';
import TransactionPieChartCategory from './TransactionPieChartCategory';
import SimpleListbox from '@/components/common/simple-listbox/SimpleListbox';
import { Months } from '@/constant/date';

export interface TransactionClientPageState {
  month: number,
  year: number
}

export default function TransactionClientPage() {

  const date = new Date();
  const [state, setState] = useState<TransactionClientPageState>({ month: date.getMonth() + 1, year: date.getFullYear() });
  const years = Array.from({ length: 5 }, (_, i) => date.getFullYear() - i)
    .reduce((acc, curr) => {
      acc[curr.toString()] = curr.toString();
      return acc;
    }, {} as {[key: string]: string});

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
      <Paper className='w-full text-center text-2xl font-bold p-2'>
        Monthly Report
      </Paper>
      <div>
        <Paper className='flex justify-between gap-3 p-2'>
          <div className='w-full'>
            <SimpleListbox onChange={e => setState({ ...state, month: parseInt(e)})} options={Months} value={state.month.toString()} />
          </div>
          <div className='w-full'>
            <SimpleListbox onChange={e => setState({ ...state, year: parseInt(e)})} options={years} value={state.year.toString()} />
          </div>
        </Paper>
      </div>
    </div>
  );
}
