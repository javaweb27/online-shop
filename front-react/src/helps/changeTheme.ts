/**
 * Adds and removes classes to the html element
 * so css colors can apply dark, light, or detect the color
 * @param dark "true" activates the dark color, "false" activates the light color, and no param disables both dark and light colors
 */
export const changeTheme = (dark?: boolean) => {
  const { classList } = document.documentElement
  switch (dark) {
    case true:
      classList.add("dark")
      classList.remove("light")
      break
    case false:
      classList.add("light")
      classList.remove("dark")
      break

    default:
      classList.remove("dark", "light")
      break
  }
}
