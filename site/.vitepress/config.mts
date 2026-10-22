import { defineConfig } from "vitepress";

// Published at https://greminn.github.io/ha-home-desk/ (GitHub Pages), so every address starts with /ha-home-desk/.
export default defineConfig({
  title: "Home Desk",
  description: "A smart home ticket system for Home Assistant, with AI to help.",
  base: "/ha-home-desk/",
  cleanUrls: true,
  lastUpdated: false,
  head: [["link", { rel: "icon", href: "/ha-home-desk/favicon.ico" }]],
  themeConfig: {
    logo: { light: "/home-desk-icon.svg", dark: "/home-desk-icon-dark.svg" },
    nav: [
      { text: "Getting Started", link: "/guide/what-is-home-desk", activeMatch: "/guide/(what-is-home-desk|install|first-ticket)" },
      { text: "Using Home Desk", link: "/guide/using-the-panel", activeMatch: "/guide/(using-the-panel|status|labels-categories|household-reports|repairs|events|settings|good-to-know)" },
      { text: "AI Agents", link: "/ai/using-ai", activeMatch: "/ai/" },
    ],
    sidebar: [
      { text: "Getting Started", items: [
        { text: "What Is Home Desk?", link: "/guide/what-is-home-desk" },
        { text: "Install", link: "/guide/install" },
        { text: "Your First Ticket", link: "/guide/first-ticket" },
      ] },
      { text: "Using Home Desk", items: [
        { text: "Using the Panel", link: "/guide/using-the-panel" },
        { text: "Status", link: "/guide/status" },
        { text: "Labels and Categories", link: "/guide/labels-categories" },
        { text: "Household Reports", link: "/guide/household-reports" },
        { text: "Home Assistant Repairs", link: "/guide/repairs" },
        { text: "Settings", link: "/guide/settings" },
        { text: "Good to Know", link: "/guide/good-to-know" },
      ] },
      { text: "AI Agents", items: [
        { text: "Using AI with Home Desk", link: "/ai/using-ai" },
        { text: "Connect Your AI Agent", link: "/ai/access" },
      ] },
      { text: "Advanced", items: [
        { text: "Events and Automations", link: "/guide/events" },
        { text: "AI Agent Runner", collapsed: true, items: [
          { text: "Overview", link: "/runner/" },
          { text: "How It Is Built", link: "/runner/overview" },
          { text: "Setup", link: "/runner/setup" },
          { text: "Looking at Your Home", link: "/runner/mcp" },
          { text: "Presets", link: "/runner/presets" },
          { text: "Troubleshooting", link: "/runner/running" },
        ] },
      ] },
      { text: "Support", items: [
        { text: "Reporting a Problem", link: "/support/reporting-a-problem" },
        { text: "Suggesting a Feature", link: "/support/suggesting-a-feature" },
        { text: "Buy Me an Espresso", link: "https://buymeacoffee.com/greminn" },
      ] },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Greminn/ha-home-desk" }],
    search: { provider: "local" },
    editLink: { pattern: "https://github.com/Greminn/ha-home-desk/edit/main/site/:path", text: "Edit this page" },
    footer: {
      message: 'Released under the <a href="https://github.com/Greminn/ha-home-desk/blob/main/LICENSE">MIT License</a>. A personal project, shared as is.',
      copyright: 'Made by <a href="https://github.com/Greminn">Greminn</a> · <a href="https://buymeacoffee.com/greminn">Buy me an espresso</a>',
    },
  },
});
