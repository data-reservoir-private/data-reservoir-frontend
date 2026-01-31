import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import FourPCCannedDishClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Canned Dish - Data Reservoir'
}

export default async function FourPCCannedDish() {
  const { data } = await grabData<ITheSimsResponse['four-pc-canned-dish'][]>(API_ROUTE.THE_SIMS.FOUR_PC_CANNED_DISH, { pageSize: 0 });

  return (
    <Section name='The Sims Four PC Canned Dish' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-canned-dish']}>
      <FourPCCannedDishClient data={data} />
    </Section>
  )
}
