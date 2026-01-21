import SimpleContainer from '@/components/form/SimpleContainer';
import SimpleHorizontalSwitch from '@/components/form/SimpleHorizontalSwitch';
import SimpleMultiselectString from '@/components/form/SimpleMultiselectString';
import SimpleNumberbox from '@/components/form/SimpleNumberbox';
import SimplePageNavigation from '@/components/form/SimplePageNavigation';
import SimpleResetButton from '@/components/form/SimpleResetButton';
import SimpleSelect from '@/components/form/SimpleSelect';
import SimpleSelectString from '@/components/form/SimpleSelectString';
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
    SimpleSelect,
    SimpleSelectString,
    SimpleNumberbox,
    SimpleMultiselectString,
    SimpleHorizontalSwitch
  },
  formComponents: {
    SimpleSubmitButton,
    SimpleResetButton,
    SimplePageNavigation,
    SimpleContainer
  },
});
