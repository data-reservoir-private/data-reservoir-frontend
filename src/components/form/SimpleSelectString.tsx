import { useCustomFieldContext } from '@/utilities/form'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import React from 'react'

interface SimpleSelectStringProps {
  label: string,
  choices: string[],
  selectAll?: boolean
}


export default function SimpleSelectString(props: SimpleSelectStringProps) {
  const field = useCustomFieldContext<string | null>();
  const picked = React.useMemo(() =>
    props.choices.find(x => x === field.state.value) ?? null,
    [field.state.value]
  )

  const handleOnChange = (_: React.SyntheticEvent, newValue: string | null) => {
    field.setValue(newValue ?? '');
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
