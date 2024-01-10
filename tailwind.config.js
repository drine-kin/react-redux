/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // themeColor: '#537178', 
        // themeColor2: '#196474',#e2e6ef
        themeColor: '#196474', 
        themeColor2: '#537178',
        themeColor3: '#B2BCC9',
        titleColor: '#323232',
        textColor: '#666',
        lightWhite: '#F7F8FA'
      },
    },
  },
  plugins: [],
}

