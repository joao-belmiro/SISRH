<template>
    <expand-form @save="submit" @reset="reset" :title="title" :icon="icon" :value="true" >
        <div class="column">
              <q-input
          dense
          outlined
          color="secondary"
          v-model="usuario.login"
          label="Usuário"
          :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']">
            <template v-slot:prepend>
              <q-icon name="fa fa-user" />
            </template>
          </q-input>
             <q-input
            v-model="usuario.senha"
            label="Senha"
            dense
            outlined
            color="secondary"
            lazy-rules
            :type="pwd ? 'password' : 'text'"
            :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
          >
          <template v-slot:prepend>
              <q-icon name="fas fa-unlock" />
          </template>
            <template v-slot:append>
              <q-icon
                :name="pwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="pwd = !pwd"
              />
            </template>
          </q-input>
             <q-input
             ref="senha"
            class="q-pb-sm"
            v-model="repet"
            label="Confirme a Senha"
            dense
            outlined
            color="secondary"
            :type="isPwd ? 'password' : 'text'"
            :rules="[ val => val && val.length > 0 || 'Campo Obrigatório' , val => val === usuario.senha || 'Senhas Não batem']"
          >
            <template v-slot:prepend>
              <q-icon name="fas fa-unlock" />
          </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        <q-checkbox color="secondary" class="q-pb-sm" v-model="usuario.admin"  label="Administrador"/>
    </div>
    </expand-form>
</template>
<script>
import expandForm from '../../components/expand-form.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  components: { expandForm },
  data () {
    return {
      title: 'Novo usuário',
      icon: 'fas fa-user-plus',
      repet: '',
      isPwd: true,
      pwd: false,
      value: false
    }
  },
  computed: {
    ...mapState('usuario', ['usuario'])
  },
  methods: {
    ...mapActions('usuario', ['salvar', 'alterar']),
    ...mapMutations('usuario', ['limparUser']),
    submit () {
    },
    reset () {
      this.limparUser()
      this.repet = ''
      this.$refs.senha.resetValidation()
    }
  }
}
</script>

<style>

</style>
