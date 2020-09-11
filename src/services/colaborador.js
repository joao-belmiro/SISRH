import { http } from './config.js'

const colaborador = {
  salvar: colaborador => http.post('/gerenciamento-colaborador/salvar-colaborador', colaborador),
  alterar: colaborador => http.put('/gerenciamento-colaborador/alterar-colaborador', colaborador),
  buscarPorId: idColaborador => http.get(`/gerenciamento-colaborador/${idColaborador}`),
  buscarTodos: () => http.get('/gerenciamento-colaborador/buscar-todos'),
  buscarPorFiltro: tag => http.get('/gerenciamento-colaborador/buscar-por-tag', { params: { tag: tag } }),
  deletar: idColaborador => http.delete(`/gerenciamento-colaborador/deletar/${idColaborador}`),
  novosColabs: () => http.get('gerenciamento-colaborador/novos-colabs'),
  buscarPorDepartamento: (idDepartamento) => http.get('gerenciamento-colaborador/colaboradores-departamento', { params: { idDepartamento: idDepartamento } })
}
export default colaborador
