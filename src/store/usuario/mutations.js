export default {
  setUsuario (state, user) {
    state.usuario = user
  },
  setFiltroUsuario (state, filtro) {
    state.filtroUsuarios = filtro
  },
  removerItem (state, user) {
    state.filtroUsuarios = state.filtroUsuarios.filter(u => u.id !== user.id)
  },
  limparUser (state, payload) {
    delete state.usuario.id
    state.usuario.login = ''
    state.usuario.senha = ''
    state.usuario.admin = false
  }
}
