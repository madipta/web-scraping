const { join } = require("path");

module.exports = {
  presets: [require("../../tailwind.config.base.js")],
  purge: [
    join(__dirname, "src/app/app.tsx"),
    join(__dirname, "src/app/components/**/*.{js,ts,jsx,tsx}"),
    join(__dirname, "src/app/pages/**/*.{js,ts,jsx,tsx}"),
  ],
};
