import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoProductForm, { UtensilFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IQuartzResponse } from '@/model/response/quartz';

export const metadata: Metadata = {
  title: 'Quartz Utensil - Data Reservoir'
}

export default async function TwoProduct() {
  const sp = await getSearchParam<UtensilFormSchema>();
  const { data, pagination } = await grabData<IQuartzResponse['utensil'][]>(API_ROUTE.QUARTZ.UTENSIL, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Quartz Utensil' variant='h4' breadcrumbs={BREADCRUMBS['quartz-utensil']}>
      <TwoProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/quartz/utensil'/>
    </Section>
  )
}
