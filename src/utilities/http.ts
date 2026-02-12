'use server'

import { IPaginationResponse } from '@/model/response/base';
import 'server-only'
import queryString from 'query-string';
import { cookies, headers } from 'next/headers';
import { parseSearchParam } from './general';

export async function grabData<TData>(url: string, params?: Record<string, any>): Promise<{
  pagination?: IPaginationResponse,
  data: TData
}> {
  let urlFinal = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  if (!!params) {
    urlFinal = urlFinal + '?' + queryString.stringify(params, {
      arrayFormat: 'none',
      skipEmptyString: true,
      skipNull: true
    });
  }

  const response = await fetch(urlFinal, {
    method: 'GET',
    cache: 'force-cache',
    headers: {
      'X-API-Key': process.env.API_KEY
    },
    next: {
      revalidate: 3600 * 24 * 2
    }
  });

  const res = await response.json();
  return {
    pagination: res.pagination,
    data: res.data
  };
}

/**
 * NextJS built-in search params are not that advanced as it cannot handle `key[]=a&key[]=b`. It parses those
 * key as `key[]=[a,b]` rather than `key=[a, b]` which is not what the query-string lib wants
 * @returns Search param as TResult
 */
export async function getSearchParam<TResult>(): Promise<TResult> {
  const head = (await headers()).get('X-Query-Param')
  if (head) return parseSearchParam<TResult>(head);

  const cook = (await cookies()).get('query_params');
  return parseSearchParam<TResult>(cook!.value);
}