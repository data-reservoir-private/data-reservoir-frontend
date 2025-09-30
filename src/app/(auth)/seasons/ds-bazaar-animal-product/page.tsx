import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Bazaar Animal Product - Data Reservoir'
}

export default async function BazaarAnimal() {
  const { data } = await grabData<ISeasonsResponse['ds-bazaar-animal-product'][]>(API_ROUTE.SEASONS.DS_BAZAAR_ANIMAL_PRODUCT, {
    pageSize: 0,
  });

  return (
    <Section name='Seasons DS Bazaar Animal Product' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-bazaar-animal-product']}>
      <SimpleGrid data={data} link='/seasons/ds-bazaar-animal-product' unoptimizedImage pixelated />
    </Section>
  )
}
