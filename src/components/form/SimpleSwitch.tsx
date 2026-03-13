import { useCustomFieldContext } from '@/utilities/form';
import { FormControlLabel, Switch } from '@mui/material';

export default function SimpleSwitch({ label } : { label: string }) {
  const field = useCustomFieldContext<boolean>();
  return (
    <FormControlLabel control={<Switch checked={field.state.value} onChange={(_, c) => field.handleChange(c)} />} label={label} />
  );
}
