// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false
window.router = router
// eslint-disable-next-line
new Vue({
  el: '#app',
  name: 'App',
  router,
  components: { App },
  template: '<App/>'
})
