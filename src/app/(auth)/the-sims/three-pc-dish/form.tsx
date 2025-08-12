'use client'

import Box from '@mui/material/Box'
import React from 'react'
import { useAppForm } from '@/utilities/form';
import { formOptions } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod'
import { makeSearchParam } from '@/utilities/general';
import { CATEGORIES } from '@/constant/categories';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional(),
  category: z.array(z.string()).optional(),
  pageSize: z.number(),
  currentPage: z.number()
});

type SubmitMeta = { resetPagination?: boolean };
export type ThreePCDishFormSchema = z.infer<typeof schema>;

export default function ThreePCDishForm({ param, totalData = 0 }: { param: ThreePCDishFormSchema, totalData: number }) {
  const defaultValues = formOptions({
    defaultValues: {
      name: param.name ?? "",
      category: param.category ?? [],
      currentPage: param.currentPage ?? 1,
      pageSize: param.pageSize ?? 50
    } as ThreePCDishFormSchema,
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
      router.push(`/the-sims/three-pc-dish?${makeSearchParam(value)}`);
    }
  });

  return (
    <form
      onSubmit={e => { e.preventDefault(); e.stopPropagation(); form.handleSubmit({ resetPagination: true }) }}
      className="flex flex-col grow gap-2"
    >
      <Box className="gap-2 flex grow">
        <form.AppField name='name' children={(field) => (
          <field.SimpleTextbox label='Name'/>
        )} />
        <form.AppField name='category' children={(field) => (
          <field.SimpleMultiselectString label='Category' choices={CATEGORIES['the-sims-three-pc-dish-type']}/>
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
    </form>
  )
}