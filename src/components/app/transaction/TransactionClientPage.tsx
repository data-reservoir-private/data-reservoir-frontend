'use client';

import Paper from '@/components/common/paper/Paper';
import { API_ROUTE } from '@/constant/api-route';
import { TransactionResponse } from '@/model/response/transaction';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import TransactionLineChartExpense from './TransactionLineChartExpense';
import Loading from '@/components/common/loading/Loading';

export default function TransactionClientPage() {
  const { isLoading, data } = useQuery({
    queryKey: ["transaction"],
    queryFn: async () => {
      const j = await request<TransactionResponse[], {}>({
        method: "GET",
        url: API_ROUTE.TRANSACTION,
      });
      return (j?.data ?? []);
    }
  });

  if (isLoading) return <Loading />;
  else if (!data) return <p>Data unavailable</p>;
  return (
    <div className='w-full h-full flex flex-col gap-5'>
      <Paper className='w-full text-center text-2xl font-bold p-2'>
        All-time Expenses
      </Paper>
      <div className='grid grid-cols-2'>
        <Paper>
          <TransactionLineChartExpense expense={data}/>
        </Paper>
      </div>
    </div>
  );
}
