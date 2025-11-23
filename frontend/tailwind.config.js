/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#8b5cf6", // Violet 500
                secondary: "#06b6d4", // Cyan 500
                accent: "#f43f5e", // Rose 500
                background: "#020617", // Slate 950
                surface: "rgba(15, 23, 42, 0.8)", // Slate 900/80
                text: "#f8fafc", // Slate 50
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
        },
    },
    plugins: [daisyui],
    daisyui: {
        themes: ["dark"],
    },
};
