'use client';

import { useAppForm } from '@/utilities/form';
import { z } from 'zod';
import { ISeasonsResponse } from '@/model/response/seasons';
import { useState } from 'react';
import SimpleGrid from '@/components/common/simple-grid/SimpleGrid';

const schema = z.object({
  name: z.union([z.string().length(0), z.string().min(3)], "Must be empty or min 3 chars").optional()
});

type DSTwoTownsFishingCatchFormSchema = z.infer<typeof schema>;
const defaultValue: DSTwoTownsFishingCatchFormSchema = { name: "" };

export default function DSTwoTownsFishingCatchClient({ data }: { data: ISeasonsResponse['ds-two-towns-fishing-catch'][] }) {
  const [state, setState] = useState<DSTwoTownsFishingCatchFormSchema>(defaultValue);

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
      <form.SimpleContainer className="flex max-md:flex-col grow gap-2">
        <form.AppField name='name'>
          {(field) => <field.SimpleTextbox label='Name' />}
        </form.AppField>
        <form.AppForm>
          <form.SimpleSubmitButton label='Search' />
        </form.AppForm>
      </form.SimpleContainer>
      <SimpleGrid data={realData} link='/seasons/ds-two-towns-fishing-catch' unoptimizedImage pixelated />
    </form.AppForm>
  );
}
