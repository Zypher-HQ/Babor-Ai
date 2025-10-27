module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
          "100%": { transform: "translateY(0px)" },
        },
        typing: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "pop-in": "popIn 0.3s ease-out",
        "float-slow": "float 10s ease-in-out infinite",
        "float-medium": "float 8s ease-in-out infinite",
        "float-fast": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
