import Section from '@/components/common/paper/Section'
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid'
import { API_ROUTE } from '@/constant/api-route';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { CATEGORIES } from '@/constant/categories';
import { IHaydayResponse } from '@/model/response/hayday';
import { useAppForm } from '@/utilities/form';
import { grabData } from '@/utilities/http';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn, useServerFn } from '@tanstack/react-start';
import z from 'zod';

const formSchema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional(),
  level: z.number().gte(0).optional(),
  category: z.array(z.string()).optional(),
  pageSize: z.number(),
  currentPage: z.number()
});

const searchSchema = formSchema.extend({
  pageSize: z.number().optional(),
  currentPage: z.number().optional()
})

type SubmitMeta = { resetPagination?: boolean };
export type HaydayProductFormSchema = z.infer<typeof formSchema>;
const apiCall = createServerFn({ method: 'GET' })
  .inputValidator(searchSchema)
  .handler(async ({ data }) => {
    return await grabData<IHaydayResponse['hayday-product'][]>(API_ROUTE.HAY_DAY.PRODUCT, {
      name: data.name ?? "",
      category: data.category ?? [],
      currentPage: Math.max(1, data.currentPage ?? 1),
      pageSize: data.pageSize ?? 50,
      level: data.level
    })
  })

export const Route = createFileRoute('/(header)/_header/hayday/product')({
  validateSearch: (d) => searchSchema.parse(d),
  component: RouteComponent,
})

function RouteComponent() {
  const search = Route.useSearch();

  const call = useServerFn(apiCall);
  const { data: rawData, isLoading } = useQuery({
    queryKey: ['test', search],
    queryFn: () => call({ data: search })
  });

  const navigate = useNavigate();
  const form = useAppForm({
    defaultValues: {
      name: search.name ?? "",
      level: search.level ?? 0,
      category: (search.category && !Array.isArray(search.category)) ? [search.category] : (search.category ?? []),
      currentPage: search.currentPage ?? 1,
      pageSize: search.pageSize ?? 50
    } as HaydayProductFormSchema,
    validators: {
      onChange: formSchema
    },
    onSubmitMeta: {} as { resetPagination?: boolean },
    onSubmit: async ({ value, meta }) => {
      if (meta?.resetPagination) value.currentPage = 1;
      navigate({ to: '/hayday/product', search: value })
    }
  });

  return (
    <Section name='Hayday Products' variant='h4' breadcrumbs={BREADCRUMBS['hayday-product']}>
      <form.AppForm>
        <form.SimpleContainer className="flex flex-col grow gap-2">
          <Box className="gap-2 flex grow">
            <form.AppField name='level' children={(field) => (
              <field.SimpleNumberbox label='Level' />
            )} />
            <form.AppField name='name' children={(field) => (
              <field.SimpleTextbox label='Name' />
            )} />
            <form.AppField name='category' children={(field) => (
              <field.SimpleMultiselectString label='Category' choices={CATEGORIES['hayday-product']} />
            )} />
            <form.AppForm>
              <form.SimpleSubmitButton label='Search' meta={{ resetPagination: true } as SubmitMeta} />
            </form.AppForm>
          </Box>
          <form.SimplePageNavigation
            currentPage={form.state.values.currentPage}
            pageSize={form.state.values.pageSize}
            totalData={rawData?.pagination?.totalData ?? 0}
            handleOnChangePage={(num) => { form.setFieldValue('currentPage', num); form.handleSubmit() }}
            handleOnChangeRowsPerPage={(num) => {
              form.setFieldValue('pageSize', num);
              form.setFieldValue('currentPage', 1);
              form.handleSubmit();
            }}
          />
        </form.SimpleContainer>
      </form.AppForm>
      <SimpleGrid data={rawData?.data ?? []} isLoading={isLoading} link={'/hayday/product'} />
    </Section>
  )
}