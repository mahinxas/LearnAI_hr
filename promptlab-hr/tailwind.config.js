/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          50:  '#f4f6f9',
          100: '#e6ebf3',
          200: '#c4d0e2',
          300: '#8fa3c0',
          400: '#5b7398',
          500: '#3a527a',
          600: '#293c5d',
          700: '#1d2c46',
          800: '#121d31',
          900: '#0a1322',
          950: '#050a14',
        },
        parchment: {
          50:  '#fdfaf3',
          100: '#faf3e3',
          200: '#f3e6c7',
          300: '#ead49e',
          400: '#dfbd6f',
          500: '#d5a64a',
        },
        coral: {
          50:  '#fff3ef',
          100: '#ffe1d8',
          200: '#ffc2b0',
          300: '#ff9a7d',
          400: '#ff6f4a',
          500: '#f04924',
          600: '#d8341a',
          700: '#b32717',
          800: '#8e2218',
          900: '#75201a',
        },
        sage: {
          50:  '#f1f7f3',
          100: '#deeae0',
          200: '#bdd5c2',
          300: '#8fb798',
          400: '#5f9670',
          500: '#3f7a52',
          600: '#2d5f3f',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.05em',
      },
      boxShadow: {
        'soft':  '0 1px 2px rgba(10, 19, 34, 0.04), 0 8px 24px rgba(10, 19, 34, 0.06)',
        'lift':  '0 4px 12px rgba(10, 19, 34, 0.08), 0 24px 64px rgba(10, 19, 34, 0.12)',
        'inset-line': 'inset 0 0 0 1px rgba(10, 19, 34, 0.08)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.5s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
