/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF5F3',
          100: '#FEE9E6',
          200: '#FED5CE',
          300: '#FBAFA3',
          400: '#F47969',
          500: '#DD3724', // Primary Logo Scarlet
          600: '#C72B1A',
          700: '#A42214',
          800: '#872015',
          900: '#6F2117',
          DEFAULT: '#DD3724',
        },
        truffle: {
          DEFAULT: '#1E100D', // Deep Velvet Truffle
          dark: '#140A08',
          light: '#2E1915',
          muted: '#4B2A23',
        },
        cream: {
          50: '#FFFEFC',
          DEFAULT: '#FDF8F2', // Whipped Vanilla
          100: '#FDF8F2',
          200: '#F8EFE4',
          300: '#EDE0D0',
          dark: '#E2D1BC',
        },
        accent: {
          glaze: '#E08E79', // Rose Gold Glaze
          gold: '#E5A338',  // Honey Gold Leaf
          berry: '#E63956', // Fresh Raspberry
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(221, 55, 36, 0.08), 0 4px 12px -2px rgba(30, 16, 13, 0.04)',
        'warm-md': '0 10px 25px -5px rgba(221, 55, 36, 0.12), 0 8px 10px -6px rgba(30, 16, 13, 0.05)',
        'warm-lg': '0 20px 40px -12px rgba(221, 55, 36, 0.18), 0 12px 20px -8px rgba(30, 16, 13, 0.08)',
        'glow': '0 0 30px rgba(221, 55, 36, 0.25)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
