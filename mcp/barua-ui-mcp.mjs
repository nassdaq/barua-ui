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
import { createServer } from "node:http";

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
    name: "get_react",
    description:
      "How to build this system in React. With no argument: how to install the package, load the stylesheet, and what the provider is for. With a component: the import line, the props that replace its modifier classes, and the JSX for its documented example — copy that rather than writing class strings.",
    inputSchema: {
      type: "object",
      properties: {
        component: { type: "string", description: "Component id, e.g. 'card' — or leave empty for setup" },
      },
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
      /* React names are how half the callers will ask — <Dropdown>, not b-dropdown. */
      const react = c.react?.components ?? [];
      const haystack = `${c.id} ${c.title} ${c.summary} ${c.classes.join(" ")} ${react.join(" ")}`.toLowerCase();
      let score = 0;
      if (c.id === needle || c.title.toLowerCase() === needle) score += 100;
      if (react.some((n) => n.toLowerCase() === needle)) score += 90;
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
      .map(({ c }) => {
        const react = c.react?.components?.length
          ? `\n  React: <${c.react.root ?? c.react.components[0]}> — call get_react for the JSX`
          : "";
        return `${c.id} — ${c.title}\n  ${c.categoryTitle.split("—")[0].trim()} · ${c.url}${react}\n  ${c.summary}`;
      })
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

/**
 * The React answer for a component, taken from the generated index — the same
 * example the documentation shows, already translated.
 */
function getReact({ component }) {
  const setup = [
    "# Barua UI in React",
    "",
    "    npm install barua-ui",
    "",
    'Load the stylesheet once at the root: `import "barua-ui/css";`. That is the',
    "system — the components only spare you the class names, and every one of them",
    "renders exactly the markup the documentation shows.",
    "",
    "The bundle carries its own \"use client\", so importing from a Server Component",
    "works. Light and dark already follow the OS through light-dark(); reach for",
    "BaruaProvider only to override that, and ToastProvider only if you want toasts.",
    "",
    "Every component forwards className and its ref, so a class the props do not",
    "cover can still be added by hand. Nothing here is a gate.",
    "",
    `Full reference: ${index.docs}/docs/react.html`,
  ].join("\n");

  if (!component) return text(setup);

  const found = components.find((c) => c.id === component);
  if (!found) return text(`No component with id "${component}". Use search_components first.`);
  if (!found.react) {
    return text(
      [
        `# ${found.title} in React`,
        "",
        "This one has no generated React example — its demo is raw markup rather than",
        "components. Use the HTML from get_component and add the classes directly; that",
        "is supported, not a workaround.",
        "",
        `Documentation: ${found.url}`,
      ].join("\n"),
    );
  }
  return text(
    [
      `# ${found.title} in React`,
      "",
      found.react.import,
      "",
      found.react.jsx,
      "",
      `Documentation: ${found.url}`,
      "Setup, provider and escape hatches: call get_react with no argument.",
    ].join("\n"),
  );
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
  get_react: getReact,
  get_rules: getRules,
  lint_markup: lintMarkup,
};

/** One place decides what a request means; the transports only carry it. */
const REQUIRED = { get_component: "id", search_components: "query", lint_markup: "markup" };

function handle(message) {
  const { id, method, params } = message ?? {};
  if (method === "initialize") {
    return {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "barua-ui", version: "0.1.0" },
    };
  }
  if (method === "tools/list") return { tools: TOOLS };
  if (method === "tools/call") {
    const handler = HANDLERS[params?.name];
    if (!handler) return { ...text(`Unknown tool: ${params?.name}`), isError: true };
    const needs = REQUIRED[params?.name];
    if (needs && params?.arguments?.[needs] === undefined) {
      return {
        ...text(`${params.name} needs the "${needs}" argument. You sent: ${JSON.stringify(params?.arguments ?? {})}`),
        isError: true,
      };
    }
    try {
      return handler(params?.arguments ?? {});
    } catch (error) {
      return { ...text(`${error}`), isError: true };
    }
  }
  return {};
}

function respond(id, result) {
  process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id, result }) + "\n");
}

/**
 * Hosted transport. The same four tools over HTTP, so an agent that has never
 * seen this repository can still ask the system questions:
 *
 *   claude mcp add --transport http barua-ui https://mcp.barua.tz/mcp
 */
function serveHttp(port) {
  createServer((request, response) => {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id, mcp-protocol-version",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    };
    if (request.method === "OPTIONS") {
      response.writeHead(204, cors);
      return response.end();
    }
    if (request.method === "GET") {
      response.writeHead(200, { ...cors, "content-type": "application/json" });
      return response.end(
        JSON.stringify({
          name: "barua-ui",
          description: index.description,
          docs: index.docs,
          transport: "streamable-http",
          endpoint: "/mcp",
          tools: TOOLS.map((t) => t.name),
        }),
      );
    }
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      // A design system answers questions; it does not accept uploads.
      if (body.length > 1_000_000) request.destroy();
    });
    request.on("end", () => {
      let message;
      try {
        message = JSON.parse(body || "{}");
      } catch {
        response.writeHead(400, { ...cors, "content-type": "application/json" });
        return response.end(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }));
      }
      const payload = Array.isArray(message) ? message : [message];
      const results = payload
        .filter((m) => m.id !== undefined)
        .map((m) => ({ jsonrpc: "2.0", id: m.id, result: handle(m) }));
      response.writeHead(200, { ...cors, "content-type": "application/json" });
      response.end(JSON.stringify(Array.isArray(message) ? results : (results[0] ?? {})));
    });
  }).listen(port, "127.0.0.1", () => {
    console.log(`barua-ui MCP on http://127.0.0.1:${port}/mcp`);
  });
}

const httpPort = process.env.PORT || (process.argv.includes("--http") ? 3030 : null);
if (httpPort) {
  serveHttp(Number(httpPort));
} else {
  createInterface({ input: process.stdin }).on("line", (line) => {
    if (!line.trim()) return;
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      return;
    }
    if (message.id !== undefined) respond(message.id, handle(message));
  });
}
