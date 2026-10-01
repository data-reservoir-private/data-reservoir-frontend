import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Sims Three PC Grocery - Data Reservoir'
};

export default async function ThreePCGrocery() {
  const { data } = await grabData<ITheSimsResponse['three-pc-grocery'][]>(API_ROUTE.THE_SIMS.THREE_PC_GROCERY.BASE, { pageSize: 0 });

  return (
    <Section name='The Sims Three PC Grocery' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-grocery']}>
      <SimpleGrid data={data} link='/the-sims/three-pc-grocery' />
    </Section>
  );
}