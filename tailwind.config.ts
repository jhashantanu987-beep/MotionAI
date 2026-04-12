import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 30px 80px rgba(14, 165, 233, 0.16)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.12), transparent 28%)'
      }
    }
  },
  plugins: []
}

export default config
