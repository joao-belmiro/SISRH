export default {
  setTodosDepartamentos (state, departamentos) {
    state.todosDepartamentos = departamentos
  },
  setFiltroDepartamentos (state, departamentos) {
    state.filtroDepartamentos = departamentos
  },
  setGraficoDepartamentos (state, dadosGrafico) {
    state.graficoDepartamentos = dadosGrafico
  },
  setDashDepartamentos (state, dadosDash) {
    state.dashDepartamentos = dadosDash
  },
  removerDepartamento (state, idDepartamento) {
    state.filtroDepartamentos = state.filtroDepartamentos.filter(dept => dept.idDepartamento !== idDepartamento)
  },
  limparDept (state, payload) {
    state.departamento.idDepartamento = null
    state.departamento.nomeDepartamento = ''
    state.departamento.descricao = ''
  },
  setDept (state, payload) {
    state.departamento.idDepartamento = payload.idDepartamento
    state.departamento.nomeDepartamento = payload.nomeDepartamento
    state.departamento.descricao = payload.descricao
  },
  tableUpdate (state, depart) {
    state.filtroDepartamentos = state.filtroDepartamentos.filter(dept => dept.idDepartamento !== depart.idDepartamento)
    state.filtroDepartamentos.unshift(depart)
    this.$store.commit.depart.limparDept(true)
  },
  setDeptVisu (state, payload) {
    state.departamentoVisualizar.idDepartamento = payload.idDepartamento
    state.departamentoVisualizar.nomeDepartamento = payload.nomeDepartamento
    state.departamentoVisualizar.descricao = payload.descricao
  }
}
