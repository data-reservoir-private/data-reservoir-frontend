import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { ITheSimsResponse } from '@/model/response/the-sims';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Sims Four PC Fish - Data Reservoir'
};

export default async function FourPCFish() {
  const { data } = await grabData<ITheSimsResponse['four-pc-fish'][]>(API_ROUTE.THE_SIMS.FOUR_PC_FISH.BASE, { pageSize: 0 });

  return (
    <Section name='The Sims Four PC Fish' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-fish']}>
      <SimpleGrid data={data} link='/the-sims/four-pc-fish' />
    </Section>
  );
}