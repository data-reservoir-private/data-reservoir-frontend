import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import ThreePCDishClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Three PC Dish - Data Reservoir'
}

export default async function ThreePCDish() {
  const { data } = await grabData<ITheSimsResponse['three-pc-dish'][]>(API_ROUTE.THE_SIMS.THREE_PC_DISH, { pageSize: 0 });

  return (
    <Section name='The Sims Three PC Dish' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-dish']}>
      <ThreePCDishClient data={data} />
    </Section>
  )
}