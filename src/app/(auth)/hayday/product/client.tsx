'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { z } from 'zod'
import { CATEGORIES } from '@/constant/categories';
import Section from '@/components/common/paper/Section';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';
import { BREADCRUMBS } from '@/constant/breadcrumb';
import { IHaydayResponse } from '@/model/response/hayday';
import { useState } from 'react';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional(),
  level: z.number().gte(0).optional(),
  category: z.array(z.string()).optional()
});

type HaydayProductFormSchema = z.infer<typeof schema>;
const defaultValue: HaydayProductFormSchema = { name: '', level: 0, category: [] };

export default function HaydayProductClient({ data }: { data: IHaydayResponse['hayday-product'][] }) {
  const [state, setState] = useState<HaydayProductFormSchema>(defaultValue);

  const form = useAppForm({
    defaultValues: defaultValue,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => setState(value)
  });

  const realData = data.filter(x => (
    ((state.name?.length ?? 0) === 0 || x.name.toLowerCase().includes(state.name?.toLowerCase() ?? "")) &&
    ((state.level ?? 0) === 0 || x.level <= (state.level ?? 0)) &&
    ((state.category ?? []).length === 0 || (state.category ?? []).includes(x.category))
  ));

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
            <form.SimpleSubmitButton label='Search'/>
          </Box>
        </form.SimpleContainer>
      </form.AppForm>
      <SimpleGrid data={realData} link='/hayday/product' />
    </Section>
  )
}
