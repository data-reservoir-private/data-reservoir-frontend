import { useCustomFormContext } from '@/utilities/form';
import Button from '@mui/material/Button';
import classNames from 'classnames';

export default function SimpleSubmitButton({ label = "Submit", className = "" }: { label: string, className?: string, meta?: object }) {
  const form = useCustomFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit"
          variant="contained"
          className={classNames(className)}
          disabled={isSubmitting}
        >
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}
