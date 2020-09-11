import { http } from './config.js'
const departamento = {
  salvar: departamento => http.post('/gerenciamento-departamento/salvar-departamento', departamento),
  alterar: departamento => http.put('/gerenciamento-departamento/alterar-departamento', departamento),
  buscarPorId: idDepartamento => http.get(`/gerenciamento-departamento/buscar-por-id/${idDepartamento}`),
  buscarTodos: () => http.get('/gerenciamento-departamento/todos'),
  buscarPorFiltro: tag => http.get('/gerenciamento-departamento/buscar-por-tag', { params: { tag: tag } }),
  deletar: idDepartamento => http.delete(`/gerenciamento-departamento/deletar-departamento/${idDepartamento}`),
  dash: () => http.get('/gerenciamento-departamento/popular-dash'),
  grafico: () => http.get('/gerenciamento-departamento/grafico-departamento')

}
export default departamento
