import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  target: "es2020",
  /*
   * The bundler drops directives from the source files, so the bundle needs
   * its own: without it every import from a Server Component fails at module
   * evaluation, because the contexts are created at module scope.
   */
  banner: { js: '"use client";' },
});
