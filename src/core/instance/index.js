import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

// luwen最后发现Vue本质是一个函数
function Vue(options) {
  console.log("src/core/instance/index.js:new Vue函数入口");
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  // luwen-最初的初始化方法，_init是在initMixin函数中实现的原形重写定义
  this._init(options);
}
// luwen-通过重写原型，扩展Vue函数的方法
initMixin(Vue); // luwen-来自另外一个地方
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
