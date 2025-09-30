import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IFarmFrenzyResponse } from '@/model/response/farm-frenzy';

export const metadata: Metadata = {
  title: 'Farm Frenzy Two Product - Data Reservoir'
}

export default async function TwoProduct() {
  const { data } = await grabData<IFarmFrenzyResponse['two'][]>(API_ROUTE.FARM_FRENZY.TWO_PRODUCT, {
    pageSize: 0,
  });

  return (
    <Section name='Farm Frenzy Two Product' variant='h4' breadcrumbs={BREADCRUMBS['farm-frenzy-two-product']}>
      <SimpleGrid data={data} link='/farm-frenzy/two-product' unoptimizedImage />
    </Section>
  )
}
