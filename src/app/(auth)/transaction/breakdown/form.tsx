'use client';

import { useAppForm } from '@/utilities/form';
import { formOptions } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { MonthsArray } from '@/constant/date';
import { makeSearchParam } from '@/utilities/general';

const dj = new Date().getFullYear();
const startYear = 2024;
const yearChoices = Array
  .from({ length: dj - startYear + 1 }, (_, i) => dj - i)
  .reduce<{ label: string, value: number }[]>((acc, curr) => [...acc, { label: curr.toString(), value: curr }], []);

const schema = z.object({
  year: z.union([z.null(), z.number().gte(2020)]).optional(),
  month: z.union([z.null(), z.number().gte(1).lte(12)]).optional()
});

export type TransactionBreakdownFormSchema = z.infer<typeof schema>;

export default function TransactionBreakdownForm({ param }: { param: TransactionBreakdownFormSchema }) {
  const defaultValues = formOptions({
    defaultValues: {
      month: param.month,
      year: param.year
    } as TransactionBreakdownFormSchema,
    validators: {
      onChange: schema
    }
  });

  const router = useRouter();
  const form = useAppForm({
    ...defaultValues,
    onSubmit: async ({ value }) => {
      router.push(`/transaction/breakdown?${makeSearchParam(value)}`);
    }
  });

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex max-md:flex-col grow gap-2">
        <form.AppField name='year'>
          {(field) => (<field.SimpleSelect label='Year' choices={yearChoices} />)}
        </form.AppField>

        <form.AppField name='month'validators={{
          onChangeListenTo: ['year'],
          onChange: ({ value, fieldApi }) => {
            return (!fieldApi.form.getFieldValue('year') && !!value) ? { message: 'Year must be filled if month is selected' } : undefined;
          }
        }}>
          {(field) => (<field.SimpleSelect label='Month' choices={MonthsArray} />)}
        </form.AppField>
        <form.SimpleSubmitButton className='w-full' label='Search' />
      </form.SimpleContainer>
    </form.AppForm>
  );
}
