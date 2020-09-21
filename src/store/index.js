import Vue from 'vue'
import Vuex from 'vuex'
import colaborador from './colaborador'
import cargo from './cargo'
import depart from './departamento'
import usuario from './usuario'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    colaborador,
    cargo,
    depart,
    usuario
  }
})
