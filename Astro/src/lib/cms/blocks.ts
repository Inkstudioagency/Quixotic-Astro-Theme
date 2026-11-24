// Strapi Blocks → HTML string. Text is escaped; link URLs are restricted to safe schemes.
import type { Block, Blocks, InlineNode, ListItemNode, ListNode, TextNode } from "./types";

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const safeUrl = (url: string) => (/^(https?:|mailto:|tel:|\/|#)/i.test(url.trim()) ? url.trim() : "#");

function text(node: TextNode): string {
  let out = escapeHtml(node.text);
  if (node.code) out = `<code>${out}</code>`;
  if (node.bold) out = `<strong>${out}</strong>`;
  if (node.italic) out = `<em>${out}</em>`;
  if (node.underline) out = `<u>${out}</u>`;
  if (node.strikethrough) out = `<s>${out}</s>`;
  return out;
}

function inline(nodes: InlineNode[] = []): string {
  return nodes
    .map((n) =>
      n.type === "link"
        ? `<a href="${escapeHtml(safeUrl(n.url))}">${n.children.map(text).join("")}</a>`
        : text(n),
    )
    .join("");
}

function list(node: ListNode): string {
  const tag = node.format === "ordered" ? "ol" : "ul";
  const items = node.children
    .map((c) => (c.type === "list" ? list(c) : `<li>${inline((c as ListItemNode).children)}</li>`))
    .join("");
  return `<${tag}>${items}</${tag}>`;
}

function block(b: Block): string {
  switch (b.type) {
    case "paragraph":
      return `<p>${inline(b.children)}</p>`;
    case "heading":
      return `<h${b.level}>${inline(b.children)}</h${b.level}>`;
    case "quote":
      return `<blockquote>${inline(b.children)}</blockquote>`;
    case "code":
      return `<pre><code>${b.children.map((c) => escapeHtml(c.text)).join("")}</code></pre>`;
    case "image": {
      const { url, alternativeText, width, height } = b.image;
      const size = width && height ? ` width="${width}" height="${height}"` : "";
      return `<figure><img src="${escapeHtml(url)}" alt="${escapeHtml(alternativeText ?? "")}"${size} loading="lazy"></figure>`;
    }
    case "list":
      return list(b);
    default:
      return "";
  }
}

export function blocksToHtml(blocks: Blocks = []): string {
  return blocks.map(block).join("");
}
