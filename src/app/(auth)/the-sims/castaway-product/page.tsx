import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import CastawayProductClient from './client';

export const metadata: Metadata = {
  title: 'The Sims Castaway Product - Data Reservoir'
}

export default async function CastawayProduct() {
  const { data } = await grabData<ITheSimsResponse['castaway-product'][]>(API_ROUTE.THE_SIMS.CASTAWAY_PRODUCT, {
    pageSize: 0,
  });

  return (
    <Section name='The Sims Castaway Product' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-castaway-product']}>
      <CastawayProductClient data={data}/>
    </Section>
  )
}