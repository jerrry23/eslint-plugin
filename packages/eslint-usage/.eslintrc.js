/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-08-06 16:17:43
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-08-06 18:54:43
 * @FilePath: \eslint-repo\packages\eslint-usage\.eslintrc.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  "env": { // 我当前可以使用哪个环境的全局变量 
      "browser": true,
      "es2021": true,
      "node": true
  },
  // extends 和 plugin的区别
  "extends": [
      "eslint:recommended",
      // "plugin:@typescript-eslint/recommended"
  ], // 如果集成后 就可以使用别人写好的的规则
  "parserOptions": {
      "ecmaVersion": "latest",// 这个是描述语法的
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
  },
  // "rules": {
  //     // 0 off 1 warn 2 error double-双引号 
  //     "quotes": ["error", "double"], // 这个是覆盖掉了之前集成的规则
  //     // "@typescript-eslint/no-inferrable-types": "error"
  // },z4*
  // ts 解析器
  // plugins: ['@typescript-eslint'],
  // parser: '@typescript-eslint/parser',//内部用的是espress   指定 解析器

  extends: ['plugin:lint/recommended'], ///此外还可以直接使用extends但是前提条件 是得提前配置好插件的一些信息
  // plugins: ['lint'],
  // rules: {
  //     'lint/no-var':['error']
  // },
  // extends = plugin + rule
  globals: {
      // custom: "readonly"
      custom: "writable"
  },

  // extends = plugin + rule
}
