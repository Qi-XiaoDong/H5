// import { defineConfig, loadEnv } from "vite";

// // // 策略模式
// const envResolver = {
//   build: (mode: string) => {
//     console.log("生产环境");
//     return { ...viteBaseConfig, ...viteProdConfig };
//   },
//   serve: ((mode: string) => {
//     console.log("开发环境");
//     return { ...viteBaseConfig, ...viteDevConfig }; // 新配置里是可能会被配置envDir .envA
//   },
// };

// const path = require("path");

// export default defineConfig(({ command, mode }) => {
//   // 是build 还是serve主要取决于我们敲的命令是开启开发环境还是生产环境
//   // 当前env文件所在的目录
//   // 第二个参数不是必须要使用process.cwd(),
//   const env = loadEnv(mode, path.resolve(__dirname, "./env"), "");
//   // console.log(env);

//   return envResolver[command](mode);
// });
