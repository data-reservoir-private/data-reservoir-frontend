import { useCustomFieldContext } from '@/utilities/form';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import React from 'react'

export default function SimpleTextbox({ label } : { label: string }) {
  const field = useCustomFieldContext<string>();

  return (
    <FormControl className='flex flex-col w-full'>
      <TextField size='small' label={label} name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.currentTarget.value)} />
      {!field.state.meta.isValid && <span className='text-xs text-error-light'>{field.state.meta.errors.map(x => x?.message).join(', ')}</span>}
    </FormControl>
  )
}
