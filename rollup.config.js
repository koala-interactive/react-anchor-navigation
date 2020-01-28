import fs from "fs";
import path from "path";

import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";
const { version, license, name } = require("./package.json");
const licenseData = fs.readFileSync(path.join(process.cwd(), "LICENSE.md"), {
  encoding: "utf-8"
});
const bannerPlugin = {
  banner: `/**
 * @license ${name} ${version}
 * ${licenseData.split("\n", 1)}
 * License: ${license}
 */`
};
const exportFormat = format => ({
  input: "src/index.ts",
  output: {
    name,
    format,
    file: `dist/${format}/react-anchor-navigation.js`
  },
  external: ["react"],
  plugins: [
    builtins(),
    resolve({
      extensions: [".tsx", ".ts"]
    }),
    babel({
      extensions: [".tsx", ".ts"],
      exclude: "node_modules/**"
    }),
    bannerPlugin,
    terser({
      toplevel: true,
      compress: {
        unsafe: true
      },
      output: { comments: /@license/ }
    }),
    sizeSnapshot()
  ].filter(v => v)
});
export default ["umd", "cjs", "esm"].map(exportFormat);
