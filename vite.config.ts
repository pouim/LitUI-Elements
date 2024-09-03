import { defineConfig } from "vite";
import { resolve } from "path";
import { UserConfig as VitestUserConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: resolve(__dirname, "src/setupTests.ts"),
  } as VitestUserConfig["test"],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "LitUIElements",
      fileName: (format) => `litui-elements.${format}.js`,
    },
    rollupOptions: {
      external: ["lit"],
      // input: resolve(__dirname, "public/index.html"),
      output: {
        globals: {
          lit: "Lit",
        },
      },
    },
  },
});
