import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import { Metadata } from 'next';
import DSTwoTownsFishingCatchClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Two Towns Fishing Catch - Data Reservoir'
}

export default async function DSTwoTownsFishingCatch() {
  const { data } = await grabData<ISeasonsResponse['ds-two-towns-fishing-catch'][]>(API_ROUTE.SEASONS.DS_TWO_TOWNS_FISHING_CATCH, { pageSize: 0 });

  return (
    <Section name='Seasons DS Two Towns Fishing Catch' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-two-towns-fishing-catch']}>
      <DSTwoTownsFishingCatchClient data={data} />
    </Section>
  )
}
