export default {
  setUsuario (state, user) {
    state.usuario.id = user.id
    state.usuario.login = user.login
    state.usuario.admin = user.admin
  },
  setFiltroUsuario (state, filtro) {
    state.filtroUsuarios = filtro
  },
  removerItem (state, user) {
    state.filtroUsuarios = state.filtroUsuarios.filter(u => u.id !== user.id)
  },
  limparUser (state, payload) {
    delete state.usuario.novaSenha
    state.usuario.id = null
    state.usuario.login = ''
    state.usuario.senha = ''
    state.usuario.admin = false
  }
}
