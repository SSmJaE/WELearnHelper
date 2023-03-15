# 开发指南

## 安装所有依赖

```sh
npm install
```

## 运行开发服务器，可以用来调整UI布局

```sh
npm run server
```

## 打包带source map的dev bundle

```sh
npm run dev
```

## 打包生产bundle

```sh
npm run build
```

## 架构

- 考试、联系、时长、秒过都作为插件单独编写，最终通过plugins文件下下的index.ts统一暴露，如果需要扩展功能，可以自行扩展插件
- 每一个插件都有自己的设置，在index.ts中统一注册，最终呈现于设置面板
- WE Learn中的每一种题型(每一种题型对应多个课程)都有单独的parser和solver，parser仅负责解析答案，solver仅负责自动答题，在exercise插件下的main.ts中同一调度
- 所以可以单独为一种题型写parser和solver

## 发布

1. 如果最终打包体积过大，可以考虑不打包Vue等依赖，通过油猴require
