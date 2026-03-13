'use client';

import Paper from '@/components/common/paper/Paper';
import { MonthsArray } from '@/constant/date';
import { ALL_EXPORTS_TRANSACTION, getTypeIcon } from '@/utilities/export-icon';
import { useAppForm } from '@/utilities/form';
import { Box, Button, Typography } from '@mui/material';
import { z } from 'zod';
import { FaMoneyCheck } from "react-icons/fa";
import Link from 'next/link';
import { Route } from 'next';
import { ExportTransactionExpenseClientSchema, FLATTENED_TYPE } from '@/shared/export-transaction-expense';

export default function TransactionExpenseExport() {
  const date = new Date();
  const form = useAppForm({
    defaultValues: {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      type: 'json'
    } as z.infer<typeof ExportTransactionExpenseClientSchema>,
    validators: {
      onChange: ExportTransactionExpenseClientSchema
    }
  });

  // yearChoices: [2022, 2025, ..., currentYear]. Start from 2022
  const yearChoices = Array.from({ length: date.getFullYear() - 2021 }, (_, i) => 2022 + i)
    .map(year => ({ label: year.toString(), value: year }));

  return (
    <Paper className='flex grow flex-col justify-between items-center p-2 border rounded w-full gap-3'>
      {/* Image on left, followed by dataset name, category, and author */}
      <Box className='flex gap-2 items-center w-full'>
        {/* Image */}
        <Box className='h-20 w-20 flex justify-center items-center relative'>
          <FaMoneyCheck size={40} />
        </Box>

        {/* Dataset name author etc */}
        <Box className='flex flex-col gap-1'>
          <Typography variant='body1' className='font-bold text-lg'>Transaction Expense</Typography>
          <Box className='flex flex-col gap-0.5'>
            <Typography variant='subtitle2' className='italic text-xs'>Transaction</Typography>
            <Typography variant='subtitle2' className='italic text-xs'>My own expense</Typography>
          </Box>
        </Box>
      </Box>

      {/* Form */}
      <form.AppForm>
        <form.SimpleContainer className="flex flex-col max-md:flex-col grow gap-2 w-full">
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
          <form.Subscribe selector={(x) => ({ values: x.values })}>
            {
              ({ values }) => {
                const param = new URLSearchParams({
                  month: values.month?.toString() ?? '',
                  year: values.year?.toString() ?? '',
                  type: values.type
                }).toString();
                return (

                  <Link passHref href={`/export/transaction/transaction-expense?${param}` as Route} target='_blank' className="w-full">
                    <Button size='small' type='button' className="w-full" variant="contained" startIcon={getTypeIcon(values.type)}>Export as {values.type}{FLATTENED_TYPE.includes(values.type) && " (Flattened)"}</Button>
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
