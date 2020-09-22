import user from '../../services/usuario.js'
export default {
  salvar ({ commit }, usuario) {
    user.salvar(usuario)
  },
  alterar ({ commit }, usuario) {
    user.alterar(usuario).then(response => {
      if (response.status === 204) commit('limparUser')
    })
  },
  buscarPorId ({ commit }, id) {
    user.buscarPorId(id).then(response => {
      if (response.status === 200) {
        commit('setUsuario', response.data)
      }
    })
  },
  deletar ({ commit }, usuario) {
    user.deletarUser(usuario.id).then(response => {
      if (response.status === 204) {
        commit('removerItem', usuario)
      }
    })
  },
  filtroUser ({ commit }, tag) {
    user.filtro(tag).then(respose => {
      commit('setFiltroUsuario', respose.data)
    })
  }
}
