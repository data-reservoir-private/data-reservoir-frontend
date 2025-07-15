import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import CastawayProductForm, { CastawayProductFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Castaway Product - Data Reservoir'
}

export default async function CastawayProduct() {
  const sp = await getSearchParam<CastawayProductFormSchema>();
  const { data, pagination } = await grabData<ITheSimsResponse['castaway-product'][]>(API_ROUTE.THE_SIMS.CASTAWAY_PRODUCT, {
    name: sp.name ?? "",
    category: sp.category ?? [],
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='The Sims Castaway Product' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-castaway-product']}>
      <CastawayProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/the-sims/castaway-product'/>
    </Section>
  )
}