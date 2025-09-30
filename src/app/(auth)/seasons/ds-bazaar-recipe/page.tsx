import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoProductForm, { DSBazaarRecipeFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Bazaar Recipe - Data Reservoir'
}

export default async function TwoProduct() {
  const sp = await getSearchParam<DSBazaarRecipeFormSchema>();
  const { data, pagination } = await grabData<ISeasonsResponse['ds-bazaar-recipe'][]>(API_ROUTE.SEASONS.DS_BAZAAR_RECIPE, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Seasons DS Bazaar Recipe' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-bazaar-recipe']}>
      <TwoProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/seasons/ds-bazaar-recipe' unoptimizedImage pixelated/>
    </Section>
  )
}
