<template>
  <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-black">
      <q-toolbar class="row">
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        <q-toolbar-title>
          <router-link class="float-left" to="/home" tag="div" style="cursor: pointer;"><div class="ellipsis">{{name}}</div></router-link>
        </q-toolbar-title>
        <q-btn-dropdown flat dense icon="fa fa-user" color="white" size="10px">
          <user-menu/>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <left-menu />
      <div class="fixed-bottom-left q-pa-md">
      <a href="https://github.com/joao-belmiro" target="#">
          <q-icon color="black" name="fab fa-github" size="1.8em">
            <q-tooltip>
              <div class="text-body2">
              Repositório do Autor
              </div>
            </q-tooltip>
          </q-icon>
          </a>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
    <q-footer class="bg-grey-3">
      <q-toolbar style="max-height: 50px">
        <q-toolbar-title>
          <div>
            <div class="text-center text-grey-7 desktop-only">
              <q-icon name="fa fa-copyright"  color="grey-7" size="0.7em"/>
              <small>{{' Todos Direitos Reservados'}}</small>
              <div class="float-right text-grey-7">
                <small>{{ '0.3.0' }}</small>
              </div>
            </div>
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
import leftMenu from '../components/left-menu.vue'
import userMenu from '../components/user-menu.vue'
export default {
  name: 'layout',
  components: { leftMenu, userMenu },
  data () {
    return {
      name: 'Sistema para Gerência de Colaboradores',
      drawer: false
    }
  }
}
</script>
<style scoped>
</style>
