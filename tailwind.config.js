/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0088FF',
        'dark-blue': '#166ECC',
        'light-blue': '#BDCFD9',
        'blue-gray': '#F8FAFB',
        'yellow-hard': '#FBB615',
        'green-hard': '#026D44',
      },
      backgroundColor: {
        'primary-blue': '#0088FF',
        'dark-blue': '#166ECC',
        'light-blue': '#BDCFD9',
        'blue-gray': '#F8FAFB',
        'card-white': '#FFFFFF',
        'yellow-hard-bg': '#FBB615',
        'green-bg': '#AFEA3D',
        'grey-bg': '#EFEFEF',
        'red-hard-bg': '#CE0E2D',
        'green-hard-bg' :'#026D44',
      },
      borderColor: {
        'primary-blue': '#0088FF',
        'dark-blue': '#166ECC',
        'light-blue': '#BDCFD9',
      },
      gradientColorStops: {
        'primary-blue': '#0088FF',
        'dark-blue': '#166ECC',
        'light-blue': '#BDCFD9',
      }
    },
  },
  plugins: [],
}

