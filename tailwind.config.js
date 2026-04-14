/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#006a64",
        "primary-container": "#00a79d",
        "on-primary": "#ffffff",
        "secondary": "#00658d",
        "secondary-container": "#8ad2fe",
        "on-secondary-container": "#005a7e",
        "surface": "#f8fafb",
        "surface-container": "#eceeef",
        "surface-container-low": "#f2f4f5",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e6e8e9",
        "surface-container-highest": "#e1e3e4",
        "on-surface": "#191c1d",
        "on-surface-variant": "#3c4947",
        "outline": "#6c7a78",
        "outline-variant": "#bbc9c7",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "tertiary": "#585f66",
        "tertiary-container": "#8f969d",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "md": "0.375rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      fontFamily: {
        "headline": ["Manrope"],
        "body": ["Inter"],
        "label": ["Inter"]
      },
      animation: {
        loading: "loading 2s ease-in-out infinite"
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(300%)" }
        }
      }
    },
  },
  plugins: [],
}
