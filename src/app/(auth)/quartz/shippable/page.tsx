import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoProductForm, { ShippableFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IQuartzResponse } from '@/model/response/quartz';

export const metadata: Metadata = {
  title: 'Quartz Shippable - Data Reservoir'
}

export default async function TwoProduct() {
  const sp = await getSearchParam<ShippableFormSchema>();
  const { data, pagination } = await grabData<IQuartzResponse['shippable'][]>(API_ROUTE.QUARTZ.SHIPPABLE, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Quartz Shippable' variant='h4' breadcrumbs={BREADCRUMBS['quartz-shippable']}>
      <TwoProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/quartz/shippable'/>
    </Section>
  )
}
