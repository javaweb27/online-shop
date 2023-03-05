export const AuthFormSubmitBtn = ({
  submitBtnText,
  disabled,
}: {
  submitBtnText: string
  disabled: boolean
}) => {
  return (
    <button disabled={disabled} className="btn btn-primary" type="submit">
      {submitBtnText}
    </button>
  )
}
