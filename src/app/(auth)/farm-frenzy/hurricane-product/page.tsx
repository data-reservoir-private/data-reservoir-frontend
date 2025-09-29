import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IFarmFrenzyResponse } from '@/model/response/farm-frenzy';

export const metadata: Metadata = {
  title: 'Farm Frenzy Hurricane Seasons Product - Data Reservoir'
}

export default async function HurricaneProduct() {
  const { data } = await grabData<IFarmFrenzyResponse['hurricane'][]>(API_ROUTE.FARM_FRENZY.HURRICANE, {
    pageSize: 0,
  });

  return (
    <Section name='Farm Frenzy Hurricane Seasons Product' variant='h4' breadcrumbs={BREADCRUMBS['farm-frenzy-hurricane-product']}>
      <SimpleGrid data={data} link='/farm-frenzy/hurricane-product' unoptimizedImage/>
    </Section>
  )
}
