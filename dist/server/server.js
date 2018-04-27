!function(e){var t={};function n(r){if(t[r])return t[r].exports;var u=t[r]={i:r,l:!1,exports:{}};return e[r].call(u.exports,u,u.exports,n),u.l=!0,u.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n.w={},n(n.s=13)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("react-redux")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,u=n(1);var o=((r=u)&&r.__esModule?r:{default:r}).default.Router();o.route("/fruits").get(function(e,t){t.json({message:"Hey, it's working!"})}),t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,u=n(0),o=(r=u)&&r.__esModule?r:{default:r};t.default=function(){return o.default.createElement("div",null,o.default.createElement("h1",null,"About"))}},function(e,t){e.exports=require("react-router-dom")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.addOne=function(){return{type:"INCREMENT"}},t.takeOne=function(){return{type:"DECREMENT"}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(0)),u=n(2),o=n(7),i=n(6),c=l(n(5));function l(e){return e&&e.__esModule?e:{default:e}}t.default=(0,i.withRouter)((0,u.connect)(function(e){return{count:e.count}},function(e){return{onClickAdd:function(){return e((0,o.addOne)())},onClickRemove:function(){return e((0,o.takeOne)())}}})(function(e){return r.default.createElement("div",null,r.default.createElement("h1",null,"Hello, Guys!"),r.default.createElement("p",null,e.count),r.default.createElement("button",{onClick:function(){return e.onClickAdd()}},"Add"),r.default.createElement("button",{onClick:function(){return e.onClickRemove()}},"Remove"),r.default.createElement(i.Link,{to:"/about"},"About"),r.default.createElement(i.Link,{to:"/"},"App"),r.default.createElement(i.Route,{path:"/about",component:c.default}))}))},function(e,t){e.exports=require("react-router")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={count:0};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r;switch(arguments[1].type){case"INCREMENT":return console.log("incrementing"),{count:e.count+1};case"DECREMENT":return console.log("decrementing"),{count:e.count-1};default:return e}}},function(e,t){e.exports=require("redux")},function(e,t){e.exports=require("react-dom/server")},function(e,t,n){"use strict";var r=f(n(0)),u=n(12),o=n(2),i=n(11),c=f(n(10)),l=n(9),a=f(n(8)),d=f(n(4));function f(e){return e&&e.__esModule?e:{default:e}}var s=n(1),p=n(3),m=(0,i.createStore)(c.default),v=s();v.use(s.static(p.resolve(__dirname,"../client")));v.use("/api",d.default),v.use(function(e,t){t.send(function(e,t){return'<!doctype html>\n        <html lang="pt-BR">\n        <head>\n            <meta charset="utf-8">\n            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n\n            <title>Xarife</title>\n        </head>\n        <body>\n            <h1>Hello, world!</h1>\n            <div id="app">\n            '+(0,u.renderToString)(r.default.createElement(o.Provider,{store:m},r.default.createElement(l.StaticRouter,{location:e.url,context:{}},r.default.createElement(a.default,null))))+'\n            </div>\n\n            <script src="/app.js"><\/script>\n            <script>\n                // WARNING: See the following for security issues around embedding JSON in HTML:\n                // http://redux.js.org/recipes/ServerRendering.html#security-considerations\n                window.__PRELOADED_STATE__ = '+JSON.stringify(m.getState()).replace(/</g,"\\u003c")+"\n            <\/script>\n        </body>\n        </html>"}(e))}),v.listen(8080,function(){console.log("Xarife rodando em http://localhost:8080")})}]);