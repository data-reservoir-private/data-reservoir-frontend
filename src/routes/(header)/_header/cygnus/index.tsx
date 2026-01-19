import Section from '@/components/common/paper/Section';
import SimpleBarTableChart from '@/components/common/simple-dashboard/SimpleBarTableChart';
import SimpleQuickLink from '@/components/common/simple-dashboard/SimpleQuickLink';
import SimpleRecordTableCards from '@/components/common/simple-dashboard/SimpleRecordTableCards';
import IndexSkeleton from '@/components/common/skeleton/IndexSkeleton';
import { API_ROUTE } from '@/constant/api-route';
import { DATASETS_AVAILABLE } from '@/constant/data';
import { IDashboardResponse } from '@/model/response/dashboard';
import { grabData } from '@/utilities/http';
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';

const apiCall = createServerFn()
  .handler(async () => await grabData<IDashboardResponse>(`${API_ROUTE.DASHBOARD}/cygnus`));


export const Route = createFileRoute('/(header)/_header/cygnus/')({
  component: RouteComponent,
  loader: () => apiCall(),
  pendingComponent: () => (<IndexSkeleton />)
})

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <Section variant='h4' name='Cygnus'>
      <SimpleRecordTableCards response={data} />
      <SimpleBarTableChart response={data} />
      <SimpleQuickLink quickLink={DATASETS_AVAILABLE['cygnus']} columns={{ xs: 1, sm: 2, md: 3 }} />
    </Section>
  );
}
