import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        tfl: {
          bg: "#F2F3FF",
          bakerloo: "#B6600B",
          central: "#E02416",
          circle: "#FBD503",
          district: "#017F30",
          hammcity: "#F683A3",
          jubilee: "#A3A3A3",
          metro: "#990661",
          northern: "#1C1C1C",
          piccadilly: "#243689",
          victoria: "#039DD8",
          waterloo: "#92CEBA"
        }
      }
    },
  },
  plugins: [],
}
export default config
