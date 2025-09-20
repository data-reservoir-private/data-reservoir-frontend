import React from 'react'
import TransactionMonthlyForm, { TransactionMonthlyFormSchema } from './form'
import { MonthsArray } from '@/constant/date';
import { getSearchParam } from '@/utilities/http';

export async function generateMetadata() {
  const post = await getSearchParam<TransactionMonthlyFormSchema>();
  const m = MonthsArray.find(x => x.value == (post.month ?? new Date().getMonth() + 1))!.label;

  return {
    title: `Transaction Monthly - ${m} ${post.year ?? new Date().getFullYear()} - Data Reservoir`
  }
}

export default async function TransactionMonthly() {
  const sp = await getSearchParam<TransactionMonthlyFormSchema>();
  return (<TransactionMonthlyForm param={sp}/>)
}
