<template>
 <div class="row no-wrap q-pa-md">
        <div class="column items-center">
          <q-avatar size="72px">
            <q-icon name="fas fa-user-alt"/>
          </q-avatar>
          <div class="text-subtitle1 q-mt-md q-mb-xs">{{usuario}}</div>
          <div class="text-subtitle1 q-mb-xs">Administrador</div>
          <q-btn
            icon="fas fa-sign-out-alt"
            color="positive"
            label="Sair"
            size="sm"
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
      usuario: ''
    }
  },
  methods: {
    sair () {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    this.usuario = localStorage.getItem('userName')
  }
}
</script>

<style>

</style>
