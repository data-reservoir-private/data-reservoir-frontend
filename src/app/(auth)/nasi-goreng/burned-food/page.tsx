import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import React from 'react';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Burned Food - Data Reservoir'
}

export default async function NasiGorengBurnedFood() {
  const { data } = await grabData<INasiGorengResponse['burned-food'][]>(API_ROUTE.NASI_GORENG.BURNED_FOOD, {
    pageSize: 0,
  });

  return (
    <Section name='Nasi Goreng Burned Foods' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-burned-food']}>
      <SimpleGrid data={data} link='/nasi-goreng/burned-food'/>
    </Section>
  )
}