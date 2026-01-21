import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Mineral Shippable - Data Reservoir'
}

export default async function DSMineralShippable() {
  const { data, pagination } = await grabData<ISeasonsResponse['ds-mineral-shippable'][]>(API_ROUTE.SEASONS.DS_MINERAL_SHIPPABLE, {
    pageSize: 0,
  });

  return (
    <Section name='Seasons DS Mineral Shippable' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-mineral-shippable']}>
      <SimpleGrid data={data} link='/seasons/ds-mineral-shippable' pixelated unoptimizedImage />
    </Section>
  )
}
