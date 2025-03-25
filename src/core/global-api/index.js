/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // luwen定义了一些工具函数吗，但有可能会变化，所以有使用风险
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }
// luwen定义了全局的set,delete,delete
  Vue.set = set
  Vue.delete = del
  Vue.delete = nextTick

  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }
 // 2.6 explicit observable API
  Vue.options = Object.create(null)
  // 2.6 explicit observable API
  // luwen定义了全局的方法component、directive、filter,合并到options上
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue
  // luwen定义了全局内置组件KeepAlive
  extend(Vue.options.components, builtInComponents)
  
  // luwen-通过重写原型，扩展全局静态方法
  initUse(Vue)// luwen定义了全局use方法
  initMixin(Vue)// luwen定义了全局mixin方法
  initExtend(Vue)// luwen定义了全局extend方法
  initAssetRegisters(Vue)// luwen定义了全局component、directive、filter方法处理
}
