# system

## 安装依赖

```
tyarn install
```

### 启动服务

```
tyarn serve
```

### 打包

```
tyarn build
```

### 检查并修复代码

```
tyarn lint
```

------



### 主要目录结构

```
├── src
│   ├── api				#接口地址
│   ├── assets			#资源文件
│   ├── components		#公共组件
│   ├── consts			#公共常量（各种静态配置吧） 由于代理无法配置，便将baseURL放到了这里，
│   └── pages			#页面组件
|	└── router			#路由
|	└── store			#vuex状态管理
|	└── utils			#工具
├── vue.config.js		#配置文件
```