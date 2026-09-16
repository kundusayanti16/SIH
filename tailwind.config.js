/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F6F8F3',
        card: '#FFFFFF',
        primary: {
          light: '#86BCA0',
          DEFAULT: '#5F9F7A',
          dark: '#397257',
          50: '#F4F8F5',
          100: '#E7F2EB',
          200: '#CFE4D7',
          300: '#B0D3C0',
          400: '#86BCA0',
          500: '#5F9F7A',
          600: '#4D8A67',
          700: '#397257',
          800: '#2D5B45',
          900: '#234736',
          950: '#14291F',
        },
        sage: {
          light: '#86BCA0',
          DEFAULT: '#5F9F7A',
          dark: '#397257',
          50: '#F4F8F5',
          100: '#E7F2EB',
          200: '#CFE4D7',
          300: '#B0D3C0',
          400: '#86BCA0',
          500: '#5F9F7A',
          600: '#4D8A67',
          700: '#397257',
          800: '#2D5B45',
          900: '#234736',
        },
        secondary: {
          light: '#65C2BE',
          DEFAULT: '#3AA6A0',
          dark: '#24706C',
          50: '#F0FAF9',
          100: '#DDF4F3',
          200: '#BCE8E6',
          300: '#90D7D4',
          400: '#65C2BE',
          500: '#3AA6A0',
          600: '#2C8782',
          700: '#24706C',
          800: '#1F5B58',
          900: '#1A4C49',
        },
        teal: {
          DEFAULT: '#3AA6A0',
          dark: '#24706C',
        },
        accent: {
          light: '#F8DC8E',
          DEFAULT: '#F4C95D',
          dark: '#DDAA2E',
        },
        text: {
          main: '#24332C',
          muted: '#718078',
        },
        muted: '#718078',
        border: {
          light: '#E2E8DE',
          DEFAULT: '#D1DDD6',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
