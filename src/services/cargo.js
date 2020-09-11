import { http } from './config.js'
const cargo = {
  salvar: cargo => http.post('/gerenciamento-cargo/salvar-cargo', cargo),
  alterar: cargo => http.put('/gerenciamento-cargo/alterar-cargo', cargo),
  buscarPorId: idCargo => http.get(`/gerenciamento-cargo/cargo-por-id/${idCargo}`),
  buscarTodos: () => http.get('/gerenciamento-cargo/todos-cargos'),
  buscarPorFiltro: tag => http.get('/gerenciamento-cargo/filtro', { params: { tag: tag } }),
  deletar: idCargo => http.delete(`/gerenciamento-cargo/deletar-cargo/${idCargo}`),
  dashCargo: () => http.get('/gerenciamento-cargo/pie-chart-data')

}
export default cargo
