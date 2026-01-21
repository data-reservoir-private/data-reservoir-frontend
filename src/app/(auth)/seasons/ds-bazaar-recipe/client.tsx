'use client'

import { useAppForm } from '@/utilities/form';
import Box from '@mui/material/Box'
import { z } from 'zod'
import { ISeasonsResponse } from '@/model/response/seasons';
import { useState } from 'react';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional()
});

type DSBazaarRecipeFormSchema = z.infer<typeof schema>;
const defaultValue: DSBazaarRecipeFormSchema = { name: "" };

export default function DSBazaarRecipeClient({ data }: { data: ISeasonsResponse['ds-bazaar-recipe'][] }) {
  const [state, setState] = useState<DSBazaarRecipeFormSchema>(defaultValue);

  const form = useAppForm({
    defaultValues: defaultValue,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => setState(value)
  });

  const realData = data.filter(x => (
    ((state.name?.length ?? 0) === 0 || x.name.toLowerCase().includes(state.name?.toLowerCase() ?? ""))
  ));

  return (
    <form.AppForm>
      <form.SimpleContainer className="flex flex-col grow gap-2">
        <Box className="gap-2 flex grow">
          <form.AppField name='name' children={(field) => (
            <field.SimpleTextbox label='Name'/>
          )} />
          <form.AppForm>
            <form.SimpleSubmitButton label='Search'/>
          </form.AppForm>
        </Box>
      </form.SimpleContainer>
      <SimpleGrid data={realData} link='/seasons/ds-bazaar-recipe' unoptimizedImage pixelated/>
    </form.AppForm>
  )
}
