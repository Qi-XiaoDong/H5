# H5

## 适配

### postcss-px-to-viewport (通过插件)

#### 遇到的问题

1. 在 vite.config.ts 中通过 css 配置项 配置`postcss-px-to-viewport`失效

```

```

2. 无法转化行内样式中的 px

```

```

3. postcss.config.js 配置中 module.exports 报红

```text
1. 修改文件名为.ts后缀

2. 修改为.ts后缀后ts没有进行编译该文件导致项目报错
```

###

## vite 及 ts 配置

- 配置环境变量

1. 在配置文件中获取环境变量

```js
const env = loadEnv(mode, path.resolve(__dirname, "./env"), "");
```

1.2 envDir：指定读取 env 的目录

```js
 envDir: fileURLToPath(new URL("./env", import.meta.url)),
```

2. 配置不同环境下的 vite.config.ts 文件

#### 遇到的问题

1. vscode 编辑器中 ts 无法生效 **工作区中 ts 版本落后于 node_modules**

```
"typescript.tsdk": "node_modules/typescript/lib"

```

2. config 文件中`vite.local.config.ts`ts 报错
   ![](public\Snipaste_2023-02-14_14-01-52.png)

   ```
      暂未解决优化
   ```

3. 指定 vite 配置文件后 vue 编译时报错
   ![](public\Snipaste_2023-02-14_15-44-15.png)

   ```js
   //合并配置文件时丢失了base配置
   console.log(merge({}, viteDevConfig, viteLocalConfig));
   //正确形式
   console.log(merge(viteDevConfig, viteLocalConfig));

   // 编辑器报错
   卸载在Vetur;
   下载Volar;
   ```
