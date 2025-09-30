import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Bazaar Windmill Product - Data Reservoir'
}

export default async function BazaarWindmill() {
  const { data } = await grabData<ISeasonsResponse['ds-bazaar-windmill-product'][]>(API_ROUTE.SEASONS.DS_BAZAAR_WINDMILL_PRODUCT, {
    pageSize: 0,
  });

  return (
    <Section name='Seasons DS Bazaar Windmill Product' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-bazaar-windmill-product']}>
      <SimpleGrid data={data} link='/seasons/ds-bazaar-windmill-product' pixelated unoptimizedImage/>
    </Section>
  )
}
