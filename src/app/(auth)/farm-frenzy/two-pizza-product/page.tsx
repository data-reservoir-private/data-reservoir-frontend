import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoPizzaProductForm, { TwoPizzaProductFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IFarmFrenzyResponse } from '@/model/response/farm-frenzy';

export const metadata: Metadata = {
  title: 'Farm Frenzy Two Pizza Product - Data Reservoir'
}

export default async function TwoPizzaProduct() {
  const sp = await getSearchParam<TwoPizzaProductFormSchema>();
  const { data, pagination } = await grabData<IFarmFrenzyResponse[]>(API_ROUTE.FARM_FRENZY.TWO_PIZZA_PRODUCT, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Farm Frenzy Two Pizza Product' variant='h4' breadcrumbs={BREADCRUMBS['farm-frenzy-two-pizza-product']}>
      <TwoPizzaProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/farm-frenzy/two-pizza-product'/>
    </Section>
  )
}
