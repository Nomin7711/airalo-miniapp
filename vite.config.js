import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import { compression } from "vite-plugin-compression2";
import eslint from "vite-plugin-eslint";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import vitePluginRequire from "vite-plugin-require";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    loader: "jsx",
    include: [
      // Add these lines to allow all .js files to contain JSX
      "src/**/*.js",
      "node_modules/**/*.js",

      // Add these lines to allow all .ts files to contain JSX
      "src/**/*.ts",
      "node_modules/**/*.ts",
    ],
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      "@airalo": path.resolve(__dirname, "src", "apps", "Airalo"),
      "@travelsim": path.resolve(__dirname, "src", "apps", "Travelsim"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@assets": path.resolve(__dirname, "src", "assets"),
      "#redux": path.resolve(__dirname, "src", "redux"),
      "@constants": path.resolve(__dirname, "src", "constants"),
      "@config": path.resolve(__dirname, "src", "config"),
      "@utils": path.resolve(__dirname, "src", "utils"),
    },
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [
  //       {
  //         name: "load-js-files-as-jsx",
  //         setup(build) {
  //           build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
  //             loader: "jsx",
  //             contents: await fs.readFile(args.path, "utf8"),
  //           }));
  //         },
  //       },
  //     ],
  //   },
  // },
  server: {
    open: true,
    port: 3000,
  },
  plugins: [
    react({
      jsxRuntime: "classic",
    }),
    viteTsconfigPaths(),
    svgrPlugin(),
    eslint(),
    compression(),
    ViteImageOptimizer(),
    chunkSplitPlugin({
      customSplitting: {
        // operator: [/src\/features\/Operator/],
        // train: [/src\/features\/Train/],
        // iptv: [/src\/features\/Iptv/],
        // ott: [/src\/features\/Ott/],
        // invest: [/src\/features\/Invest/],
        // components: [/src\/components/],
      },
    }),
    viteCommonjs(),
    vitePluginRequire(),
  ],
});
