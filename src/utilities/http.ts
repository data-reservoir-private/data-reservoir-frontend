'use server'

import { IPaginationResponse } from '@/model/response/base';
import axios from 'axios';
import https from 'https'
import 'server-only'
import * as fs from 'fs'
import queryString from 'query-string';
import { cookies, headers } from 'next/headers';
import { parseSearchParam } from './general';
import { auth } from '@clerk/nextjs/server';

export async function grabData<TData>(url: string, params?: Record<string, any>): Promise<{
  pagination?: IPaginationResponse,
  data: TData
}> {
  const { getToken } = await auth();
  const token = await getToken();

  let agent: https.Agent | undefined = undefined;
  if (process.env.ENVIRONMENT && process.env.ENVIRONMENT == 'Development')
    {
    const cert = fs.readFileSync('./test_pk.pem');
    agent = new https.Agent({
      ca: [cert]
    });
  }
  
  const res = await axios.get(url, {
    baseURL: process.env.NEXT_PUBLIC_API,
    params: params,
    httpsAgent: agent,
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    paramsSerializer: function (param) {
      return queryString.stringify(param, {
        arrayFormat: 'none',
        skipEmptyString: true,
        skipNull: true
      })
    }
  });

  return {
    pagination: res.data.pagination,
    data: res.data.data
  };
}

/**
 * NextJS built-in search params are not that advanced as it cannot handle `key[]=a&key[]=b`. It parses those
 * key as `key[]=[a,b]` rather than `key=[a, b]` which is not what the query-string lib wants
 * @returns Search param as TResult
 */
export async function getSearchParam<TResult>() : Promise<TResult> {
  // return parseSearchParam<TResult>((await headers()).get('X-Query-Param')!);
  return parseSearchParam<TResult>((await cookies()).get('QueryParam')!.value);
}