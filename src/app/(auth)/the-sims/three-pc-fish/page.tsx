import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Sims Three PC Fish - Data Reservoir'
};

export default async function ThreePCFish() {
  const { data } = await grabData<ITheSimsResponse['three-pc-fish'][]>(API_ROUTE.THE_SIMS.THREE_PC_FISH.BASE, { pageSize: 0 });

  return (
    <Section name='The Sims Three PC Fish' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-fish']}>
      <SimpleGrid data={data} link='/the-sims/three-pc-fish' />
    </Section>
  );
}