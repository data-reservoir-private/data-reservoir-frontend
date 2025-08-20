'use server'

import { IPaginationResponse } from '@/model/response/base';
import 'server-only'
import queryString from 'query-string';
import { cookies } from 'next/headers';
import { parseSearchParam } from './general';
// import { auth } from '@clerk/nextjs/server';

export async function grabData<TData>(url: string, params?: Record<string, any>): Promise<{
  pagination?: IPaginationResponse,
  data: TData
}> {
  // const { getToken } = await auth();
  // const token = await getToken();

  let urlFinal = `${process.env.NEXT_PUBLIC_API}${url}`;
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
      // Authorization: `Bearer ${token}`
      'X-API-Key': process.env.API_KEY
    },
    next: {
      revalidate: 3600
    }
  });

  const res = await response.json();
  // SImulate loading
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
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
  // return parseSearchParam<TResult>((await headers()).get('X-Query-Param')!);
  return parseSearchParam<TResult>((await cookies()).get('QueryParam')!.value);
}