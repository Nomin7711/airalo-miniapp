/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xxs: "10px",
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      "2xl": "24px",
    },
    extend: {
      keyframes: {
        logo: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(359deg)" },
        },
      },
      animation: {
        logo: "logo 6s infinite linear",
      },
      boxShadow: {
        innerBall: "inset -5px -5px 6px #FFFFFF, inset 5px 5px 6px #E5E7EB",
        outerBall: "-4px -4px 6px #fefefe, 4px 4px 6px #E5E7EB",
      },
      dropShadow: {
        darker: "5px 5px 25px rgba(34, 38, 119, 0.25)",
        innerDarker: "inset 5px 5px 25px rgba(34, 38, 119, 0.25)",
      },
      colors: {
        primary: "#ED7D4F",
        deepPurple: "#240073",
        hipay: "#ff3b63",
        black0: "#ffffff",
        black10: "#f5f7fa",
        black25: "#e5e7eb",
        black40: "#9CA5B0",
        black70: "#414C58",
        black55: "#646E7B",
        black85: "#353F4A",
        warning: "#FFC830",
        orange: "#FFCC01",
        purpleOpacity: "#EFE9FA",
        dimPurple: "#B89FEF",
        purple: "#865FDB",
        airaloText: "#245073",
      },
    },
  },
  plugins: [require("tailwindcss-safe-area")],
  corePlugins: {
    preflight: false,
  },
};
