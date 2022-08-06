/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-08-04 20:39:08
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-08-04 20:40:27
 * @FilePath: \eslint-repo\packages\ast\1.ast.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');

let code = `function a(){}`;

// 将代码 转换为 AST 语法树 
const ast = esprima.parseScript(code);

// 访问模式 就是遍历节点的时候 会有两个过程 1个是进入一个是离开
estraverse.traverse(ast, {
  enter(node) { // Program ->  FunctionDeclaration -> Identifier
      console.log('enter:' + node.type)
      if (node.type === 'FunctionDeclaration') {
          node.id.name = 'ast'
      }
  },
  leave(node) {
      console.log('leave:' + node.type)
  }
})
console.log(escodegen.generate(ast))