module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        fondo:       '#FDF6F0',
        'fondo-alt': '#FFF1E6',
        primario:    '#C17B4E',
        'primario-dark': '#A5633A',
        secundario:  '#D4A28A',
        acento:      '#E8C9A0',
        texto:       '#3D2B1F',
        'texto-medio': '#7A5C48',
        borde:       '#EDD9C8',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        sans:  ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        'xl':  '16px',
        '2xl': '24px',
        '3xl': '32px',
      },
      animation: {
        'float':       'float 8s ease-in-out infinite',
        'pulse-warm':  'pulse-warm 2.5s infinite',
        'slide-up':    'slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':      { transform: 'translate(20px, -30px) scale(1.05)' },
          '66%':      { transform: 'translate(-15px, 20px) scale(0.97)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        }
      },
      backdropBlur: { 'warm': '20px' },
    }
  },
  plugins: [require('@tailwindcss/typography')]
}