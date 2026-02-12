import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import FourPCCrystalClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Crystal - Data Reservoir'
}

export default async function FourPCCrystal() {
  const { data } = await grabData<ITheSimsResponse['four-pc-crystal'][]>(API_ROUTE.THE_SIMS.FOUR_PC_CRYSTAL, { pageSize: 0 });

  return (
    <Section name='The Sims Four PC Crystal' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-crystal']}>
      <FourPCCrystalClient data={data} />
    </Section>
  )
}