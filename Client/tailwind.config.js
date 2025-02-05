/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8667F2',
      },
      keyframes: {
        marqueeLTR: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        marqueeRTL: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        marqueeLTR: "marqueeLTR 80s linear infinite",
        marqueeRTL: "marqueeRTL 80s linear infinite",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("tailwind-scrollbar-hide"),
    function ({ addUtilities }) {
      addUtilities({
        ".pause-on-hover:hover": {
          animationPlayState: "paused",
        },
        ".btn-line-animation": {
          position: "relative",
          display: "inline-block",
        },
        ".btn-line-animation::after": {
          content: '""',
          position: "absolute",
          bottom: "-4px",
          left: 0,
          width: "0%",
          height: "2px",
          backgroundColor: "#ffffff",
          transition: "width 0.3s",
        },
        ".btn-line-animation:hover::after": {
          width: "100%",
        },
      });
    },
  ],
};
