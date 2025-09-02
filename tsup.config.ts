import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    "app/index": "src/app/index.ts",
    "pages/index": "src/pages/index.ts"
  },
  format: "esm",
  outDir: "dist",
  dts: true,
  minify: true,
  clean: true
});
