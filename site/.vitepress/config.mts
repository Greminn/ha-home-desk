import { defineConfig } from "vitepress";

// Published at https://greminn.github.io/ha-home-desk/ (GitHub Pages), so every address starts with /ha-home-desk/.
export default defineConfig({
  title: "Home Desk",
  description: "A helpdesk for the home, inside Home Assistant.",
  base: "/ha-home-desk/",
  cleanUrls: true,
  lastUpdated: false,
  head: [["link", { rel: "icon", href: "/ha-home-desk/favicon.ico" }]],
  themeConfig: {
    logo: { light: "/home-desk-icon-black-512.png", dark: "/home-desk-icon-white-512.png" },
    nav: [
      { text: "Install", link: "/guide/install" },
      { text: "Using Home Desk", link: "/guide/using-the-panel" },
      { text: "AI Agents", link: "/ai/access" },
      { text: "The Runner", link: "/runner/" },
    ],
    sidebar: [
      { text: "Getting Started", items: [
        { text: "What Is Home Desk?", link: "/guide/what-is-home-desk" },
        { text: "Install", link: "/guide/install" },
        { text: "Known Limits", link: "/guide/known-limits" },
      ] },
      { text: "Using Home Desk", items: [
        { text: "Using the Panel", link: "/guide/using-the-panel" },
        { text: "Status", link: "/guide/status" },
        { text: "Labels and Categories", link: "/guide/labels-categories" },
        { text: "Household Reports", link: "/guide/household-reports" },
        { text: "Home Assistant Repairs", link: "/guide/repairs" },
        { text: "Settings", link: "/guide/settings" },
        { text: "Events and Notifications", link: "/guide/events" },
        { text: "Importing a Tracker", link: "/guide/importing" },
      ] },
      { text: "AI Agents", items: [
        { text: "AI Access", link: "/ai/access" },
        { text: "Assigning to an AI Agent", link: "/ai/assigning" },
      ] },
      { text: "The AI Agent Runner (Optional)", items: [
        { text: "Overview", link: "/runner/" },
        { text: "How It Is Built", link: "/runner/overview" },
        { text: "Setup", link: "/runner/setup" },
        { text: "Letting It Look at Your Home", link: "/runner/mcp" },
        { text: "Presets", link: "/runner/presets" },
        { text: "Watching and Troubleshooting", link: "/runner/running" },
      ] },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/Greminn/ha-home-desk" }],
    search: { provider: "local" },
    editLink: { pattern: "https://github.com/Greminn/ha-home-desk/edit/main/site/:path", text: "Edit this page" },
    footer: { message: "A personal project, shared as is. No warranty." },
  },
});
