import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "bluish": '#373A45',
        "bluish-200": '#17191f',
        "blackish": '#282B34',
        "category": {
          "transjakarta": '#184CA1',
          "hayday": '#5A9E15',
          "farmfrenzy": '#BA6609',
          "pizzafrenzy": '#911D04',
          "thesims": '#258018',
          "nasigoreng": '#DFD3AF',
          "default": '#5B7AD7'
        },
        "category-mid": {
          "transjakarta": '#184CA155',
          "hayday": '#5A9E1555',
          "farmfrenzy": '#BA660955',
          "pizzafrenzy": '#911D0455',
          "thesims": '#25801855',
          "nasigoreng": '#DFD3AF55',
          "default": '#5B7AD755'
        },
        "category-hover": {
          "transjakarta": '#184CA122',
          "hayday": '#5A9E1522',
          "farmfrenzy": '#BA660922',
          "pizzafrenzy": '#911D0422',
          "thesims": '#25801822',
          "nasigoreng": '#DFD3AF22',
          "default": '#5B7AD722'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    flowbite.plugin(),
    require('tailwindcss-image-rendering')()
  ],
};
export default config;
