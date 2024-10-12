module.exports = {
  content: [
    './entrypoints/popup/**/*.{html,js,ts,tsx}',
    './entrypoints/content-script/**/*.{js,ts,tsx}', // Add this line
    './src/**/*.{js,ts,tsx}', // Add this line to cover any other source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}