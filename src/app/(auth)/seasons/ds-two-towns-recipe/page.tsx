import { API_ROUTE } from '@/constant/api-route';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';
import DSTwoTownsRecipeClient from './client';
import Section from '@/components/common/paper/Section';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ISeasonsResponse } from '@/model/response/seasons';

export const metadata: Metadata = {
  title: 'Seasons DS Two Towns Recipe - Data Reservoir'
};

export default async function DSTwoTownsRecipe() {
  const { data } = await grabData<ISeasonsResponse['ds-two-towns-recipe'][]>(API_ROUTE.SEASONS.DS_TWO_TOWNS_RECIPE, { pageSize: 0 });

  return (
    <Section name='Seasons DS Two Towns Recipe' variant='h4' breadcrumbs={BREADCRUMBS['seasons-ds-two-towns-recipe']}>
      <DSTwoTownsRecipeClient data={data} />
    </Section>
  );
}
