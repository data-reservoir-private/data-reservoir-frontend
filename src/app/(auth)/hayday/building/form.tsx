'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { formOptions } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import React from 'react'
import { z } from 'zod'
import queryString from 'query-string';

const categories = [
  "Production",
  "Decorations",
  "Service",
  "Storage",
  "Other"
];

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional(),
  level: z.number().gte(0).optional(),
  pageSize: z.number(),
  currentPage: z.number()
});

type SubmitMeta = { resetPagination?: boolean };
export type HaydayBuildingFormSchema = z.infer<typeof schema>;

export default function HaydayBuildingForm({ param, totalData = 0 }: { param: HaydayBuildingFormSchema, totalData: number }) {
  const defaultValues = formOptions({
    defaultValues: {
      name: param.name ?? "",
      level: param.level ?? 0,
      currentPage: param.currentPage ?? 1,
      pageSize: param.pageSize ?? 50
    } as HaydayBuildingFormSchema,
    validators: {
      onChange: schema
    },
    onSubmitMeta: {} as { resetPagination?: boolean }
  });

  const router = useRouter();
  const form = useAppForm({
    ...defaultValues,
    onSubmit: async ({ value, meta }) => {
      if (meta?.resetPagination) value.currentPage = 1;
      router.push(`/hayday/building?${queryString.stringify(value, {
        skipEmptyString: true,
        skipNull: true,
        arrayFormat: 'bracket'
      })}`);
    }
  });

  return (
    <Box
      component='form'
      onSubmit={e => { e.preventDefault(); e.stopPropagation(); form.handleSubmit() }}
      className="flex flex-col grow gap-2"
    >
      <Box className="gap-2 flex grow">
        <form.AppField name='level' children={(field) => (
          <field.SimpleNumberbox label='Level'/>
        )} />
        <form.AppField name='name' children={(field) => (
          <field.SimpleTextbox label='Name'/>
        )} />
        <form.AppForm>
          <form.SimpleSubmitButton label='Search' meta={{ resetPagination: true } as SubmitMeta}/>
        </form.AppForm>
      </Box>
      <form.AppForm>
        <form.SimplePageNavigation
          currentPage={form.state.values.currentPage}
          pageSize={form.state.values.pageSize}
          totalData={totalData}
          handleOnChangePage={(num) => { form.setFieldValue('currentPage', num); form.handleSubmit()}}
          handleOnChangeRowsPerPage={(num) => {
            form.setFieldValue('pageSize', num);
            form.setFieldValue('currentPage', 1);
            form.handleSubmit();
          }}
        />
      </form.AppForm>
    </Box>
  )
}
