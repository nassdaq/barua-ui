#!/usr/bin/env node
/**
 * Barua UI — MCP server.
 *
 * Turns the design system from a file you read into a service you interrogate:
 * find a component, get its anatomy and its contract, read the rules, and hand
 * your own markup back to be judged before you ship it.
 *
 * Speaks MCP over stdio as plain JSON-RPC. No dependencies, no build step —
 * the same bargain as the stylesheet.
 *
 *   claude mcp add barua-ui -- node /path/to/mcp/barua-ui-mcp.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const index = JSON.parse(readFileSync(join(ROOT, "barua-ui.json"), "utf8"));
const components = index.categories.flatMap((c) =>
  c.components.map((comp) => ({ ...comp, categoryTitle: c.title })),
);

const TOOLS = [
  {
    name: "search_components",
    description:
      "Find components in Barua UI by name, purpose or class. Returns matches with their id, category and summary. Start here rather than guessing class names.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What you need, e.g. 'file browser', 'toast', 'b-card'" },
        limit: { type: "number", description: "Maximum matches (default 8)" },
      },
      required: ["query"],
    },
  },
  {
    name: "get_component",
    description:
      "The full entry for one component: its summary, every class it uses, the knobs it reads from your markup, the states it answers to, the documentation URL, and the canonical markup taken from its own live demo. Copy that anatomy exactly.",
    inputSchema: {
      type: "object",
      properties: { id: { type: "string", description: "Component id from search_components, e.g. 'card'" } },
      required: ["id"],
    },
  },
  {
    name: "get_rules",
    description:
      "The rules an interface built with Barua UI must follow, the naming conventions, the grid spans that exist, and every knob in the system. Read before composing anything.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "lint_markup",
    description:
      "Judge markup against the system. Send the HTML or JSX you generated and get back every violation: unknown classes, hardcoded colour, inline custom properties that are not knobs, native select or date inputs, emoji used as icons, scroll panes that cannot scroll. Run this before you call any UI work finished.",
    inputSchema: {
      type: "object",
      properties: {
        markup: { type: "string", description: "The markup to check" },
        language: { type: "string", description: "'html' (default) or 'jsx'" },
      },
      required: ["markup"],
    },
  },
];

const text = (value) => ({ content: [{ type: "text", text: value }] });

function searchComponents({ query, limit = 8 }) {
  const needle = String(query).toLowerCase();
  const scored = components
    .map((c) => {
      const haystack = `${c.id} ${c.title} ${c.summary} ${c.classes.join(" ")}`.toLowerCase();
      let score = 0;
      if (c.id === needle || c.title.toLowerCase() === needle) score += 100;
      if (c.title.toLowerCase().includes(needle)) score += 40;
      if (c.classes.some((cls) => cls.toLowerCase() === needle)) score += 60;
      if (haystack.includes(needle)) score += 10;
      for (const word of needle.split(/\s+/)) if (word && haystack.includes(word)) score += 4;
      return { c, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (!scored.length) return text(`Nothing matches "${query}". Try get_rules, or search a broader word.`);
  return text(
    scored
      .map(({ c }) => `${c.id} — ${c.title}\n  ${c.categoryTitle.split("—")[0].trim()} · ${c.url}\n  ${c.summary}`)
      .join("\n\n"),
  );
}

function getComponent({ id }) {
  const c = components.find((x) => x.id === id) ?? components.find((x) => x.title.toLowerCase() === String(id).toLowerCase());
  if (!c) return text(`No component with id "${id}". Use search_components first.`);
  const lines = [
    `# ${c.title}`,
    c.summary,
    "",
    `Documentation: ${c.url}`,
    `Classes: ${c.classes.join(" ")}`,
  ];
  if (c.knobs?.length) lines.push(`Knobs you may set inline: ${c.knobs.join(" ")}`);
  if (c.states?.length) lines.push(`States it answers to: ${c.states.join(" ")}`);
  if (c.variants?.length) lines.push(`Variants: ${c.variants.map((v) => v.title).join(", ")}`);
  if (c.markup) lines.push("", "Canonical markup — copy this anatomy:", "```html", c.markup, "```");
  return text(lines.join("\n"));
}

function getRules() {
  return text(
    [
      `# Barua UI`,
      index.description,
      "",
      "## Rules",
      ...index.rules.map((r, i) => `${i + 1}. ${r}`),
      "",
      "## Conventions",
      ...Object.entries(index.conventions).map(([k, v]) => `- ${k}: ${v}`),
      "",
      `## Grid spans that exist`,
      index.spans.join(" "),
      "",
      `## Knobs (${index.knobs.length}) — the only custom properties you may set inline`,
      index.knobs.join(" "),
      "",
      `Docs: ${index.docs} · Source: ${index.repository}`,
    ].join("\n"),
  );
}

function lintMarkup({ markup, language = "html" }) {
  const dir = mkdtempSync(join(tmpdir(), "barua-lint-"));
  const file = join(dir, language === "jsx" ? "snippet.jsx" : "snippet.html");
  writeFileSync(file, markup);
  const run = spawnSync("python3", [join(ROOT, "tools", "barua-lint.py"), file], { encoding: "utf8" });
  const output = `${run.stdout ?? ""}${run.stderr ?? ""}`.replaceAll(file, "your markup");
  if (run.status === 0) return text(`Clean — no violations.\n\n${output.trim()}`);
  return text(`Violations found. Fix these before finishing:\n\n${output.trim()}`);
}

const HANDLERS = {
  search_components: searchComponents,
  get_component: getComponent,
  get_rules: getRules,
  lint_markup: lintMarkup,
};

function respond(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

createInterface({ input: process.stdin }).on("line", (line) => {
  if (!line.trim()) return;
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    return;
  }
  const { id, method, params } = message;

  if (method === "initialize") {
    return respond(id, {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "barua-ui", version: "0.1.0" },
    });
  }
  if (method === "tools/list") return respond(id, { tools: TOOLS });
  if (method === "tools/call") {
    const handler = HANDLERS[params?.name];
    if (!handler) return respond(id, { ...text(`Unknown tool: ${params?.name}`), isError: true });
    try {
      return respond(id, handler(params.arguments ?? {}));
    } catch (error) {
      return respond(id, { ...text(`${error}`), isError: true });
    }
  }
  if (id !== undefined) respond(id, {});
});
