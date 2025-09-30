import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IFarmFrenzyResponse } from '@/model/response/farm-frenzy';

export const metadata: Metadata = {
  title: 'Farm Frenzy Three Product - Data Reservoir'
}

export default async function ThreeProduct() {
  const { data } = await grabData<IFarmFrenzyResponse['three'][]>(API_ROUTE.FARM_FRENZY.THREE_PRODUCT, {
    pageSize: 0,
  });

  return (
    <Section name='Farm Frenzy Three Product' variant='h4' breadcrumbs={BREADCRUMBS['farm-frenzy-three-product']}>
      <SimpleGrid data={data} link='/farm-frenzy/three-product' unoptimizedImage/>
    </Section>
  )
}
