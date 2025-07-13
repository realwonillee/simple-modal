import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
    animation: {
      spin: 'spin 2s linear infinite',
      fadeIn: 'fadeIn 0.08s ease-out forwards',
      fadeOut: 'fadeOut 0.08s ease-in-out forwards',
      zoomFadeIn: 'zoomFadeIn 0.08s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      zoomFadeOut: 'zoomFadeOut 0.08s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      scaleFadeIn: 'scaleFadeIn 0.08s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      scaleFadeOut: 'scaleFadeOut 0.08s cubic-bezier(0.4, 0, 0.2, 1) forwards',
    },
    keyframes: {
      spin: {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
      fadeIn: {
        from: {
          opacity: '0',
        },
        to: {
          opacity: '1',
        },
      },
      fadeOut: {
        from: {
          opacity: '1',
        },
        to: {
          opacity: '0',
        },
      },
      zoomFadeIn: {
        from: {
          opacity: '0.5',
          transform: 'translate(-50%, -50%) scale(0.8)',
        },
        to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
      },
      zoomFadeOut: {
        from: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        to: { opacity: '0', transform: 'translate(-50%, -50%) scale(0.5)' },
      },
      scaleFadeOut: {
        from: { opacity: '1', transform: 'scale(1)' },
        to: { opacity: '0', transform: 'scale(0.5)' },
      },
      scaleFadeIn: {
        from: { opacity: '0.5', transform: 'scale(0.8)' },
        to: { opacity: '1', transform: 'scale(1)' },
      },
    },
  },
  plugins: [],
};
export default config;
