import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { ICygnusResponse } from '@/model/response/cygnus';
import { grabData } from '@/utilities/http';
import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const apiCall = createServerFn({ method: 'GET' })
  .handler(async () => {
    return await grabData<ICygnusResponse['crop'][]>(API_ROUTE.CYGNUS.CROP, {
      pageSize: 0
    })
  });

export const Route = createFileRoute('/(header)/_header/cygnus/crop/')({
  component: RouteComponent,
  loader: () => apiCall()
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <Section name='Cygnus Crop' variant='h4' breadcrumbs={BREADCRUMBS['cygnus-crop']}>
      <SimpleGrid data={data.data} link={'/cygnus/crop'} />
    </Section>
  );
}
