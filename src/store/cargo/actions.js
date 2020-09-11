import cargoService from '../../services/cargo.js'
import router from '../../router'
export default {
  async salvarCargo ({ commit, dispatch }, cargo) {
    await cargoService.salvar(cargo).then(response => {
      if (response.status === 201) {
        commit('limparCargo', true)
        if (router.currentRoute.name === 'home') dispatch('dashCargo')
      }
    }).catch(erro => { console.error(erro) })
  },
  alterarCargo ({ commit }, cargo) {
    cargoService.alterar(cargo).then(response => {
      if (response.status === 204) {
        commit('limparCargo', true)
      }
    }).catch(erro => { console.error(erro) })
  },
  todosCargos ({ commit }) {
    cargoService.buscarTodos().then(response => {
      commit('setTodosCargos', response.data)
    })
  },
  filtroCargo ({ commit }, tag) {
    cargoService.buscarPorFiltro(tag).then(response => {
      commit('setFiltroCargo', response.data)
    })
  },
  buscarPorId (idCargo) {
    cargoService.buscarPorId(idCargo).then(response => {
      console.log(response.data)
    }).catch(erro => {
      console.error(erro)
    })
  },
  deletar ({ commit }, idCargo) {
    cargoService.deletar(idCargo).then(response => {
      if (response.status === 204) {
        commit('removerCargo', idCargo)
      }
    }).catch(erro => {
      console.error(erro)
    })
  },
  async dashCargo ({ state }) {
    if (state.loadCargo) state.loadCargo = false
    if (state.cargoData.length !== 0) state.cargoData = []
    if (state.cargoLabels.length !== 0) state.cargoLabels = []
    await cargoService.dashCargo().then(response => {
      response.data.forEach(cargo => {
        state.cargoData.push(cargo.ncargos)
        state.cargoLabels.push(cargo.nomeCargo)
        state.loadCargo = true
      })
    })
  }
}
