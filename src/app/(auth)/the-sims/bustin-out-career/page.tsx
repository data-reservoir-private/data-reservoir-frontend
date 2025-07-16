import Section from '@/components/common/paper/Section';
import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';
import React from 'react';
import BustinOutCareerTable from './table';

export const metadata: Metadata = {
  title: 'The Sims Bustin Out Career - Data Reservoir'
}

export default async function BustinOutCareer() {
  const { data, pagination } = await grabData<ITheSimsResponse['bustin-out-career'][]>(API_ROUTE.THE_SIMS.BUSTIN_OUT_CAREER, {
    // name: sp.name ?? "",
    // category: sp.category ?? [],
    // currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: 0,
  });

  return (
    <Section name='The Sims Bustin Out Career' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-bustin-out-career']}>
      <BustinOutCareerTable data={data}/>
    </Section>
  )
}
