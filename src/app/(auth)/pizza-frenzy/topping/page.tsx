import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoProductForm, { ToppingFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IPizzaFrenzyResponse } from '@/model/response/pizza-frenzy';

export const metadata: Metadata = {
  title: 'Pizza Frenzy Topping - Data Reservoir'
}

export default async function TwoProduct() {
  const sp = await getSearchParam<ToppingFormSchema>();
  const { data, pagination } = await grabData<IPizzaFrenzyResponse['topping'][]>(API_ROUTE.PIZZA_FRENZY.TOPPING, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Pizza Frenzy Topping' variant='h4' breadcrumbs={BREADCRUMBS['pizza-frenzy-topping']}>
      <TwoProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data.map(x => ({ ...x, name: x.generalName }))} link='/pizza-frenzy/topping'/>
    </Section>
  )
}
