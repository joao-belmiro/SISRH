import departamento from '../../services/departamento.js'
import router from '../../router'
const dept = {
  async salvarDept ({ commit, dispatch }, dept) {
    await departamento.salvar(dept).then(response => {
      if (response.status === 201) {
        commit('limparDept', true)
        if (router.currentRoute.name === 'home') dispatch('dashDepartamentos')
      }
    })
  },
  alterarDept ({ commit }, dept) {
    departamento.alterar(dept).then(response => {
      if (response.status === 204) {
        commit('limparDept', true)
      }
    })
  },
  async deletarDept ({ commit }, idDepartamento) {
    await departamento.deletar(idDepartamento).then(response => {
      if (response.status === 204) {
        commit('removerDepartamento', idDepartamento)
      }
    })
  },
  filtroDepartamento ({ commit }, tag) {
    departamento.buscarPorFiltro(tag).then(response => {
      commit('setFiltroDepartamentos', response.data)
    })
  },
  todosDepartamentos ({ commit }) {
    departamento.buscarTodos().then(response => {
      commit('setTodosDepartamentos', response.data)
    })
  },
  async dashDepartamentos ({ state, commit }) {
    if (state.todosDepartamentos.length !== 0) state.data = []
    if (state.load) state.load = false
    if (state.data.length !== 0) state.data = []
    if (state.labels.length !== 0) state.labels = []
    await departamento.dash().then(response => {
      commit('setDashDepartamentos', response.data)
      state.todosDepartamentos = response.data.map(dept => {
        return { idDepartamento: dept.idDepartamento, nomeDepartamento: dept.nomeDepartamento }
      })
      response.data.forEach(depart => {
        state.labels.push(depart.nomeDepartamento)
        state.data.push(depart.custoDepartamento)
        state.load = true
      })
    })
  },
  async graficoDepartamentos ({ commit }) {
    await departamento.grafico().then(response => {
      commit('setGraficoDepartamentos', response.data)
    })
  }
}
export default dept
