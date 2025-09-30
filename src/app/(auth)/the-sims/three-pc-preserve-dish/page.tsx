import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Three PC Preserve Dish - Data Reservoir'
}

export default async function ThreePCPreserveDish() {
  const { data } = await grabData<ITheSimsResponse['three-pc-preserve-dish'][]>(API_ROUTE.THE_SIMS.THREE_PC_PRESERVE_DISH, {
    pageSize: 50,
  });

  return (
    <Section name='The Sims Three PC Preserve Dish' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-preserve-dish']}>
      <SimpleGrid data={data} link='/the-sims/three-pc-preserve-dish' />
    </Section>
  )
}