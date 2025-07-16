import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import FourPCMetalForm, { FourPCMetalFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Metal - Data Reservoir'
}

export default async function FourPCMetal() {
  const sp = await getSearchParam<FourPCMetalFormSchema>();
  const { data, pagination } = await grabData<ITheSimsResponse['four-pc-metal'][]>(API_ROUTE.THE_SIMS.FOUR_PC_METAL, {
    name: sp.name ?? "",
    rarity: sp.rarity,
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='The Sims Four PC Metal' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-metal']}>
      <FourPCMetalForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/the-sims/four-pc-metal'/>
    </Section>
  )
}