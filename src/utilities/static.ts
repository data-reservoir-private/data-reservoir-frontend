import { grabData } from "./http";

export const getStaticParams = <TResponse extends { id: string }>(url: string) => {
  return async () => {
    const { data } = await grabData<TResponse[]>(url, { pageSize: 0 });
    
    return data.map(x => ({ id: String(x.id) }));
  }
}