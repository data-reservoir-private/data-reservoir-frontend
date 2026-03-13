'use client';

import Paper from '@/components/common/paper/Paper';
import { MonthsArray } from '@/constant/date';
import { ALL_EXPORTS_COMPLETE, getTypeIcon } from '@/utilities/export-icon';
import { useAppForm } from '@/utilities/form';
import { Box, Button, Typography } from '@mui/material';
import { z } from 'zod';

const schema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2000),
  type: z.enum(ALL_EXPORTS_COMPLETE),
  acceptedOnly: z.boolean(),
  includeDetail: z.boolean()
});

export default function HaydayOrderExport() {

  const form = useAppForm({
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      type: 'json',
      acceptedOnly: false,
      includeDetail: false
    } as z.infer<typeof schema>,
    validators: {
      onChange: schema
    }
  });

  // yearChoices: [2024, 2025, ..., currentYear]. Start from 2024
  const yearChoices = Array.from({ length: new Date().getFullYear() - 2023 }, (_, i) => 2024 + i)
    .map(year => ({ label: year.toString(), value: year }));

  return (
    <Paper className='flex grow flex-col justify-between items-center p-2 border rounded w-full gap-3'>
      {/* Image on left, followed by dataset name, category, and author */}
      <Box className='flex gap-2 items-center w-full'>
        {/* Image */}
        <Box className='h-20 w-20 flex justify-center items-center relative'>
          {/* Icon later */}
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
        <form.SimpleContainer>
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

          <Box className='flex justify-between'>
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

          <form.Subscribe selector={(x) => x.values}>
            {
              ({ type }) => (
                <Button
                  size='small'
                  type='submit'
                  className="w-full"
                  variant="contained"
                  startIcon={getTypeIcon(type)}
                  onClick={() => form.handleSubmit()}
                >Export as {type}</Button>
              )
            }
          </form.Subscribe>
        </form.SimpleContainer>
      </form.AppForm>
    </Paper>
  );
}
