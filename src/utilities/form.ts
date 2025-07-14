import SimpleMultiselectString from '@/components/form/SimpleMultiselect';
import SimpleNumberbox from '@/components/form/SimpleNumberbox';
import SimplePageNavigation from '@/components/form/SimplePageNavigation';
import SimpleSubmitButton from '@/components/form/SimpleSubmitButton';
import SimpleTextbox from '@/components/form/SimpleTextbox';
import { createFormHookContexts, createFormHook } from '@tanstack/react-form'

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()

// Placeholder untuk forms
export const useCustomFieldContext = useFieldContext;
export const useCustomFormContext = useFormContext;

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  // We'll learn more about these options later
  fieldComponents: {
    SimpleTextbox,
    SimpleNumberbox,
    SimpleMultiselectString
  },
  formComponents: {
    SimpleSubmitButton,
    SimplePageNavigation
  },
});
