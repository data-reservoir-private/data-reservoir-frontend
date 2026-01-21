import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import FourPCElementClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Element - Data Reservoir'
}

export default async function FourPCElement() {
  const { data } = await grabData<ITheSimsResponse['four-pc-element'][]>(API_ROUTE.THE_SIMS.FOUR_PC_ELEMENT, { pageSize: 0 });

  return (
    <Section name='The Sims Four PC Element' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-element']}>
      <FourPCElementClient data={data} />
    </Section>
  )
}