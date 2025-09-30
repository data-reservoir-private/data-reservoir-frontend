import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Wild Animal Product - Data Reservoir'
}

export default async function WildAnimal() {
  const { data } = await grabData<ISeasonsResponse['ds-bazaar-wild-product'][]>(API_ROUTE.SEASONS.DS_BAZAAR_WILD_PRODUCT, {
    pageSize: 0,
  });

  return (
    <Section name='Seasons DS Wild Animal Product' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-bazaar-wild-product']}>
      <SimpleGrid data={data} link='/seasons/ds-bazaar-wild-product' unoptimizedImage pixelated />
    </Section>
  )
}
