import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import React from 'react';
import NasiGorengBurnedFoodForm, { NasiGorengBurnedFoodFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Burned Food - Data Reservoir'
}

export default async function NasiGorengBurnedFood() {
  const sp = await getSearchParam<NasiGorengBurnedFoodFormSchema>();
  const { data, pagination } = await grabData<INasiGorengResponse['burned-food'][]>(API_ROUTE.NASI_GORENG.BURNED_FOOD, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Nasi Goreng Burned Foods' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-burned-food']}>
      <NasiGorengBurnedFoodForm param={sp} totalData={pagination?.totalData ?? 0}/>
      <SimpleGrid data={data} link='/nasi-goreng/burned-food'/>
    </Section>
  )
}