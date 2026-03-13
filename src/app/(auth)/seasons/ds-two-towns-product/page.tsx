import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';
import DSTwoTownsProductClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Two Towns Product - Data Reservoir'
};

export default async function DSTwoTownsProduct() {
  const { data } = await grabData<ISeasonsResponse['ds-two-towns-product'][]>(API_ROUTE.SEASONS.DS_TWO_TOWNS_PRODUCT, { pageSize: 0 });

  return (
    <Section name='Seasons DS Two Towns Product' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-two-towns-product']}>
      <DSTwoTownsProductClient data={data} />
    </Section>
  );
}
