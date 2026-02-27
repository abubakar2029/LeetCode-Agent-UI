/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          foreground: "rgb(var(--color-primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          foreground: "rgb(var(--color-secondary-foreground) / <alpha-value>)",
        },
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        muted: {
          foreground: "rgb(var(--color-muted-foreground) / <alpha-value>)",
        },
        accent: "rgb(6 182 212 / <alpha-value>)",
        success: "rgb(16 185 129 / <alpha-value>)",
        warning: "rgb(245 158 11 / <alpha-value>)",
        destructive: "rgb(239 68 68 / <alpha-value>)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [],
}
