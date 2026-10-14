import { API_ROUTE } from '@/constant/api-route';
import { IHaydayResponse } from '@/model/response/hayday';
import { grabData } from '@/utilities/http';
import { Metadata } from 'next';
import HaydayProductClient from './client';
import { cacheLife, cacheTag } from 'next/cache';

export const metadata: Metadata = {
  title: 'Hayday Product - Data Reservoir'
};

export default async function HaydayProduct() {
  'use cache';
  cacheLife('hours');
  cacheTag('hayday');
  const { data } = await grabData<IHaydayResponse['hayday-product'][]>(API_ROUTE.HAY_DAY.PRODUCT.BASE, {
    pageSize: 0,
  });

  return <HaydayProductClient data={data} />;
}