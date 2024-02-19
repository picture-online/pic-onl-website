import { addDynamicIconSelectors } from '@iconify/tailwind'
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    `components/**/*.{vue,js,ts}`,
    `.neoX/components/**/*.{vue,js,ts}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `i18n/**/*.json`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `utils/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`,
    `Error.{js,ts,vue}`,
    `error.{js,ts,vue}`,
    `app.config.{js,ts}`
  ],
  theme: {
    extend: {
      backgroundSize: {
        'size-200': '200% 200%'
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-50': '50% 50%',
        'pos-100': '100% 100%'
      },

      colors: {
        primary: {
          DEFAULT: '#E9436F',
          50: '#FCE7ED',
          100: '#FAD5DF',
          200: '#F6B1C3',
          300: '#F28CA7',
          400: '#ED688B',
          500: '#E9436F',
          600: '#DA1A4D',
          700: '#A8143B',
          800: '#760E29',
          900: '#440818',
          950: '#2B050F'
        },

        secondary: {
          DEFAULT: '#09F7A0',
          50: '#BBFDE5',
          100: '#A7FCDD',
          200: '#80FBCE',
          300: '#58FABF',
          400: '#31F8AF',
          500: '#09F7A0',
          600: '#06C27D',
          700: '#058B5A',
          800: '#035537',
          900: '#011F14',
          950: '#000302'
        },
        bg: {
          DEFAULT: '#2E303E',
          50: '#8286A2',
          100: '#767A99',
          200: '#626684',
          300: '#51546D',
          400: '#3F4255',
          500: '#2E303E',
          600: '#21222C',
          700: '#14151B',
          800: '#070709',
          900: '#000000',
          950: '#000000'
        }
      }
    }
  },

  // find the prefix in https://icones.js.org/  and then install @iconify-json/{PREFIX} for icons
  plugins: [addDynamicIconSelectors()]
}
