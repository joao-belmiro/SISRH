<template>
 <div class="row no-wrap q-pa-md">
        <div class="column items-center">
          <q-avatar size="72px">
            <q-icon name="fas fa-user-alt"/>
          </q-avatar>
          <div class="text-subtitle1 q-mt-md q-mb-xs">{{usuario}}</div>
          <div class="text-subtitle1 q-mb-xs">{{perfil}}</div>
          <q-btn
            icon="fas fa-sign-out-alt"
            color="positive"
            label="Sair"
            size="md"
            v-close-popup
            @click="sair"
          />
        </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      usuario: '',
      perfil: ''
    }
  },
  methods: {
    sair () {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')
      localStorage.removeItem('adm')
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    this.perfil = localStorage.getItem('adm')
    this.usuario = localStorage.getItem('userName')
  }
}
</script>

<style>

</style>
