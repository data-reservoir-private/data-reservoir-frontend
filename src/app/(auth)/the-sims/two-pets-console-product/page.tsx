import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoPetsConsoleProductForm, { TwoPetsConsoleProductFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Two Pets Console Product - Data Reservoir'
}

export default async function TwoPetsConsoleProduct() {
  const sp = await getSearchParam<TwoPetsConsoleProductFormSchema>();
  const { data, pagination } = await grabData<ITheSimsResponse['two-pets-console-product'][]>(API_ROUTE.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT, {
    name: sp.name ?? "",
    category: sp.category ?? [],
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='The Sims Two Pets Console Product' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-two-pets-console-product']}>
      <TwoPetsConsoleProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/the-sims/two-pets-console-product'/>
    </Section>
  )
}
