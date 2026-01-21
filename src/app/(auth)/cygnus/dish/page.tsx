import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';

export const metadata: Metadata = {
  title: 'Cygnus Dish - Data Reservoir'
}

export default async function TwoProduct() {
  const { data } = await grabData<ICygnusResponse['dish'][]>(API_ROUTE.CYGNUS.DISH, {
    pageSize: 0,
  });

  return (
    <Section name='Cygnus Dish' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-dish']}>
      <SimpleGrid data={data} link='/cygnus/dish' unoptimizedImage pixelated/>
    </Section>
  )
}
