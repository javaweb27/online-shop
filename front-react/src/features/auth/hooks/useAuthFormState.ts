import { useCallback, useMemo } from "react"
import { z } from "zod"
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks"
import { AuthFormActions } from "../redux-store-slices/authForm.slice"
import { AuthFormSchema } from "../zod-schema/AuthFormSchema"

const authFormAsZodEnum = AuthFormSchema.keyof()

const authFormFields = authFormAsZodEnum.options
export type AuthFormFields = z.infer<typeof authFormAsZodEnum>

// export type AuthFormState = z.infer<typeof AuthFormSchema>
export type AuthFormState = z.infer<typeof AuthFormSchema>

export const useAuthFormState = () => {
  const dispatch = useAppDispatch()
  const form = useAppSelector(s => s.authForm.form)

  const errorMessages = useMemo(() => new Map<AuthFormFields, string>(), [])
  // starting always from an empty map
  errorMessages.clear()

  const schemaValidation = AuthFormSchema.safeParse(form)

  const formatedErrorMessages = schemaValidation.success
    ? undefined
    : schemaValidation.error.format()

  for (const field of authFormFields) {
    const [firstError] = formatedErrorMessages?.[field]?._errors ?? [undefined]

    if (firstError) {
      errorMessages.set(field, firstError)
    }
  }

  const onChangeForm = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(AuthFormActions.updateFields({ [target.name]: target.value }))
  }, [])

  return {
    form,
    onChangeForm,
    errorMessages,
    // not used
    // isFormEmpty: authFormAsZodEnum.options.reduce((cv, field) => {
    //   return form[field] === "" && cv === true
    // }, true),
  }
}
