/**
 * 基础vite配置
 */

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// const path = require("path");
// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, path.resolve(__dirname, "./env"), "");
//   console.log("env", env);

//   return {
//     plugins: [vue(), vueJsx()],
//     resolve: {
//       alias: {
//         "@": fileURLToPath(new URL("./src", import.meta.url)),
//         "@@/types": fileURLToPath(new URL("./src/@types", import.meta.url)),
//       },
//     },
//     envDir: fileURLToPath(new URL("./env", import.meta.url)),
//   };
// });

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        // Components({
        //     resolvers: [AntDesignVueResolver()],
        // }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@@/types": fileURLToPath(new URL("./src/@types", import.meta.url)),
        },
    },
    envDir: fileURLToPath(new URL("./env", import.meta.url)),
});
