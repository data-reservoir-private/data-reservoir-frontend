import React from 'react'
import HaydayOrderForm, { HaydayOrderFormSchema } from './form'
import { MonthsArray } from '@/constant/date';
import { getSearchParam } from '@/utilities/http';

export async function generateMetadata() {
  const post = await getSearchParam<HaydayOrderFormSchema>();

  if (post.month && post.year) {
    const m = MonthsArray.find(x => x.value == post.month!)!.label;

    return {
      title: `Hayday Order - ${m} ${post.year} - Data Reservoir`
    }
  }

  return {
    title: `Hayday Order - All Time - Data Reservoir`
  }
}

export default async function HaydayOrder() {
  const sp = await getSearchParam<HaydayOrderFormSchema>();
  return (<HaydayOrderForm param={sp}/>)
}
