import { useCallback, useId, useState } from "react"
import { BiHide, BiShow } from "react-icons/bi"
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { AuthFormActions } from "../../redux-store-slices/authForm.slice"
import { AuthFormInputsData, InputHtmlProps } from "./AuthFormInputsData"
import { AuthFormInputsErrorMsg as errorMessages } from "./AuthFormInputsErrorMsg"

export const AuthFormInputs = () => {
  const dispatch = useAppDispatch()
  const { form, isSubmitBtnClicked } = useAppSelector(s => s.authForm)
  const reactId = useId()

  const onChangeForm = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(AuthFormActions.updateFields({ [target.name]: target.value }))
  }, [])

  return (
    <div data-testid="AuthFormInputs">
      {AuthFormInputsData.map(([inputProps, labelText]) => {
        const htmlFor = reactId + inputProps.name
        inputProps.id = htmlFor
        inputProps.className = "bg-neutral-bg-alt-hover p-1 shadow-md"

        const canShowErrorMsg = isSubmitBtnClicked || form[inputProps.name] !== ""

        const isInputInvalid = canShowErrorMsg && errorMessages.has(inputProps.name)
        return (
          <div key={htmlFor} className="flex flex-col gap-1 mb-3">
            <label htmlFor={htmlFor}>{labelText}</label>

            {inputProps.name === "password" ? (
              <InputPassword
                {...inputProps}
                value={form[inputProps.name]}
                onChange={onChangeForm}
              />
            ) : (
              <input
                {...inputProps}
                value={form[inputProps.name]}
                onChange={onChangeForm}
              />
            )}

            <p className={`text-red-500 text-sm ${isInputInvalid ? "" : "invisible"}`}>
              {isInputInvalid ? errorMessages.get(inputProps.name) : "Ok"}
            </p>
          </div>
        )
      })}
    </div>
  )
}

// component
function InputPassword(props: InputHtmlProps) {
  const [isHidden, setIsHidden] = useState(true)

  const className = `${props.className} pr-9 block´
`
  return (
    <div className="relative grid items-center">
      <input {...props} className={className} type={isHidden ? "password" : "text"} />
      <div className="absolute top-0 bottom-0 right-0 flex items-center">
        <button
          data-testid="hide-btn"
          type="button"
          onClick={() => setIsHidden(cv => !cv)}
        >
          {isHidden ? (
            <BiShow data-testid="show" className="text-3xl my-auto" />
          ) : (
            <BiHide data-testid="hide" className="text-3xl my-auto" />
          )}
        </button>
      </div>
    </div>
  )
}
