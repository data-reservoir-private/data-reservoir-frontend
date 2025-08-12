import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import React from 'react';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';
import NasiGorengFriedRiceForm, { NasiGorengFriedRiceFormSchema } from './form';

export const metadata: Metadata = {
  title: 'Nasi Goreng Fried Rice - Data Reservoir'
}

export default async function NasiGorengFriedRice() {
  const sp = await getSearchParam<NasiGorengFriedRiceFormSchema>();
  const { data, pagination } = await grabData<INasiGorengResponse['fried-rice'][]>(API_ROUTE.NASI_GORENG.FRIED_RICE, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Nasi Goreng Fried Rices' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-fried-rice']}>
      <NasiGorengFriedRiceForm param={sp} totalData={pagination?.totalData ?? 0}/>
      <SimpleGrid data={data.map(x => ({ ...x, image: x.imageLevel6 }))} link='/nasi-goreng/fried-rice'/>
    </Section>
  )
}