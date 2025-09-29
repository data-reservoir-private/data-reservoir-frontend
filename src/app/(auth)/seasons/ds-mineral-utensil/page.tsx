import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Mineral Utensil - Data Reservoir'
}

export default async function TwoProduct() {
  const { data } = await grabData<ISeasonsResponse['ds-mineral-utensil'][]>(API_ROUTE.SEASONS.DS_MINERAL_UTENSIL, {
    pageSize: 0,
  });

  return (
    <Section name='Seasons DS Mineral Utensil' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-mineral-utensil']}>
      <SimpleGrid data={data} link='/seasons/ds-mineral-utensil' pixelated unoptimizedImage />
    </Section>
  )
}
