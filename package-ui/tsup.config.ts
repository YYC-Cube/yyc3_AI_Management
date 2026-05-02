import { defineConfig } from "tsup"

export default defineConfig({
  entry: {
    index: "src/index.ts",
    button: "src/components/Button/Button.tsx",
    input: "src/components/Input/Input.tsx",
    badge: "src/components/Badge/Badge.tsx",
    card: "src/components/Card/Card.tsx",
    table: "src/components/Table/Table.tsx",
    form: "src/components/Form/Form.tsx",
    tokens: "src/design-tokens/tokens.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
  treeshake: true,
  minify: false,
  outDir: "dist",
})
