
import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout.vue'
Vue.use(VueRouter)
const auth = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next()
  }
}

const routes = [
  {
    path: '',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/home',
    component: layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home.vue'),
        children: [
          {
            path: 'novo-colaborador',
            name: 'novoColaborador',
            component: () => import('../views/colaborador/colaborador-formulario.vue')
          },
          {
            path: ':idDepartamento/visualizar',
            name: 'visualizar',
            component: () => import('../views/departamento/departamento-visualizar.vue')
          },
          {
            path: ':idColaborador/alterar-colaborador',
            name: 'alterarColaborador',
            component: () => import('../views/colaborador/colaborador-formulario.vue')
          }
        ]
      },
      {
        path: 'colaborador',
        name: 'listarColaborador',
        component: () => import('../views/colaborador/colaborador-lista.vue'),
        children: [
          {
            path: 'novo-colaborador',
            component: () => import('../views/colaborador/colaborador-formulario.vue')
          },
          {
            path: ':idColaborador/alterar',
            name: 'AlterarColaborador',
            component: () => import('../views/colaborador/colaborador-formulario.vue')
          },
          {
            path: ':idColaborador/novo-endereco',
            name: 'novoEndereco',
            component: () => import('../views/endereco/endereco-formulario.vue')
          },
          {
            path: ':idColaborador/visualizar',
            component: () => import('../views/colaborador/colaborador-visualizar.vue')
          }]
      },
      {
        path: 'cargo',
        name: 'cargos',
        component: () => import('../views/cargo/cargos-lista.vue')
      },
      {
        path: 'departamento',
        name: 'departamento',
        component: () => import('../views/departamento/departamento-lista.vue')
      }
    ],
    beforeEnter: auth
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, anterior, next) => {
  if (to.name === 'login') {
    next()
  }
  if (to.name === 'home' && localStorage.getItem('token') !== undefined) next()
  if (to.name !== 'home' && to.name !== 'login') {
    next()
  }
})
export default router
