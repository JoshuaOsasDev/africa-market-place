module.exports = {
  theme: {
    extend: {
      keyframes: {
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
      animation: {
        heartbeat: "heartbeat 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          /* Hide scrollbar for modern browsers */
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
};
