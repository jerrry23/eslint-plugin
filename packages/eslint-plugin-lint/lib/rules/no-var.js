/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-08-05 15:23:34
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-08-06 16:09:06
 * @FilePath: \eslint-repo\packages\eslint-plugin-lint\lib\rules\no-var.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @fileoverview Rule to disallow unnecessary semicolons
 * @author Nicholas C. Zakas
 */

 "use strict";

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------

 module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "项目中不能有var关键字",
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      unexpected: '不能用 {{type}} '
    }
  },
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
            fix(fixer) {
              // 找到到对应的关键字
              const varToken = sourceCode.getFirstToken(node, { filter: t => t.value === 'var' })
              console.log(varToken)
              return fixer.replaceText(varToken, 'let')  // 直接返回替换的属性
            }
          })
        }
      }
    };
  },
};