// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueQriously from 'vue-qriously'
// import * as VueGoogleMaps from 'vue2-google-maps'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuex)
Vue.use(VueMaterial)
Vue.use(VueQriously)


// Vue.use(VueGoogleMaps, {
//   load: {
//     apiKey: 'AIzaSyA1ML3-uU97_aFE30ZowATAsNS5uJ9bK58',
//     libraries: '', //['places'],
//   },
// })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
