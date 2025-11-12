/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // THIS IS CRITICAL
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vscode-dark': '#1e1e1e',
        'vscode-darker': '#252526',
        'vscode-card': '#2d2d30',
        'vscode-hover': '#3e3e42',
        'vscode-border': '#454545',
        'vscode-text-secondary': '#cccccc',
        'vscode-text-muted': '#858585',
        'vscode-accent': '#007acc',
        'metamask-orange': '#f6851b',
        'metamask-orange-dark': '#e2761b',
        'metamask-yellow': '#ffc042',
      },
    },
  },
  plugins: [],
}
