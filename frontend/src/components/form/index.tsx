import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CheckboxField } from "./checkbox-field";
import { SubmitButton } from "./submit-button";
import { TextField } from "./text-field";

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    CheckboxField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
