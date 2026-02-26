import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import DSTwoTownsTreeClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Two Towns Tree - Data Reservoir'
}

export default async function DSTwoTownsTree() {
  const { data } = await grabData<ISeasonsResponse['ds-two-towns-tree'][]>(API_ROUTE.SEASONS.DS_TWO_TOWNS_TREE, { pageSize: 0 });

  return (
    <Section name='Seasons DS Two Towns Tree' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-two-towns-tree']}>
      <DSTwoTownsTreeClient data={data} />
    </Section>
  )
}
