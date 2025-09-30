import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import ThreePCGemForm, { ThreePCGemFormSchema } from './form';

export const metadata: Metadata = {
  title: 'The Sims Three PC Gem - Data Reservoir'
}

export default async function ThreePCGem() {
  const sp = await getSearchParam<ThreePCGemFormSchema>();
  const { data, pagination } = await grabData<ITheSimsResponse['three-pc-gem'][]>(API_ROUTE.THE_SIMS.THREE_PC_GEM, {
    name: sp.name ?? "",
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='The Sims Three PC Gem' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-three-pc-gem']}>
      <ThreePCGemForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data.map(x => ({ id: x.id, name: `${x.rawGem.name} (${x.gemCut.name})`, image: x.image }))} link='/the-sims/three-pc-gem' />
    </Section>
  )
}