import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import { Metadata } from 'next';
import React from 'react'
import TwoProductForm, { CropFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';

export const metadata: Metadata = {
  title: 'Cygnus Crop - Data Reservoir'
}

export default async function TwoProduct() {
  const sp = await getSearchParam<CropFormSchema>();
  const { data, pagination } = await grabData<ICygnusResponse['crop'][]>(API_ROUTE.CYGNUS.CROP, {
    name: sp.name ?? "",
    category: sp.category,
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Cygnus Crop' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-crop']}>
      <TwoProductForm param={sp} totalData={pagination?.totalData ?? 0} />
      <SimpleGrid data={data} link='/cygnus/crop' unoptimizedImage pixelated/>
    </Section>
  )
}
