<!--
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-08-05 15:12:38
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-08-06 20:04:25
 * @FilePath: \eslint-repo\packages\eslint-plugin-lint\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# eslint-plugin-zlint

实现一个eslint 插件 

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-zlint`:

```sh
npm install eslint-plugin-zlint --save-dev
```

## Usage

Add `zlint` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "zlint"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "zlint/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here

## 5.总结 
eslint 插件开发主要是也要实现步骤：
1.安装对应的开发模板
2.补充对应的规则
  -- 根据AST语法树 解析，知道对应需要 处理的类型
  -- 找到对应的源码的位置，并进行替换 


