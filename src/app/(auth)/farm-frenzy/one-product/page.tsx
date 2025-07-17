import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import OneProductForm, { OneProductFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IFarmFrenzyResponse } from '@/model/response/farm-frenzy';

export const metadata: Metadata = {
  title: 'Farm Frenzy One Product - Data Reservoir'
}

export default async function OneProduct() {
  const sp = await getSearchParam<OneProductFormSchema>();
  const { data, pagination } = await grabData<IFarmFrenzyResponse[]>(API_ROUTE.FARM_FRENZY.ONE_PRODUCT, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Farm Frenzy One Product' variant='h4' breadcrumbs={BREADCRUMBS['farm-frenzy-one-product']}>
      <OneProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/farm-frenzy/one-product'/>
    </Section>
  )
}
