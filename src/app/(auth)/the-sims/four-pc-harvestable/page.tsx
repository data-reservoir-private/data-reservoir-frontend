import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import FourPCHarvestableClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Harvestable - Data Reservoir'
}

export default async function FourPCHarvestable() {
  const { data } = await grabData<ITheSimsResponse['four-pc-harvestable'][]>(API_ROUTE.THE_SIMS.FOUR_PC_HARVESTABLE, { pageSize: 0 });

  return (
    <Section name='The Sims Four PC Harvestable' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-harvestable']}>
      <FourPCHarvestableClient data={data} />
    </Section>
  )
}