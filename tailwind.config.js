module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#111827',

      },
    },
  },
  plugins: [
    // Добавьте плагин для определения пользовательских классов
    function ({ addUtilities }) {
      const newUtilities = {
        '.underline-animation': {
          // Используйте @apply для применения стилей Tailwind
          '@apply relative text-xl w-fit block after:block after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left': {},
        },
        '.gradient_pink': {
          // Используйте @apply для применения стилей Tailwind
          '@apply bg-gradient-to-tl from-gray-900 via-pink-700 to-gray-400': {},
        },
        '.weather_button': {
          // Используйте @apply для применения стилей Tailwind
          '@apply focus:outline-red-600 transition-transform transform-gpu focus:ring-4 focus:-translate-y-3 text-white h-[21dvh] w-[7dvw] flex flex-col justify-center items-center bg-violet-800 rounded-2xl': {},
        },
        '.weather_button-active': {
          // Используйте @apply для применения стилей Tailwind
          '@apply focus:outline-red-600 transition-transform transform-gpu ring-4 -translate-y-3 text-white h-[21dvh] w-[7dvw] flex flex-col justify-center items-center bg-violet-700 rounded-2xl': {},
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
