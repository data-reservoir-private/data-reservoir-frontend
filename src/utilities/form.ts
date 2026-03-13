import { createFormHookContexts, createFormHook } from '@tanstack/react-form';

import SimpleContainer from '@/components/form/SimpleContainer';
import SimpleCheckbox from '@/components/form/SimpleCheckbox';
import SimpleMultiselectString from '@/components/form/SimpleMultiselectString';
import SimpleNumberbox from '@/components/form/SimpleNumberbox';
import SimplePageNavigation from '@/components/form/SimplePageNavigation';
import SimpleResetButton from '@/components/form/SimpleResetButton';
import SimpleSelect from '@/components/form/SimpleSelect';
import SimpleSelectString from '@/components/form/SimpleSelectString';
import SimpleSubmitButton from '@/components/form/SimpleSubmitButton';
import SimpleTextbox from '@/components/form/SimpleTextbox';
import SimpleSwitch from '@/components/form/SimpleSwitch';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

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
    SimpleSwitch,
    SimpleCheckbox
  },
  formComponents: {
    SimpleSubmitButton,
    SimpleResetButton,
    SimplePageNavigation,
    SimpleContainer
  },
});
