import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import ThreePCHarvestableForm, { ThreePCHarvestableFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Three PC Harvestable - Data Reservoir'
}

export default async function ThreePCHarvestable() {
  const sp = await getSearchParam<ThreePCHarvestableFormSchema>();
  const { data, pagination } = await grabData<ITheSimsResponse['three-pc-harvestable'][]>(API_ROUTE.THE_SIMS.THREE_PC_HARVESTABLE, {
    name: sp.name ?? "",
    form: sp.form ?? [],
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='The Sims Three PC Harvestable' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-harvestable']}>
      <ThreePCHarvestableForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/the-sims/three-pc-harvestable'/>
    </Section>
  )
}