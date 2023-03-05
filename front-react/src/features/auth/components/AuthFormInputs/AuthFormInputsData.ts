import { AuthFormFields } from "../../hooks/useAuthFormState"

export type InputHtmlProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputCustomProps = InputHtmlProps & {
  name: AuthFormFields
}
/** Array<[InputCustomProps, labelText]> */
export const AuthFormInputsData: [InputCustomProps, string][] = [
  [
    {
      name: "email",
      type: "email",
    },
    "Email",
  ],
  [
    {
      name: "password",
      type: "password",
    },
    "Password",
  ],
]
