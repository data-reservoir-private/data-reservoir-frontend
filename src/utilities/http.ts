import queryString from 'query-string';
import { createServerOnlyFn } from '@tanstack/react-start';
import { IPaginationResponse } from '@/model/response/base';

export const grabData = createServerOnlyFn(async <TData>(url: string, params?: Record<string, any>): Promise<{
  pagination?: IPaginationResponse,
  data: TData
}> => {
  let urlFinal = `${process.env.NITRO_API_URL}${url}`;
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
      'X-API-Key': process.env.NITRO_API_KEY
    },
  });

  const res = await response.json();
  // SImulate loading
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  return {
    pagination: res.pagination,
    data: res.data
  };
});

// export async function grabData<TData>(url: string, params?: Record<string, any>): Promise<{
//   pagination?: IPaginationResponse,
//   data: TData
// }> {
//   let urlFinal = `${process.env.NEXT_PUBLIC_API}${url}`;
//   if (!!params) {
//     urlFinal = urlFinal + '?' + queryString.stringify(params, {
//       arrayFormat: 'none',
//       skipEmptyString: true,
//       skipNull: true
//     });
//   }

//   const response = await fetch(urlFinal, {
//     method: 'GET',
//     cache: 'force-cache',
//     headers: {
//       'X-API-Key': process.env.API_KEY
//     },
//   });

//   const res = await response.json();
//   // SImulate loading
//   await new Promise((resolve) => setTimeout(resolve, 2000));
  
//   return {
//     pagination: res.pagination,
//     data: res.data
//   };
// }

/**
 * NextJS built-in search params are not that advanced as it cannot handle `key[]=a&key[]=b`. It parses those
 * key as `key[]=[a,b]` rather than `key=[a, b]` which is not what the query-string lib wants
 * @returns Search param as TResult
 */
export async function getSearchParam<TResult>() {
  // const head = (await headers()).get('X-Query-Param')
  // if (head) return parseSearchParam<TResult>(head);

  // const cook = (await cookies()).get('query_params');
  // return parseSearchParam<TResult>(cook!.value);
}