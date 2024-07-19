import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        montserrat: ["Montserrat var", ...defaultTheme.fontFamily.sans],
      },

      dropShadow: {
        card: "0px 0px 250px 0px hsla(0, 0%, 0%, 0.15)",
      },
      colors: {
        border: "hsla(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        border_brand: "hsl(var(--btn-primary))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // custom colors from metacarbon ui kit
        container_dark: "hsl(var(--container-dark))",
        container_light: "hsl(var(--container-light))",
        container_light_2: "hsl(var(--container-light-2))",
        container_same_bg: "hsl(var(--container-same-bg))",
        container_brand_dark: "hsl(var(--container-brand-dark))",

        // text colors
        text_title: "hsl(var(--text-title))",
        text_disabled: "hsl(var(--text-disabled))",
        text_01: "hsl(var(--text-01))",
        text_02: "hsl(var(--text-02))",
        text_03: "hsl(var(--text-03))",
        text_primary_inverted: "hsl(var(--text-primary-inverted))",
        text_warning: "hsl(var(--text-warning))",
        text_brand: "hsl(var(--text-brand))",
        text_notice: "hsl(var(--text-notice))",

        //icons
        icon_brand: "hsl(var(--icon-brand))",
        icond_dark_2: "hsl(var(--icon-dark-2))",
        icond_warning: "hsl(var(--icon-warning))",
        icond_light_2: "hsl(var(--icon-light-2))",
        icond_notice: "hsl(var(--icon-notice))",

        // state colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // custom colors from metacarbon ui kit
        // primary button
        btn_primary: {
          DEFAULT: "hsl(var(--btn-primary))",
          foreground: "hsl(var(--btn-primary-foreground))",
        },
        btn_primary_hover: "hsl(var(--btn-primary-hover))",
        btn_primary_pressed: "hsl(var(--btn-primary-pressed))",
        btn_primary_disabled: "hsl(var(--btn-primary-disabled))",

        // secondary button
        btn_secondary: {
          DEFAULT: "hsl(var(--btn-secondary))",
          foreground: "hsl(var(--btn-secondary-foreground))",
        },
        btn_secondary_hover: "hsl(var(--btn-secondary-hover))",
        btn_secondary_pressed: "hsl(var(--btn-secondary-pressed))",
        btn_secondary_disabled: "hsl(var(--btn-secondary-disabled))",
        btn_secondary_disabled_foreground: "hsl(var(--btn-secondary-disabled-foreground))",

        // link button
        btn_link_foreground: "hsl(var(--btn-link-foreground))",
        btn_link_hover_foreground: "hsl(var(--btn-link-hover-foreground))",
        btn_link_disabled_foreground: "hsl(var(--btn-link-disabled-foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        // collapsible keyframes
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",

        // collapsible animations
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
