import TransactionMonthlyForm, { TransactionBreakdownFormSchema } from './form';
import { MonthsArray } from '@/constant/date';
import { getSearchParam } from '@/utilities/http';

export async function generateMetadata() {
  const post = await getSearchParam<TransactionBreakdownFormSchema>();
  let title;

  if (!post.month && !post.year) title = "Overall";
  else if (!!post.year && !post.month) title = `${post.year}`;
  else if (!!post.year && !!post.month) title = `${post.year} ${MonthsArray.find(x => x.value === (post.month! + 1))?.label}`;
  else title = "?";

  return {
    title: `Transaction Breakdown - ${title} - Data Reservoir`
  };
}

export default async function TransactionBreakdown() {
  const sp = await getSearchParam<TransactionBreakdownFormSchema>();
  return (<TransactionMonthlyForm param={sp}/>);
}
