import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import FourPCHarvestableForm, { FourPCHarvestableFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Harvestable - Data Reservoir'
}

export default async function FourPCHarvestable() {
  const sp = await getSearchParam<FourPCHarvestableFormSchema>();
  const { data, pagination } = await grabData<ITheSimsResponse['four-pc-harvestable'][]>(API_ROUTE.THE_SIMS.FOUR_PC_HARVESTABLE, {
    name: sp.name ?? "",
    form: sp.form ?? [],
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='The Sims Four PC Harvestable' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-harvestable']}>
      <FourPCHarvestableForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/the-sims/four-pc-harvestable'/>
    </Section>
  )
}