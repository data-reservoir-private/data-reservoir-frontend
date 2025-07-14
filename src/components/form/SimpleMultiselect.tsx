import { useCustomFieldContext } from '@/utilities/form';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react'

interface SimpleMultiselectStringProps {
  label: string,
  choices: string[],
  selectAll?: boolean
}

export default function SimpleMultiselectString(props: SimpleMultiselectStringProps) {
  const field = useCustomFieldContext<string[]>();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { target: { value } } = event;
    const real = value === 'string' ? value.split(',') : (value as string[])
    field.setValue(real);
  };

  return (
    <FormControl className='flex flex-col w-full'>
      <InputLabel id="simple-multiselect" size='small'>{props.label}</InputLabel>
      <Select
        labelId="simple-multiselect"
        id="demo-multiple-chip"
        multiple
        size='small'
        value={field.state.value}
        onChange={handleChange}
        input={<OutlinedInput size='small' id="select-multiple-chip" label="Chip" />}
        renderValue={() => (
          <Box className="flex flex-wrap gap-0.5">
            {field.state.value.map((value) => (
              <Chip size='small' key={value} label={value} slotProps={{
                label: {
                  className: 'text-[9px]'
                }
              }} />
            ))}
          </Box>
        )}
      >
        {props.choices.map((name) => (
          <MenuItem
            key={name}
            value={name}
            className='text-sm'
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
