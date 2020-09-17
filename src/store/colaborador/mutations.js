export default {
  setFiltro (state, payload) {
    state.filtroColaboradores = payload
  },
  setDashColaboradores (state, payload) {
    state.dashColaboradores = payload
  },
  setColaboradorCargo (state, payload) {
    state.colaboradoresCargo = payload
  },
  setColaboradorDept (state, payload) {
    state.colaboradoresDept = payload
  },
  limparColaborador (state, payload) {
    state.colaborador.idColaborador = null
    state.colaborador.nomeColaborador = ''
    state.colaborador.cpfCnpj = ''
    state.colaborador.salario = null
    state.colaborador.dataContratacao = ''
    state.colaborador.telefone = ''
    state.colaborador.email = ''
    state.colaborador.departamento.idDepartamento = null
    state.colaborador.cargo.idCargo = null
  },
  setColaborador (state, payload) {
    state.colaborador.idColaborador = payload.idColaborador
    state.colaborador.nomeColaborador = payload.nomeColaborador
    state.colaborador.cpfCnpj = payload.cpfCnpj
    state.colaborador.salario = payload.salario
    state.colaborador.dataContratacao = payload.dataContratacao
    state.colaborador.telefone = payload.telefone
    state.colaborador.email = payload.email
    state.colaborador.departamento.idDepartamento = payload.idDepartamento
    state.colaborador.cargo.idCargo = payload.idCargo
  },
  setColaboradorVizualizar (state, colab) {
    state.colaboradorVisualizar = colab
  },
  removerColaborador (state, idColab) {
    state.filtroColaboradores = state.filtroColaboradores.filter(colab => colab.idColaborador !== idColab)
  },
  removerDashColaborador (state, idColab) {
    state.dashColaboradores = state.dashColaboradores.filter(colab => colab.idColaborador !== idColab)
  },
  removerColaboradorDept (state, idColab) {
    state.colaboradoresDept = state.colaboradoresDept.filter(colab => colab.idColaborador !== idColab)
  },
  setEndercoColab (state, endereco) {

  }
}
