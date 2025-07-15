'use server'

import { IPaginationResponse } from '@/model/response/base';
import axios from 'axios';
import https from 'https'
import 'server-only'
import * as fs from 'fs'
import queryString from 'query-string';
import { headers } from 'next/headers';
import { parseSearchParam } from './general';


export async function grabData<TData>(url: string, params?: Record<string, any>): Promise<{
  pagination?: IPaginationResponse,
  data: TData
}> {

  let agent: https.Agent | undefined = undefined;
  if (process.env.ENVIRONMENT && process.env.ENVIRONMENT == 'Development')
    {
    const cert = fs.readFileSync('./test_pk.pem');
    agent = new https.Agent({
      ca: [cert]
    });
  }
  
  const res = await axios.get(url, {
    params: params,
    httpsAgent: agent,
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
 * key as `key[]=[a,b]` rather than `key=[a, b]` which is not the 
 * @returns Search param as TResult
 */
export async function getSearchParam<TResult>() : Promise<TResult> {
  return parseSearchParam<TResult>((await headers()).get('X-Current-URL')!);
}