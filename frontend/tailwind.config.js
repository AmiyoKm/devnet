/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#00f2ea", // Neon Cyan
                secondary: "#ff0055", // Neon Pink
                background: "#0f172a", // Deep Blue/Black
                surface: "rgba(255, 255, 255, 0.1)", // Glassmorphism
                text: "#e2e8f0", // Light Gray
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: ["dark"], // Force dark mode
    },
};
