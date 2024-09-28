module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}" // Tambahkan path baru di sini
  ],
  theme: {
    extend: {
      colors: {
        accentGreen: '#5cb874', 
        background: '#0f172a', 
        textDefault: '#94a3b8', 
        accentYellow: '#ffcc00', 
        customGray: '#27292C', 
        
      },
    },
  },
  plugins: [],
}
