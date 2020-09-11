import { http } from './config.js'
export default {
  salvar: (endereco) => http.post('/gerenciamento-endereco/salvar-endereco', endereco),
  alterar: (endereco) => http.put('/gerenciamento-endereco/alterar-endereco', endereco),
  buscarPorId: (idEndereco) => http.get(`/gerenciamento-endereco/endereco-id${idEndereco}`),
  excluir: (idEndereco) => http.delete(`/gerenciamento-endereco/deletar-endereco${idEndereco}`)
}
