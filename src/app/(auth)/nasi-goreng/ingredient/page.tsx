import { API_ROUTE } from '@/constant/api-route'
import { getSearchParam, grabData } from '@/utilities/http'
import React from 'react';
import NasiGorengIngredientForm, { NasiGorengIngredientFormSchema } from './form';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Ingredient - Data Reservoir'
}

export default async function NasiGorengIngredient() {
  const sp = await getSearchParam<NasiGorengIngredientFormSchema>();
  const { data, pagination } = await grabData<INasiGorengResponse['ingredient'][]>(API_ROUTE.NASI_GORENG.INGREDIENT, {
    name: sp.name ?? "",
    category: sp.category ?? [],
    currentPage: Math.max(1, sp.currentPage ?? 1),
    pageSize: sp.pageSize ?? 50,
  });

  return (
    <Section name='Nasi Goreng Ingredients' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-ingredient']}>
      <NasiGorengIngredientForm param={sp} totalData={pagination?.totalData ?? 0}/>
      <SimpleGrid data={data} link='/nasi-goreng/ingredient'/>
    </Section>
  )
}