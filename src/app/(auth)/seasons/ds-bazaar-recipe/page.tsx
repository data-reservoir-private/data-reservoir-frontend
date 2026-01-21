import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import DSBazaarRecipeClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Bazaar Recipe - Data Reservoir'
}

export default async function TwoProduct() {
  const { data } = await grabData<ISeasonsResponse['ds-bazaar-recipe'][]>(API_ROUTE.SEASONS.DS_BAZAAR_RECIPE, { pageSize: 0 });

  return (
    <Section name='Seasons DS Bazaar Recipe' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-bazaar-recipe']}>
      <DSBazaarRecipeClient data={data} />
    </Section>
  )
}
