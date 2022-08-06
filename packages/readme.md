流程图信息：

[eslint.xmind](https://www.yuque.com/attachments/yuque/0/2022/xmind/12934489/1659687154044-82a377f0-ba0f-404b-be04-049c94a3b8cc.xmind?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2022%2Fxmind%2F12934489%2F1659687154044-82a377f0-ba0f-404b-be04-049c94a3b8cc.xmind%22%2C%22name%22%3A%22eslint.xmind%22%2C%22size%22%3A516237%2C%22type%22%3A%22application%2Fvnd.xmind.workbook%22%2C%22ext%22%3A%22xmind%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22mode%22%3A%22title%22%2C%22download%22%3Atrue%2C%22taskId%22%3A%22u809b68d9-e48f-481b-8a48-c26f8bc963c%22%2C%22taskType%22%3A%22upload%22%2C%22__spacing%22%3A%22both%22%2C%22id%22%3A%22ub65950d2%22%2C%22margin%22%3A%7B%22top%22%3Atrue%2C%22bottom%22%3Atrue%7D%2C%22card%22%3A%22file%22%7D)

主要内容：编写一个禁止输入 var 的 eslint 插件 
## 1.环境安装
### 1.安装脚手架生成模板
```javascript
npm install yo generator-eslint -g
```
## 2.模板初始化
```javascript
mkdir eslint-plugin-lint  // 创建文件夹
cd eslint-plugin-lint // 切换到文件夹
yo eslint:plugin  // # 插件模板初始化
```
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12934489/1659683819737-a69a39f6-1ae6-4195-9af9-9f9ec45542a4.png#clientId=u6e9df904-0f83-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=433&id=ucfdd60a5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=649&originWidth=1194&originalType=binary&ratio=1&rotation=0&showTitle=false&size=83188&status=done&style=none&taskId=u25ab30a1-932f-4b37-ae48-5ae0e8898a0&title=&width=796)

生成的募目录如下 ：<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/12934489/1659683954087-c11af760-a413-423c-8e59-011287f40679.png#clientId=u6e9df904-0f83-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=457&id=uea3ef484&margin=%5Bobject%20Object%5D&name=image.png&originHeight=685&originWidth=445&originalType=binary&ratio=1&rotation=0&showTitle=false&size=44801&status=done&style=none&taskId=u88bee978-e0a5-4a72-b214-f07093b28fc&title=&width=296.6666666666667)

## 3..处理逻辑
开发一个插件的时候 ，我们需要在lib/rules 目录添加具体的规则文件 （这里只no-var.js）、以及tests/lib/rules 添加对应的测试文件 （这里对应no-var.js）<br />对于具体的规则文件 ，有一个具体的模板 ，具体参考 ：<br />具体代码如下 ：
```javascript
 module.exports = {
     meta: {
         type: "problem", // `problem`, `suggestion`, or `layout`
 
         docs: {
             description: "disallow unnecessary semicolons",
             recommended: true,
         },
         fixable: "code",
         schema: [] // no options
     },
     create: function(context) {
         return {
             // callback functions
         };
     }
 };
```
此时，我们仅需要在 create补充对应的逻辑，具体步骤如下 ：

### 1.获取源代码 
```javascript
const sourceCode = context.getSourceCode(); // 要用这个来修复代码
```

### 2.返回对应的节点类型列表 
根据AST 语法树转换 ，由此可见   var  xxx=1 是一个 VariableDeclaration 节点，
```javascript
 return {
      VariableDeclaration(node) {}
 }
```
### 3.处理节点
这里将调用report 函数，并对其进行处理 
```javascript
create(context) {

    // 重点 需要修复的地方 
    // https://eslint.bootcss.com/docs/developer-guide/working-with-rules

    const sourceCode = context.getSourceCode(); // 要用这个来修复代码


    return {
      VariableDeclaration(node) {
        if (node.kind == 'var') { // var
          context.report({
            node,
            data: { type: 'var' },
            messageId: 'unexpected',
            fix(fixer) { // fix 逻辑
              const varToken = sourceCode.getFirstToken(node, { filter: t => t.value === 'var' })
              console.log(varToken)
              return fixer.replaceText(varToken, 'let')
            }
          })
        }

      }
    };
  },
```
 

### 4.编写单元测试

## 4.测试
#### 1.环境初始化 
新建文件夹 eslint-usage<br />安装插件 ： 
```javascript
pnpm init
pnpm i eslint -D # 安装eslint
pnpm create @eslint/config # 初始化eslint的配置⽂件
```
生成的配置文件 是 ：
```javascript
module.exports = {
env: { // 指定环境
browser: true, // 浏览器环境 document
es2021: true, // ECMAScript语法 Promise
node: true, // node环境 require
 },
extends: "eslint:recommended",
parserOptions: { // ⽀持语⾔的选项, ⽀持最新js语法，同时⽀持jsx语法
ecmaVersion: "latest", // ⽀持的语法是
sourceType: "module", // ⽀持模块化
ecmaFeatures:{
"jsx":true
 }
 },
rules: { // eslint规则
"semi": ["error", "always"],
"quotes": ["error", "double"]
 },
globals:{ // 配置全局变量
custom:"readonly" // readonly 、 writable
 }
};
```
#### 2.修改配置文件 
主要是得将刚开发的插件 导入进来 ，此时有2种方式 

配置 plugins + rules 

添加的内容如下 ：
```javascript
 plugins: ['lint'], // 这里是指的插件名字  ， eslint 插件 命名规则：eslint-plugin-xxxx
 rules: {
      'lint/no-var':['error']  // 这里对应的规则就是 我们自己写的实现的路径
 },
```

#### 3.新增测试文件 test.js
```javascript
var  q= 1
console.log(q)
```

#### 4.运行 
切换到最外层的根目录下 执行 ： pnpm install  eslint-plugin-lint@workspace -w<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/12934489/1659782461473-d71340c5-fb48-4600-8156-e5118cd9d420.png#clientId=ucb07df58-e790-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=208&id=u9ebba9c3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=312&originWidth=1460&originalType=binary&ratio=1&rotation=0&showTitle=false&size=45964&status=done&style=none&taskId=u965ab19c-f943-43d7-98b0-68eff7c2548&title=&width=973.3333333333334)<br />切换到 当前测试文件的根目录 （这里指的是 eslint-usage 文件夹所在的路径），输入 npx eslint test.js

PS: 如果已经安装vscode 插件，现将eslint 插件禁用

![image.png](https://cdn.nlark.com/yuque/0/2022/png/12934489/1659782771153-86b090d8-5a5f-4297-91e9-4f9055983e57.png#clientId=ucb07df58-e790-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=449&id=uf8847acb&margin=%5Bobject%20Object%5D&name=image.png&originHeight=673&originWidth=1103&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65330&status=done&style=none&taskId=u0fc8da29-734b-49c0-9054-d894eccfc1e&title=&width=735.3333333333334)<br />额外的增加  --fix 后缀 ，则该问题将会被修复 <br />此外 ， .eslintrc.js 配置 extends 的形式 ，但是这种方式 需要在 编写插件 夹 的index.js增加额外配置 
```javascript
 //  packages\eslint-plugin-lint\lib\index.js   路径

"use strict";

const requireIndex = require("requireindex");
module.exports= {
  rules : requireIndex(__dirname + "/rules"),
  configs: {
    recommended: { // 以下为新加的部分 
        plugins: ['lint'],
        rules: {
            'lint/no-var': ["error"]
        }
    }
  },
}
```
在 测试项目的.eslintrc.js 添加如下配置 
```javascript
 module.exports = {
  ...  // 省略其他 

  extends: ['plugin:lint/recommended'], ///此外还可以直接使用extends但是前提条件 是得提前配置好插件的一些信息
  // plugins: ['lint'],
  // rules: {
  //     'lint/no-var':['error']
  // },
    ....
}
```

此时 ，应保证vscode 的eslint 插件处于激活状态 ， 重启vscode  ，打开对应的文件夹  便可以看到 <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/12934489/1659783706382-67b93a9f-195f-46f1-a99b-43570749d52f.png#clientId=ucb07df58-e790-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=77&id=uc9ba9875&margin=%5Bobject%20Object%5D&name=image.png&originHeight=116&originWidth=441&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6565&status=done&style=none&taskId=u8910dc83-a853-408a-85b7-5e6c8cfae28&title=&width=294)<br />鼠标悬浮到var 便可以看到相应的提示 

![image.png](https://cdn.nlark.com/yuque/0/2022/png/12934489/1659783796926-769cbb4b-e784-46c3-9d32-be8d74a01d78.png#clientId=ucb07df58-e790-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=131&id=u139c581d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=197&originWidth=633&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22274&status=done&style=none&taskId=ub707f1dd-f562-4b75-bb1d-09b61872cdb&title=&width=422)

到此 ，一个禁止输入 var的eslint 插件已经生成 


