'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { z } from 'zod'
import { CATEGORIES } from '@/constant/categories';
import { INasiGorengResponse } from '@/model/response/nasi-goreng';
import { useState } from 'react';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional(),
  category: z.array(z.string()).optional()
});

type NasiGorengIngredientFormSchema = z.infer<typeof schema>;
const defaultValue: NasiGorengIngredientFormSchema = { name: "", category: [] };

export default function NasiGorengIngredientClient({ data }: { data: INasiGorengResponse['ingredient'][] }) {
  const [state, setState] = useState<NasiGorengIngredientFormSchema>(defaultValue);

  const form = useAppForm({
    defaultValues: defaultValue,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => setState(value)
  });

  const realData = data.filter(x => (
    ((state.name?.length ?? 0) === 0 || x.name.toLowerCase().includes(state.name?.toLowerCase() ?? "")) &&
    ((state.category ?? []).length === 0 || (state.category ?? []).includes(x.category))
  ));

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex max-md:flex-col grow gap-2">
        <form.AppField name='name' children={(field) => (
          <field.SimpleTextbox label='Name' />
        )} />
        <form.AppField name='category' children={(field) => (
          <field.SimpleMultiselectString label='Category' choices={CATEGORIES['nasi-goreng-ingredient']} />
        )} />
        <form.AppForm>
          <form.SimpleSubmitButton label='Search' />
        </form.AppForm>
      </form.SimpleContainer>
      <SimpleGrid data={realData} link='/nasi-goreng/ingredient' />
    </form.AppForm>
  )
}
