// const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        "neutral-font": "var(--color-neutral-font)",
        "neutral-font-alt": "var(--color-neutral-font-alt)",
        "primary": "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
      },
      backgroundColor: {
        "primary": "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "neutral-bg": "var(--color-neutral-bg)",
        "neutral-bg-alt": "var(--color-neutral-bg-alt)",
        "neutral-bg-alt-hover": "var(--color-neutral-bg-alt-hover)",
      },
      animation: {
        banner: "banner 3.6s ease-in-out infinite alternate",
      },
      keyframes: {
        banner: {
          "0%": { transform: "translateX(0%)" },

          "40%": { transform: "translateX(0%)" },
          "60%": { transform: "translateX(-100%)" },

          "100%": { transform: "translateX(-100%)" },
        },
      },
      screens: {
        "2xl-max": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        "xl-max": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "lg-max": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        "md-max": { max: "767px" },
        // => @media (max-width: 767px) { ... }

        "sm-max": { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
}
