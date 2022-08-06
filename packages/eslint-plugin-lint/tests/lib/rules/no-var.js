/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-08-05 15:49:42
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-08-06 17:16:17
 * @FilePath: \eslint-repo\packages\eslint-plugin-lint\tests\lib\rules\no-var.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @fileoverview 项目中不能有var关键字
 * @author zi-shui
 */
 "use strict";

 //------------------------------------------------------------------------------
 // Requirements
 //------------------------------------------------------------------------------
 
 const rule = require("../../../lib/rules/no-var"),
   RuleTester = require("eslint").RuleTester;
 
 
 //------------------------------------------------------------------------------
 // Tests
 //------------------------------------------------------------------------------
 
 const ruleTester = new RuleTester({
   parserOptions: {
     ecmaVersion: 'latest'
   }
 });
 ruleTester.run("no-var", rule, {
   valid: [
     { code: "let a = 1" }
   ],
 
   invalid: [
     {
       code: "var a = 1",
       errors: [{ message: "不能用 var " }],
       output: 'let a = 1'
     },
   ],
 });
 