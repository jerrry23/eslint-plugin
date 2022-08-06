/*
 * @Author: jerrry23 dixiqi@163.com
 * @Date: 2022-08-05 15:12:38
 * @LastEditors: jerrry23 dixiqi@163.com
 * @LastEditTime: 2022-08-06 18:53:43
 * @FilePath: \eslint-repo\packages\eslint-plugin-lint\lib\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @fileoverview 实现一个eslint 插件 
 * @author 
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports= {
  rules : requireIndex(__dirname + "/rules"),
  configs: {
    recommended: {
        plugins: ['lint'],
        rules: {
            'lint/no-var': ["error"]
        }
    }
  },
}



