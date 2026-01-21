import { API_ROUTE } from '@/constant/api-route'
import { grabData } from '@/utilities/http'
import React from 'react';
import NasiGorengIngredientClient from './client';
import Section from '@/components/common/paper/Section';
import { Metadata } from 'next';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';

export const metadata: Metadata = {
  title: 'Nasi Goreng Ingredient - Data Reservoir'
}

export default async function NasiGorengIngredient() {
  const { data } = await grabData<INasiGorengResponse['ingredient'][]>(API_ROUTE.NASI_GORENG.INGREDIENT, { pageSize: 0 });

  return (
    <Section name='Nasi Goreng Ingredients' variant='h4' breadcrumbs={BREADCRUMBS['nasi-goreng-ingredient']}>
      <NasiGorengIngredientClient data={data}/>
    </Section>
  )
}