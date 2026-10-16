import DOMPurify from "dompurify";
import { Marked } from "marked";

const marked = new Marked({ gfm: true, breaks: false });

// Ticket text can come from anyone, so a picture in it must not make the viewer's browser fetch a remote URL:
// an image becomes a plain link to it. The Markdown below is sanitized again afterwards.
marked.use({
  renderer: {
    image({ href, title, text }) {
      const label = text || href;
      return `<a href="${href}"${title ? ` title="${title}"` : ""}>${label}</a>`;
    },
  },
});

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A") {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  }
});

/** Markdown to sanitized HTML. Ticket text can come from anyone, including AI agents. */
export function renderMarkdown(text: string): string {
  const html = marked.parse(text, { async: false });
  // No pictures, styles or form controls, whatever way they were written.
  return DOMPurify.sanitize(html, {
    FORBID_TAGS: ["img", "picture", "source", "style", "form", "input", "button", "select", "textarea", "svg", "math"],
  });
}
