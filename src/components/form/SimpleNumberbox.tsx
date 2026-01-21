import { useCustomFieldContext } from '@/utilities/form';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import React from 'react'

export default function SimpleTextbox({ label } : { label: string }) {
  const field = useCustomFieldContext<number | null>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = parseInt(e.currentTarget.value);
    if (!isNaN(v)) field.handleChange(v)
    else field.handleChange(null);
  }

  return (
    <FormControl className='flex flex-col min-w-6'>
      <TextField size='small' type='number' label={label} name={field.name} value={field.state.value} onChange={handleOnChange} />
      {!field.state.meta.isValid && <span className='text-xs text-error-light'>{field.state.meta.errors.map(x => x?.message).join(', ')}</span>}
    </FormControl>
  )
}
