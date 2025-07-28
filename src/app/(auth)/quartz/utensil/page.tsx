import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IQuartzResponse } from '@/model/response/quartz';

export const metadata: Metadata = {
  title: 'Quartz Utensil - Data Reservoir'
}

export default async function TwoProduct() {
  const { data } = await grabData<IQuartzResponse['utensil'][]>(API_ROUTE.QUARTZ.UTENSIL, {
    pageSize: 0,
  });

  return (
    <Section name='Quartz Utensil' variant='h4' breadcrumbs={BREADCRUMBS['quartz-utensil']}>
      <SimpleGrid data={data} link='/quartz/utensil'/>
    </Section>
  )
}
