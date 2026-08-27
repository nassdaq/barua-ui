import { createContext, useContext, useEffect, type ReactNode } from "react";
import { ToastProvider } from "./toast";

export type BaruaTheme = "auto" | "light" | "dark";
export type BaruaAccent = "blue" | "indigo" | "purple" | "pink" | "teal" | "green";

export interface BaruaProviderProps {
  children: ReactNode;
  /** Explicit theme; "auto" follows the system. */
  theme?: BaruaTheme;
  /** Re-tint the whole system from one attribute. */
  accent?: BaruaAccent;
  /** Liquid Glass mode — re-skins every component. */
  glass?: boolean;
  /** Tier-2 refraction (SVG displacement in backdrop-filter, Blink only). */
  refraction?: boolean;
}

const ThemeContext = createContext<{ theme: BaruaTheme } | null>(null);

const MAP_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">' +
      '<defs>' +
      '<linearGradient id="x" x1="0" x2="1" y1="0" y2="0">' +
      '<stop offset="0" stop-color="#ff0000" stop-opacity="0"/>' +
      '<stop offset="1" stop-color="#ff0000"/></linearGradient>' +
      '<linearGradient id="y" x1="0" x2="0" y1="0" y2="1">' +
      '<stop offset="0" stop-color="#00ff00" stop-opacity="0"/>' +
      '<stop offset="1" stop-color="#00ff00"/></linearGradient>' +
      '<radialGradient id="c">' +
      '<stop offset="0" stop-color="#808000"/>' +
      '<stop offset="0.68" stop-color="#808000"/>' +
      '<stop offset="1" stop-color="#808000" stop-opacity="0"/></radialGradient>' +
      "</defs>" +
      '<rect width="256" height="256" fill="#000"/>' +
      '<rect width="256" height="256" fill="url(#x)" style="mix-blend-mode:screen"/>' +
      '<rect width="256" height="256" fill="url(#y)" style="mix-blend-mode:screen"/>' +
      '<rect width="256" height="256" fill="url(#c)"/>' +
      "</svg>"
  );

function enableRefraction() {
  if (typeof document === "undefined") return;
  if (document.getElementById("b-refract")) {
    document.documentElement.classList.add("b-refract");
    return;
  }
  if (!("chrome" in window) || !CSS.supports("backdrop-filter", "url(#x)")) return;
  const host = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  host.setAttribute("width", "0");
  host.setAttribute("height", "0");
  host.setAttribute("aria-hidden", "true");
  host.style.position = "absolute";
  host.innerHTML =
    '<filter id="b-refract" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">' +
    `<feImage href="${MAP_URI}" preserveAspectRatio="none" result="m"/>` +
    '<feDisplacementMap in="SourceGraphic" in2="m" scale="-32" xChannelSelector="R" yChannelSelector="G"/>' +
    "</filter>";
  document.body.appendChild(host);
  document.documentElement.classList.add("b-refract");
}

/**
 * Mount once at the app root. Applies theme/accent/glass attributes to
 * <html>, enables refraction where supported, and provides the toast region.
 *
 *   import "barua-ui/css";
 *   <BaruaProvider theme="auto" glass><App /></BaruaProvider>
 */
export function BaruaProvider({
  children,
  theme = "auto",
  accent,
  glass = false,
  refraction = true,
}: BaruaProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "auto") delete root.dataset.theme;
    else root.dataset.theme = theme;
    if (accent && accent !== "blue") root.dataset.accent = accent;
    else delete root.dataset.accent;
    if (glass) root.dataset.glass = "liquid";
    else delete root.dataset.glass;
  }, [theme, accent, glass]);

  useEffect(() => {
    if (refraction) enableRefraction();
    else document.documentElement.classList.remove("b-refract");
  }, [refraction]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeContext.Provider>
  );
}

export function useBaruaTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useBaruaTheme must be used within <BaruaProvider>");
  return ctx;
}

/**
 * Inline no-flash script for SSR frameworks — render inside <head> so the
 * stored theme applies before first paint.
 */
export function ThemeScript() {
  const js =
    'try{const t=localStorage.getItem("barua-theme");if(t)document.documentElement.dataset.theme=t;' +
    'if(localStorage.getItem("barua-glass"))document.documentElement.dataset.glass="liquid"}catch(e){}';
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
