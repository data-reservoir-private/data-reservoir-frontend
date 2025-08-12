import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import React from 'react';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Plate - Data Reservoir'
}

export default async function NasiGorengPlate() {
  const { data } = await grabData<INasiGorengResponse['plate'][]>(API_ROUTE.NASI_GORENG.PLATE);

  return (
    <Section name='Nasi Goreng Plates' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-plate']}>
      <SimpleGrid data={data.map(x => ({ ...x, name: "" }))} link='/nasi-goreng/plate'/>
    </Section>
  )
}