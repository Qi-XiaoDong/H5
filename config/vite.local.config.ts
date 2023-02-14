/**
 * 生产环境vite配置
 */
import { defineConfig } from "vite";
import { fromPairs, has, merge, reverse, toPairs } from "lodash";
import viteDevConfig from "./vite.dev.config";
import viteBaseConfig from "../vite.config";
console.log("local:开发环境");

const viteLocalConfig = defineConfig({
  server: {
    host: true,
    port: 5011,
    proxy: {},
  },
});

// const mergedConfig: any = () => {
//   return;
// };

/**
 * 开发服务器中 proxy 代理需要额外处理
 * 保证 local中的proxy优先
 */

// 对于proxy，覆盖的可能需要排在前面，这里作特殊处理
// if (has(mergedConfig, "server.proxy")) {
//   const _tempArr = toPairs(mergedConfig?.["server"]?.["proxy"]);
//   mergedConfig["server"]["proxy"] = fromPairs(reverse(_tempArr));
// }

console.log(merge(viteDevConfig, viteLocalConfig));

export default merge(viteDevConfig, viteLocalConfig);
