import { z, ZodError } from "zod"
import { AuthFormSchema } from "../../zod-schema/AuthFormSchema"

type AuthFormSchema = z.infer<typeof AuthFormSchema>

type FormFields = keyof AuthFormSchema

export const AuthFormInputsErrorMsg = new Map<FormFields, string>()

export function updateErrorMsgOfAuthForm(validationError: ZodError<AuthFormSchema>) {
  const formatedErrors = validationError.format()
  const authFormFields = AuthFormSchema.keyof().options

  for (const field of authFormFields) {
    const [firstError] = formatedErrors?.[field]?._errors ?? [undefined]

    if (firstError) {
      AuthFormInputsErrorMsg.set(field, firstError)
    }
  }
}
