import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Three PC Metal - Data Reservoir'
}

export default async function ThreePCMetal() {
  const { data } = await grabData<ITheSimsResponse['three-pc-metal'][]>(API_ROUTE.THE_SIMS.THREE_PC_METAL, {
    pageSize: 50,
  });

  return (
    <Section name='The Sims Three PC Metal' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-metal']}>
      <SimpleGrid data={data.map(x => ({...x, image: x.ingotImage}))} link='/the-sims/three-pc-metal'/>
    </Section>
  )
}