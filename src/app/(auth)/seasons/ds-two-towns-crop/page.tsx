import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';
import DSTwoTownsCropClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Two Towns Crop - Data Reservoir'
};

export default async function DSTwoTownsCrop() {
  const { data } = await grabData<ISeasonsResponse['ds-two-towns-crop'][]>(API_ROUTE.SEASONS.DS_TWO_TOWNS_CROP, { pageSize: 0 });

  return (
    <Section name='Seasons DS Two Towns Crop' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-two-towns-crop']}>
      <DSTwoTownsCropClient data={data} />
    </Section>
  );
}
