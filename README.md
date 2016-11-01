## 一、使用到的技术

- Vue
- vue-router
- Vuex
- ES6 (ES2015)

对于 HTML 和 CSS 未使用任何预处理等技术，对于一般项目，个人觉得没有任何必要，其理由：

1. HTML 本身是标记语言，vue 已经将 html 进行了组件分块，所以并不太长，使用 html 在保留可读性的同时，更方便传播，无上手成本

2. CSS 在 vue 中基本使用 scope 的方式，所以对于 scope 后的 css，只需要对样式进行合理的思考，基本没什么难度

以上针对`中小型`项目，不针对`大型项目`，对于`大型项目`来讲，任何的引入更多的是让项目**可持续发展**。

## 二、基本的安装

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 三、主要项目结构（ 由 vue-cli 生成 ）

```javascript
├── README.md
├── build ( 基本编译和服务的配置 )
│   ├── build.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config ( 项目参数的配置 )
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── index.html ( 项目的入口 html )
├── src ( vue 开发主要的目录 )
│   ├── App.vue
│   ├── actions ( vuex: action )
│   ├── assets ( 静态资源 )
│   ├── components ( vue组件 )
│   ├── getters ( vuex: getters )
│   ├── main.js ( 开始文件 )
│   ├── router.js ( vue-router: router 的封装 )
│   └── store
└── static ( 发布的静态资源目录: publicPath )
```

## 四、对生成项目的修改之处

1.修改一下开发的虚拟静态目录

```javascript
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
```

## 五、为何这样配置目录

1. 扁平一点目录结构，将 actions、getters 在 vue components 中常需要引入的资源放入 src 目录，这样可以减少 import 开发主要的目录
2. store 目录只配置 vuex store 概念的核心配置，其中官方的 mutation-types 我认为不必要存在，本质上就是配置 const 变量，所以我使用了 constants.js（还有就是中划线命名文件名个人觉得不舒服）
3. store-modules 配置，和官方一样，将文件拆分为 modules，但是添加了入口文件 index.js，这样方便更好的声明式导出和方便 import
4. components 目录也用了一样的方式，使用 index.js 来当入口文件，合理导出
5. actions 目录就比较直接，因为可能会有业务逻辑和 async 逻辑，最直接最好理解和维护
6. 删除了 eslint，多人团队适合，我表示不喜欢，喜欢直接写代码
