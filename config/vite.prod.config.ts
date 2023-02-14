/**
 * 开发环境vite配置
 */
import { merge } from "lodash";
import { defineConfig } from "vite";
import viteBaseConfig from "../vite.config";
const viteProdConfig = defineConfig({});
console.log("prod");
export default merge(viteBaseConfig, viteProdConfig);
