import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import FourPCMetalClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Metal - Data Reservoir'
}

export default async function FourPCMetal() {
  const { data } = await grabData<ITheSimsResponse['four-pc-metal'][]>(API_ROUTE.THE_SIMS.FOUR_PC_METAL, { pageSize: 0 });

  return (
    <Section name='The Sims Four PC Metal' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-metal']}>
      <FourPCMetalClient data={data} />
    </Section>
  )
}