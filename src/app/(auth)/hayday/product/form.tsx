'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { formOptions } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import React from 'react'
import { z } from 'zod'
import { makeSearchParam } from '@/utilities/general';
import { CATEGORIES } from '@/constant/categories';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional(),
  level: z.number().gte(0).optional(),
  category: z.array(z.string()).optional(),
  pageSize: z.number(),
  currentPage: z.number()
});

type SubmitMeta = { resetPagination?: boolean };
export type HaydayProductFormSchema = z.infer<typeof schema>;

export default function HaydayProductForm({ param, totalData = 0 }: { param: HaydayProductFormSchema, totalData: number }) {
  const defaultValues = formOptions({
    defaultValues: {
      name: param.name ?? "",
      level: param.level ?? 0,
      category: (param.category && !Array.isArray(param.category)) ? [param.category] : (param.category ?? []),
      currentPage: param.currentPage ?? 1,
      pageSize: param.pageSize ?? 50
    } as HaydayProductFormSchema,
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
      router.push(`/hayday/product?${makeSearchParam(value)}`);
    }
  });

  return (
    <Box
      component='form'
      onSubmit={e => { e.preventDefault(); e.stopPropagation(); form.handleSubmit({ resetPagination: true }) }}
      className="flex flex-col grow gap-2"
    >
      <Box className="gap-2 flex grow">
        <form.AppField name='level' children={(field) => (
          <field.SimpleNumberbox label='Level'/>
        )} />
        <form.AppField name='name' children={(field) => (
          <field.SimpleTextbox label='Name'/>
        )} />
        <form.AppField name='category' children={(field) => (
          <field.SimpleMultiselectString label='Category' choices={CATEGORIES['hayday-product']}/>
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
