import { API_ROUTE } from '@/constant/api-route'
import { ITheSimsResponse } from '@/model/response/the-sims';
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import FourPCCrystalForm, { FourPCCrystalFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';

export const metadata: Metadata = {
  title: 'The Sims Four PC Crystal - Data Reservoir'
}

export default async function FourPCCrystal() {
  const sp = await getSearchParam<FourPCCrystalFormSchema>();
  const { data, pagination } = await grabData<ITheSimsResponse['four-pc-crystal'][]>(API_ROUTE.THE_SIMS.FOUR_PC_CRYSTAL, {
    name: sp.name ?? "",
    rarity: sp.rarity,
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='The Sims Four PC Crystal' variant='h4' breadcrumbs={BREADCRUMBS['the-sims-four-pc-crystal']}>
      <FourPCCrystalForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/the-sims/four-pc-crystal'/>
    </Section>
  )
}