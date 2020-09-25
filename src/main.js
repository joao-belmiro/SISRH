import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './quasar'
import VueChart from 'vue-chartjs'
import money from 'v-money'

Vue.use(money, { precision: 2 })
Vue.use(VueChart)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
