import Section from '@/components/common/paper/Section';
import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';
import React from 'react';
import TwoPetsConsoleCareerTable from './table';

export const metadata: Metadata = {
  title: 'The Sims Two Console Career - Data Reservoir'
}

export default async function TwoPetsConsoleCareer() {
  const { data } = await grabData<ITheSimsResponse['two-console-career'][]>(API_ROUTE.THE_SIMS.TWO_CONSOLE_CAREER, {
    pageSize: 0,
  });

  return (
    <Section name='The Sims Two Console Career' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-two-console-career']}>
      <TwoPetsConsoleCareerTable data={data}/>
    </Section>
  )
}
