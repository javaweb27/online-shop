import { z } from "zod"
import { randomNumber } from "../../../helps/randomNumber"
import { AuthFormSchema } from "../zod-schema/AuthFormSchema"

type AuthFormSchema = z.infer<typeof AuthFormSchema>

export const authFormReduxSliceMock = {
  onEmptyForm: generateState("", ""),
  onValidList: [
    generateState("user@email.com", generatePassword(7)),
    generateState("otheruser@email.123", generatePassword(50)),
  ],
  onWrongList: [
    generateState("1", generatePassword(1)),
    generateState("1@email", generatePassword(6)),
    generateState("1@email.", generatePassword(55)),
    generateState("@email.com", generatePassword(55)),
    generateState("email.com", generatePassword(55)),
  ],
}

function generateState(email: string, password: string) {
  return {
    email,
    password,
  } satisfies AuthFormSchema
}

function generatePassword(count: number) {
  const letters = "abcdefghijklmnopqrstvuxyz0123456789"
  const lettersLastIndex = letters.length - 1
  let password = ""

  for (let index = 0; index < count; index++) {
    const randomIndex = randomNumber(0, lettersLastIndex)
    password += letters[randomIndex]
  }

  return password
}
