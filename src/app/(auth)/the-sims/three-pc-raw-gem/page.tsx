import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Three PC Raw Gem - Data Reservoir'
}

export default async function ThreePCRawGem() {
  const { data } = await grabData<ITheSimsResponse['three-pc-raw-gem'][]>(API_ROUTE.THE_SIMS.THREE_PC_RAW_GEM, {
    pageSize: 50,
  });

  return (
    <Section name='The Sims Three PC Raw Gem' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-raw-gem']}>
      <SimpleGrid data={data} link='/the-sims/three-pc-raw-gem'/>
    </Section>
  )
}