import { useCustomFieldContext } from '@/utilities/form'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react'

interface SimpleSelectProps<TValue> {
  label: string,
  choices: { label: string, value: TValue }[],
  selectAll?: boolean
}


export default function SimpleSelect<TValue>(props: SimpleSelectProps<TValue>) {
  const field = useCustomFieldContext<TValue | null>();
  const picked = React.useMemo(() =>
    props.choices.find(x => x.value === field.state.value) ?? null,
    [field.state.value]
  )

  const handleOnChange = (_: React.SyntheticEvent, newValue: SimpleSelectProps<TValue>['choices'][0] | null) => {
    if (!newValue) field.setValue(null);
    else field.setValue(newValue.value);
  }

  return (
    <Autocomplete
      size='small'
      className='w-full'
      disablePortal
      value={picked}
      onChange={handleOnChange}
      options={props.choices}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={props.label} />}
    />
  )
}
