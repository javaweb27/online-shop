import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { z } from "zod"
import {
  AuthFormInputsErrorMsg,
  updateErrorMsgOfAuthForm,
} from "../components/AuthFormInputs"
import { AuthFormSchema } from "../zod-schema/AuthFormSchema"

type Form = z.infer<typeof AuthFormSchema>

export type AuthFormState = {
  form: Form
  isSubmitBtnClicked: boolean
}

type UpdateFieldsPayload = Partial<AuthFormState["form"]>

const initialState: AuthFormState = {
  form: { email: "", password: "" },
  isSubmitBtnClicked: false,
}

const authForm = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateFields(state, { payload }: PayloadAction<UpdateFieldsPayload>) {
      state.form = { ...state.form, ...payload }
      AuthFormInputsErrorMsg.clear()

      const schemaValidation = AuthFormSchema.safeParse(state.form)

      if (schemaValidation.success === false) {
        updateErrorMsgOfAuthForm(schemaValidation.error)
      }
    },
    setIsSubmitBtnClick(state) {
      state.isSubmitBtnClicked = true
    },
    reset() {
      return initialState
    },
  },
})

export const AuthFormActions = authForm.actions
export default authForm.reducer
