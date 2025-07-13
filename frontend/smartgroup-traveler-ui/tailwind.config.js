// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← ✅ make sure this includes your source files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
