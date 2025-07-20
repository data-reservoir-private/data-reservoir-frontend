import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import React from 'react';
import NasiGorengRelicForm, { NasiGorengRelicFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Relic - Data Reservoir'
}

export default async function NasiGorengRelic() {
  const sp = await getSearchParam<NasiGorengRelicFormSchema>();
  const { data, pagination } = await grabData<INasiGorengResponse['relic'][]>(API_ROUTE.NASI_GORENG.RELIC, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Nasi Goreng Relics' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-relic']}>
      <NasiGorengRelicForm param={sp} totalData={pagination?.totalData ?? 0}/>
      <SimpleGrid data={data} link='/nasi-goreng/relic'/>
    </Section>
  )
}