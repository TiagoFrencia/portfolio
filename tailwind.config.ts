import type { Config } from 'tailwindcss';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                background: '#0a0a0a',
                surface: '#121212',
                primary: '#3b82f6',
            },
            animation: {
                'scroll': 'scroll 40s linear infinite',
                'equalizer': 'equalizer 1s ease-in-out infinite',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                equalizer: {
                    '0%, 100%': { height: '20%' },
                    '50%': { height: '100%' },
                }
            }
        },
    },
    plugins: [],
} satisfies Config;
