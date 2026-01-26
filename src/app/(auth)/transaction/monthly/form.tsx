'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { formOptions } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import React from 'react'
import { z } from 'zod'
import { MonthsArray } from '@/constant/date';
import { makeSearchParam } from '@/utilities/general';

const dj = new Date().getFullYear();
const yearChoices = [dj, dj - 1].reduce<{ label: string, value: number }[]>((acc, curr) => [...acc, { label: curr.toString(), value: curr }], []);

const schema = z.object({
  year: z.union([z.null(), z.number().gte(2020)]),
  month: z.union([z.null(), z.number().gte(1).lte(12)])
});

export type TransactionMonthlyFormSchema = z.infer<typeof schema>;

export default function TransactionMonthlyForm({ param }: { param: TransactionMonthlyFormSchema }) {
  const defaultValues = formOptions({
    defaultValues: {
      month: param.month ?? new Date().getMonth() + 1,
      year: param.year ?? dj
    } as TransactionMonthlyFormSchema,
    validators: {
      onChange: schema
    }
  });

  const router = useRouter();
  const form = useAppForm({
    ...defaultValues,
    onSubmit: async ({ value }) => {
      router.push(`/transaction/monthly?${makeSearchParam(value)}`);
    }
  });

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex max-md:flex-col grow gap-2">
        <form.AppField name='month' validators={{
          onChangeListenTo: ['year'],
          onChange: ({ value, fieldApi }) => {
            return (!fieldApi.form.getFieldValue('year') && !!value) ? { message: 'Both must be filled' } : undefined;
          }
        }}>
          {(field) => (<field.SimpleSelect label='Month' choices={MonthsArray} />)}
        </form.AppField>

        <form.AppField name='year' validators={{
          onChangeListenTo: ['month'],
          onChange: ({ value, fieldApi }) => {
            return (!fieldApi.form.getFieldValue('month') && !!value) ? { message: 'Both must be filled' } : undefined;
          }
        }}>
          {(field) => (<field.SimpleSelect label='Year' choices={yearChoices} />)}
        </form.AppField>
        <form.SimpleSubmitButton className='w-full' label='Search' />
      </form.SimpleContainer>
    </form.AppForm>
  )
}
