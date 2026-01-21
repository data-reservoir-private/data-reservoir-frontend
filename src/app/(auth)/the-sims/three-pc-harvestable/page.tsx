import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import ThreePCHarvestableClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Three PC Harvestable - Data Reservoir'
}

export default async function ThreePCHarvestable() {
  const { data } = await grabData<ITheSimsResponse['three-pc-harvestable'][]>(API_ROUTE.THE_SIMS.THREE_PC_HARVESTABLE, { pageSize: 0 });

  return (
    <Section name='The Sims Three PC Harvestable' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-harvestable']}>
      <ThreePCHarvestableClient data={data} />
    </Section>
  )
}