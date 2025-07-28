import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import React from 'react';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Tool - Data Reservoir'
}

export default async function NasiGorengTool() {
  const { data } = await grabData<INasiGorengResponse['tool'][]>(API_ROUTE.NASI_GORENG.TOOL, {
    pageSize: 0,
  });

  return (
    <Section name='Nasi Goreng Tools' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-tool']}>
      <SimpleGrid data={data} link='/nasi-goreng/tool'/>
    </Section>
  )
}