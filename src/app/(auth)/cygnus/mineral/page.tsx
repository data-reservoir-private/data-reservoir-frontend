import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';

export const metadata: Metadata = {
  title: 'Cygnus Mineral - Data Reservoir'
}

export default async function TwoProduct() {
  const { data } = await grabData<ICygnusResponse['mineral'][]>(API_ROUTE.CYGNUS.MINERAL, {
    pageSize: 0,
  });

  return (
    <Section name='Cygnus Mineral' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-mineral']}>
      <SimpleGrid data={data} link='/cygnus/mineral' unoptimizedImage pixelated/>
    </Section>
  )
}
