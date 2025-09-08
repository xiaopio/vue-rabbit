import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'
// 通过插件的方式，把component组件注册为全局组件
export const componentPlugin = {
  install(app) {
    // app.component('组件名', 组件)
    app.component('XtxImageView', ImageView)
    app.component('XtxSku', Sku)
  }
}
