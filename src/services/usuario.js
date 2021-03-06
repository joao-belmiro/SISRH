import { http } from './config.js'
const user = {
  salvar: (usuario) => http.post('/usuario/criar', usuario),
  filtro: (tag) => http.get('/usuario/tag', { params: { tag: tag } }),
  alterar: (usuario) => http.post('/usuario/alterar', usuario),
  deletarUser: (id) => http.delete(`/usuario/deletar/${id}`),
  buscarPorId: (id) => http.get(`/usuario/buscar/${id}`)
}
export default user
