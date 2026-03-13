'use client';

import Paper from '@/components/common/paper/Paper';
import { MonthsArray } from '@/constant/date';
import { ALL_EXPORTS_TRANSACTION, getTypeIcon } from '@/utilities/export-icon';
import { useAppForm } from '@/utilities/form';
import { Box, Button, Typography } from '@mui/material';
import { z } from 'zod';
import { FaTruckPickup } from "react-icons/fa";
import Link from 'next/link';
import { Route } from 'next';

export const ExportHaydayOrderSchema = z.object({
  month: z.number().gte(1).lte(12).nullable(),
  year: z.number().gte(2020).nullable(),
  type: z.enum(ALL_EXPORTS_TRANSACTION),
  acceptedOnly: z.boolean(),
  includeDetail: z.boolean()
});

export default function HaydayOrderExport() {
  const date = new Date();
  const form = useAppForm({
    defaultValues: {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      type: 'json',
      acceptedOnly: false,
      includeDetail: false
    } as z.infer<typeof ExportHaydayOrderSchema>,
    validators: {
      onChange: ExportHaydayOrderSchema
    }
  });

  // yearChoices: [2024, 2025, ..., currentYear]. Start from 2024
  const yearChoices = Array.from({ length: date.getFullYear() - 2023 }, (_, i) => 2024 + i)
    .map(year => ({ label: year.toString(), value: year }));

  return (
    <Paper className='flex grow flex-col justify-between items-center p-2 border rounded w-full gap-3'>
      {/* Image on left, followed by dataset name, category, and author */}
      <Box className='flex gap-2 items-center w-full'>
        {/* Image */}
        <Box className='h-20 w-20 flex justify-center items-center relative'>
          <FaTruckPickup size={40} />
        </Box>

        {/* Dataset name author etc */}
        <Box className='flex flex-col gap-1'>
          <Typography variant='body1' className='font-bold text-lg'>Hayday Order</Typography>
          <Box className='flex flex-col gap-0.5'>
            <Typography variant='subtitle2' className='italic text-xs'>Hayday</Typography>
            <Typography variant='subtitle2' className='italic text-xs'>My own truck order</Typography>
          </Box>
        </Box>
      </Box>

      {/* Form */}
      <form.AppForm>
        <form.SimpleContainer className="flex flex-col max-md:flex-col grow gap-2 w-full">
          <Box className="flex flex-col gap-2 grow w-full">
            <Box className="flex max-md:flex-col gap-2 grow w-full">
              <form.AppField name="type">
                {
                  (field) => <field.SimpleSelect
                    choices={ALL_EXPORTS_TRANSACTION.map(x => ({ label: x.toUpperCase(), value: x }))}
                    label='Export Type'
                    renderOption={(option) =>
                      <Box className='flex gap-2 items-center'>
                        {getTypeIcon(option.value)}
                        {option.label}
                      </Box>
                    }
                  />
                }
              </form.AppField>

              <form.AppField name='month' validators={{
                onChangeListenTo: ['year'],
                onChange: ({ value, fieldApi }) => {
                  return (!fieldApi.form.getFieldValue('year') && !!value) ? { message: 'Year and month must be filled if month is selected' } : undefined;
                }
              }}>
                {(field) => (<field.SimpleSelect label='Month' choices={MonthsArray} />)}
              </form.AppField>

              <form.AppField name='year' validators={{
                onChangeListenTo: ['month'],
                onChange: ({ value, fieldApi }) => {
                  return (!fieldApi.form.getFieldValue('month') && !!value) ? { message: 'Year and month must be filled if year is selected' } : undefined;
                }
              }}>
                {(field) => (<field.SimpleSelect label='Year' choices={yearChoices} />)}
              </form.AppField>
            </Box>

            <Box className='flex justify-between px-2'>
              <form.AppField name='acceptedOnly'>
                {(field) => (
                  <field.SimpleSwitch label='Accepted Only' />
                )}
              </form.AppField>

              <form.AppField name='includeDetail'>
                {(field) => (
                  <field.SimpleSwitch label='Include Detail' />
                )}
              </form.AppField>
            </Box>
          </Box>
          <form.Subscribe selector={(x) => ({ values: x.values })}>
            {
              ({ values }) => {
                const param = new URLSearchParams({
                  month: values.month?.toString() ?? '',
                  year: values.year?.toString() ?? '',
                  type: values.type,
                  acceptedOnly: values.acceptedOnly.toString(),
                  includeDetail: values.includeDetail.toString()
                }).toString();
                return (
                  <Link passHref href={`/export/transaction/hayday-order?${param}` as Route} target='_blank' className="w-full">
                    <Button size='small' type='button' className="w-full" variant="contained" startIcon={getTypeIcon(values.type)}>Export as {values.type}</Button>
                  </Link>
                );
              }
            }
          </form.Subscribe>
        </form.SimpleContainer>
      </form.AppForm>
    </Paper>
  );
}
