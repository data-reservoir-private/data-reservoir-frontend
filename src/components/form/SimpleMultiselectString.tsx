import { useCustomFieldContext } from '@/utilities/form';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

interface SimpleMultiselectStringProps {
  label: string,
  choices: string[],
  selectAll?: boolean
}

export default function SimpleMultiselectString(props: SimpleMultiselectStringProps) {
  const field = useCustomFieldContext<string[]>();

  return (
    <FormControl className='flex flex-col w-full'>
      <Autocomplete
        multiple
        renderInput={(params) => (<TextField {...params} placeholder={props.label} />)}
        size='small'
        onChange={(_, v) => field.handleChange(v)}
        value={field.state.value}
        options={props.choices}
        renderValue={(values, getItemProps) => (
          values.map((value, idx) => {
            const { key, ...itemProps } = getItemProps({ index: idx });
            return <Chip
              {...itemProps}
              size='small'
              key={idx}
              label={value}
              slotProps={{
                label: {
                  className: 'text-[9px]'
                }
              }} sx={{ borderRadius: 1, zIndex: 999 }} />
          })
        )}
      />
    </FormControl>
  );
}
