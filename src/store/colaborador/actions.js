import colaborador from '../../services/colaborador.js'
import endereco from '../../services/endereco.js'
import router from '../../router'

const converter = (colabs) => {
  return colabs.map(c => {
    return {
      idColaborador: c.idColaborador,
      nomeColaborador: c.nomeColaborador,
      salario: c.salario,
      dataContratacao: c.dataContratacao,
      telefone: c.telefone,
      cpfCnpj: c.cpfCnpj,
      email: c.email,
      idCargo: c.cargo.idCargo,
      nomeCargo: c.cargo.nomeCargo,
      idDepartamento: c.departamento.idDepartamento,
      nomeDepartamento: c.departamento.nomeDepartamento
    }
  })
}

const atualizaDash = ({ dispatch }, routeName) => {
  if (routeName === 'home' || routeName === 'visualizar') {
    dispatch('depart/dashDepartamentos', true, { root: true })
  }
}

export default {
  async salvarColab ({ dispatch, commit }, colab) {
    await colaborador.salvar(colab).then(response => {
      if (response.status === 201) {
        commit('limparColaborador', true)
        atualizaDash({ dispatch }, router.currentRoute.name)
      }
    })
  },
  async alterarColab ({ commit }, colab) {
    await colaborador.alterar(colab).then(response => {
    }).catch(erro => { console.error(erro) })
  },
  filtro ({ commit }, tag) {
    colaborador.buscarPorFiltro(tag).then(response => {
      if (response.status === 200) commit('setFiltro', response.data)
    })
  },
  async colabsDepartameto ({ commit }, idDepartamento) {
    await colaborador.buscarPorDepartamento(idDepartamento).then(response => {
      const colabs = converter(response.data)
      commit('setColaboradorDept', colabs)
    })
  },
  async buscarPorId ({ commit }, idColaborador) {
    await colaborador.buscarPorId(idColaborador).then(response => {
      commit('setColaboradorVizualizar', response.data)
    }).catch(erro => { console.error(erro) })
  },
  async novosColabs ({ commit }) {
    await colaborador.novosColabs().then(response => {
      const colabs = converter(response.data)
      commit('setDashColaboradores', colabs)
    })
  },
  async deletarColaborador ({ dispatch, commit }, colab) {
    await colaborador.deletar(colab.idColaborador).then(response => {
      if (response.status === 204) {
        if (router.currentRoute.name === 'listarColaborador') commit('removerColaborador', colab.idColaborador)
        if (router.currentRoute.name === 'visualizar') commit('removerColaboradorDept', colab.idColaborador)
        if (router.currentRoute.name === 'home') {
          commit('removerDashColaborador', colab.idColaborador)
          atualizaDash({ dispatch }, router.currentRoute.name)
        }
      }
    })
  },
  async salvarEndereco ({ commit }, ende) {
    await endereco.salvar(ende).then(response => {
      commit('setEndercoColab', response.data)
    })
  },
  async alterarEndereco ({ commit }, ende) {
    await endereco.alterar(ende).then(response => {
    })
  },
  async deletarEndereco ({ commit }, ende) {
    await endereco.excluir(ende.idEndereco).then(response => {
      if (response.status === 204) commit('deletar de algum lugar', response.data)
    })
  },
  async buscarEndereco ({ commit }, idEndereco) {
    await endereco.buscarPorId(idEndereco).then(response => {
      commit('setEndereco', response.data)
    })
  }
}
