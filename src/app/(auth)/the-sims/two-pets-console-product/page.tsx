import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoPetsConsoleProductClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Two Pets Console Product - Data Reservoir'
}

export default async function TwoPetsConsoleProduct() {
  const { data } = await grabData<ITheSimsResponse['two-pets-console-product'][]>(API_ROUTE.THE_SIMS.TWO_PETS_CONSOLE_PRODUCT, { pageSize: 0 });

  return (
    <Section name='The Sims Two Pets Console Product' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-two-pets-console-product']}>
      <TwoPetsConsoleProductClient data={data} />
    </Section>
  )
}
