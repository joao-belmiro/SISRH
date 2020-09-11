export default {
  setFiltroCargo (state, cargos) {
    state.filtroCargos = cargos
  },
  setTodosCargos (state, todosCargos) {
    state.todosCargos = todosCargos
  },
  setGraficoCargo (state, dadosGrafico) {
    state.graficoCargos = dadosGrafico
  },
  removerCargo (state, idCargo) {
    state.filtroCargos = state.filtroCargos.filter(cargo => cargo.idCargo !== idCargo)
  },
  setCargo (state, cargo) {
    state.cargo.idCargo = cargo.idCargo
    state.cargo.nomeCargo = cargo.nomeCargo
    state.cargo.descricaoCargo = cargo.descricaoCargo
  },
  limparCargo (state, payload) {
    state.cargo.idCargo = null
    state.cargo.nomeCargo = ''
    state.cargo.descricaoCargo = ''
  },
  setLoadCargo (state, value) {
    state.loadCargo = value
  }
}
