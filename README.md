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
修改文件名为.ts后缀
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
