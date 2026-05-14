import TransactionMonthlyForm, { TransactionBreakdownFormSchema } from './form';
import { MonthsArray } from '@/constant/date';
import { getSearchParam } from '@/utilities/http';

export async function generateMetadata() {
  const post = await getSearchParam<TransactionBreakdownFormSchema>();
  const m = MonthsArray.find(x => x.value === (post.month ?? new Date().getMonth() + 1))?.label;

  return {
    title: `Transaction Breakdown - ${m ?? "Annual"} ${post.year ?? new Date().getFullYear()} - Data Reservoir`
  };
}

export default async function TransactionBreakdown() {
  const sp = await getSearchParam<TransactionBreakdownFormSchema>();
  return (<TransactionMonthlyForm param={sp}/>);
}
