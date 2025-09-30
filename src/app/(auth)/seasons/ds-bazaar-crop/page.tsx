import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Bazaar Crops - Data Reservoir'
}

export default async function BazaarCrop() {
  const { data } = await grabData<ISeasonsResponse['ds-bazaar-crop'][]>(API_ROUTE.SEASONS.DS_BAZAAR_CROP, {
    pageSize: 0,
  });

  return (
    <Section name='Seasons DS Bazaar Crop' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-bazaar-crop']}>
      <SimpleGrid data={data} link='/seasons/ds-bazaar-crop' unoptimizedImage pixelated />
    </Section>
  )
}
