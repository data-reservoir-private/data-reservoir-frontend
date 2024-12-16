import { BaseRequest } from "@/model/request/base";
import { BaseResponse } from "@/model/response/base";
import { isNil, omitBy } from "lodash";

export async function request<TResponse, TRequest extends Record<string, any> | never>(request: BaseRequest<TRequest>, useForm: boolean = true): Promise<BaseResponse<TResponse>> {
  // Kita pecah prosesnya biar GET dan DELETE punya proses sendiri biar nga mabuk

  let url = request.url;
  if (request.method === "GET" || request.method === "DELETE") {
    const arrayParams = Object.entries(omitBy(request.data ?? {}, isNil))
      .flatMap(([k, v]) => {
        if (Array.isArray(v)) return v.map(x => ([k, x]));
        else return [[k, v]];
      });
    url = url + "?" + new URLSearchParams(arrayParams);
  }

  const conf: RequestInit = {
    method: request.method,
    cache: 'default'
  };

  // Jika kita kirim data pakai form, maka kita masukkan ke formData
  if (request.method !== "GET" && request.method !== "DELETE"){
    if (useForm && request.data) conf.body = toFormData(request.data!);
    else conf.body = JSON.stringify(omitBy(request.data ?? {}, isNil));
  }
  const response = await(await fetch(url, conf)).json() as BaseResponse<TResponse>;
  return response;
}

export function toFormData(param: any): FormData{
  if (typeof param !== "object") return new FormData();

  const formData = new FormData();
  Object.keys(param).forEach(key => {
    if (Array.isArray(param[key])) param[key].forEach(x => formData.append(key + '[]', x));
    else formData.append(key, param[key]);
  });

  return formData;
}