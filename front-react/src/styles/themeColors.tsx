import { css } from "@emotion/react"

type CSSInterpolation = Parameters<typeof css>[0]

const Dark: CSSInterpolation = `
  --color-neutral-font: hsl(210, 0%, 99%);
  --color-neutral-font-alt: hsl(220, 4%, 61%);
  --color-neutral-bg: hwb(0 13% 88%);
  --color-neutral-bg-alt: rgb(40 40 40);
  --color-neutral-bg-alt-hover: rgb(64 64 64);
`

const Light: CSSInterpolation = `
  --color-neutral-font: hsl(221, 39%, 4%);
  --color-neutral-font-alt: rgb(75 85 99);
  --color-neutral-bg: hsl(210, 0%, 99%);
  --color-neutral-bg-alt: hsl(210, 0%, 94%);
  --color-neutral-bg-alt-hover: hsl(210, 0%, 90%);
`

export const themeColors = css(`
  :root {
    --color-primary: hsl(21, 90%, 50%);
    --color-primary-hover: hsl(17, 88%, 40%);
    
    @media (prefers-color-scheme: dark) {
      ${Dark}
    }
    @media (prefers-color-scheme: light) {
      ${Light}
    }
    
    &.dark {
      color-scheme: dark;
      ${Dark}
    }
    &.light {
      color-scheme: light;
      ${Light}
    }
  }
`)
