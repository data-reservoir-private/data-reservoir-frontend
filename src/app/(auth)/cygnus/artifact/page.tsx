import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoProductForm, { ArtifactFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';

export const metadata: Metadata = {
  title: 'Cygnus Artifact - Data Reservoir'
}

export default async function TwoProduct() {
  const sp = await getSearchParam<ArtifactFormSchema>();
  const { data, pagination } = await grabData<ICygnusResponse['artifact'][]>(API_ROUTE.CYGNUS.ARTIFACT, {
    name: sp.name ?? "",
    category: sp.category,
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Cygnus Artifact' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-artifact']}>
      <TwoProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/cygnus/artifact' unoptimizedImage pixelated/>
    </Section>
  )
}
