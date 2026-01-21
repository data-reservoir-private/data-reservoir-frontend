import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import ThreePCGemClient from './client';

export const metadata: Metadata = {
  title: 'The Sims Three PC Gem - Data Reservoir'
}

export default async function ThreePCGem() {
  const { data } = await grabData<ITheSimsResponse['three-pc-gem'][]>(API_ROUTE.THE_SIMS.THREE_PC_GEM, { pageSize: 0 });

  return (
    <Section name='The Sims Three PC Gem' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-gem']}>
      <ThreePCGemClient data={data} />
    </Section>
  )
}