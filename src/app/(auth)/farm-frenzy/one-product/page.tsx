import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IFarmFrenzyResponse } from '@/model/response/farm-frenzy';

export const metadata: Metadata = {
  title: 'Farm Frenzy One Product - Data Reservoir'
}

export default async function OneProduct() {
  const { data } = await grabData<IFarmFrenzyResponse['one'][]>(API_ROUTE.FARM_FRENZY.ONE_PRODUCT, {
    pageSize: 0,
  });

  return (
    <Section name='Farm Frenzy One Product' variant='h4' breadcrumbs={BREADCRUMBS['farm-frenzy-one-product']}>
      <SimpleGrid data={data} link='/farm-frenzy/one-product' unoptimizedImage/>
    </Section>
  )
}
