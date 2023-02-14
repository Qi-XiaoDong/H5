/**
 * 开发环境vite配置
 */
import { defineConfig } from "vite";
import viteBaseConfig from "../vite.config";

import { merge } from "lodash";

console.log("dev:开发环境");

const viteDevConfig = defineConfig({
  server: {
    host: true,
    port: 5010,
    // proxy: {},
  },
});

console.log(merge({}, viteBaseConfig, viteDevConfig));

export default merge({}, viteBaseConfig, viteDevConfig);
