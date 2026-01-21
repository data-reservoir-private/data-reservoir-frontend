import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import FourPCDishClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Dish - Data Reservoir'
}

export default async function FourPCDish() {
  const { data } = await grabData<ITheSimsResponse['four-pc-dish'][]>(API_ROUTE.THE_SIMS.FOUR_PC_DISH, { pageSize: 0 });

  return (
    <Section name='The Sims Four PC Dish' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-dish']}>
      <FourPCDishClient data={data} />
    </Section>
  )
}