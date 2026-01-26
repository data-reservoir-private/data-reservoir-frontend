'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { formOptions } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import React from 'react'
import { z } from 'zod'
import { MonthsArray } from '@/constant/date';
import { makeSearchParam } from '@/utilities/general';
import Button from '@mui/material/Button';

const dj = new Date().getFullYear();
const yearChoices = [dj, dj - 1].reduce<{ label: string, value: number }[]>((acc, curr) => [...acc, { label: curr.toString(), value: curr }], []);

const schema = z.object({
  year: z.union([z.null(), z.number().gte(2020)]).optional(),
  month: z.union([z.null(), z.number().gte(1).lte(12)]).optional(),
  isProcessed: z.literal([1, 0])
});

export type HaydayOrderFormSchema = z.infer<typeof schema>;

export default function HaydayOrderForm({ param }: { param: HaydayOrderFormSchema }) {
  const defaultValues = formOptions({
    defaultValues: {
      month: param.month,
      year: param.year,
      isProcessed: param.isProcessed ?? 0
    } as HaydayOrderFormSchema,
    validators: {
      onChange: schema
    }
  });

  const router = useRouter();
  const form = useAppForm({
    ...defaultValues,
    onSubmit: async ({ value }) => {
      router.push(`/hayday/order?${makeSearchParam(value)}`);
    }
  });

  const handleResetValue = () => {
    form.setFieldValue('month', null);
    form.setFieldValue('year', null);
    form.setFieldValue('isProcessed', 0);
  }

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex max-md:flex-col grow gap-2">
        <Box className="flex max-md:flex-col gap-2 grow">
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

          <form.AppField name='isProcessed'>
            {
              (field) => <field.SimpleHorizontalSwitch label='Processed Product Only' />
            }
          </form.AppField>
        </Box>
        <Box className='flex max-md:flex-col gap-2'>
          <form.AppForm>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="button"
                  variant="contained"
                  color='error'
                  className='w-full'
                  disabled={isSubmitting}
                  onClick={e => { e.preventDefault(); handleResetValue() }}
                >
                  Reset
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
          <form.AppForm>
            <form.SimpleSubmitButton className='w-full' label='Search' />
          </form.AppForm>
        </Box>
      </form.SimpleContainer>
    </form.AppForm>
  )
}
