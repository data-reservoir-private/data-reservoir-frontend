import { useCustomFieldContext } from '@/utilities/form';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import React from 'react'

export default function SimpleHorizontalSwitch({ label } : { label: string }) {
  const field = useCustomFieldContext<number>();
  return (
    <>
      <FormControlLabel className='w-full' control={<Checkbox  checked={field.state.value === 1} onChange={(e) => field.setValue(e.currentTarget.checked ? 1 : 0)} />} label={label}/>
      {!field.state.meta.isValid && <span className='text-xs text-error-light'>{field.state.meta.errors.map(x => x?.message).join(', ')}</span>}
    </>
  )
}
