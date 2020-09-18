import axios from 'axios'
import { notify } from '../mixins/quasar-plugins.js'
export const http = axios.create({
  baseURL: 'http://localhost:8082'
})
export const viaCep = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
})
http.interceptors.request.use(request => {
  request.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return request
})
http.interceptors.response.use((response) => {
  if (response.status === 201 || response.status === 204) {
    notify('Operação Realizada com sucesso', 'positive', 'check')
  }
  if (response.config.method === 'get' && response.data.length === 0) notify('Não Foram Encontrados Registros para os Dados de Entrada', 'warning', 'priority_high')
  return response
}, (erro) => {
  if (erro.response.status === 500) notify(erro.response.data.message, 'negative', 'warning')
  if (erro.response.status === 401) notify(erro.response.data.message, 'negative', 'warning')
  if (erro.response.status === 403) notify(erro.response.data.message, 'negative', 'warning')
  if (erro.response.status === 404) notify('O servidor Não pode Encontrar o Recurso Solicitado', 'negative', 'warning')
  return Promise.reject(erro)
})
