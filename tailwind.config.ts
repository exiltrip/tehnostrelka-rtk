import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      colors: {
        orange: 'rgba(255, 79, 18, 1)',
        secondGray: 'rgba(243, 243, 244, 1)',
        secondOrange: 'rgba(232, 78, 25, 0.8)',
        lightOrange: 'rgba(255, 79, 18, 0.45)',
      },
      height: {
        'screen-minus-header': 'calc(100vh - 84px)',
        'screen-minus-all': 'calc(100vh - 249px)',
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [],
};
export default config;
