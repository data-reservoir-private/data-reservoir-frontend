import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoProductForm, { ForageFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';

export const metadata: Metadata = {
  title: 'Cygnus Forage - Data Reservoir'
}

export default async function TwoProduct() {
  const sp = await getSearchParam<ForageFormSchema>();
  const { data, pagination } = await grabData<ICygnusResponse['forage'][]>(API_ROUTE.CYGNUS.FORAGE, {
    name: sp.name ?? "",
    category: sp.category,
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Cygnus Forage' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-forage']}>
      <TwoProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/cygnus/forage' unoptimizedImage pixelated/>
    </Section>
  )
}
