import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IPizzaFrenzyResponse } from '@/model/response/pizza-frenzy';

export const metadata: Metadata = {
  title: 'Pizza Frenzy Topping - Data Reservoir'
}

export default async function PizzaFrenzyTopping() {
  const { data } = await grabData<IPizzaFrenzyResponse['topping'][]>(API_ROUTE.PIZZA_FRENZY.TOPPING, {
    pageSize: 0,
  });

  return (
    <Section name='Pizza Frenzy Topping' variant='h4' breadcrumbs={BREADCRUMBS['pizza-frenzy-topping']}>
      <SimpleGrid data={data.map(x => ({ ...x, name: x.generalName }))} link='/pizza-frenzy/topping' unoptimizedImage/>
    </Section>
  )
}
