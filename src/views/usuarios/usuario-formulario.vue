<template>
  <expand-form @save="submit" @reset="resetForm" :title="title" :icon="icon" :value="true">
    <div class="column">
      <q-input
        dense
        outlined
        color="secondary"
        v-model="usuario.login"
        label="Usuário"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      >
        <template v-slot:prepend>
          <q-icon name="fa fa-user" />
        </template>
      </q-input>
        <q-input
        v-if="showSenha"
        v-model="senhaAntiga"
        label="Senha Atual"
        dense
        outlined
        color="secondary"
        lazy-rules
        :type="pwd ? 'password' : 'text'"
        :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-key" />
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
        v-model="senha"
        :label="labelSenha"
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
        :label="labelConfirma"
        dense
        outlined
        color="secondary"
        lazy-rules
        :type="isPwd ? 'password' : 'text'"
        :rules="[val => val === senha || 'Senhas Não batem']"
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
      <q-checkbox color="secondary" class="q-pb-sm" v-model="usuario.admin" label="Administrador" />
    </div>
  </expand-form>
</template>
<script>
import expandForm from '../../components/expand-form.vue'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  components: { expandForm },
  data () {
    return {
      title: 'Novo Usuário',
      icon: 'fas fa-user-plus',
      senha: '',
      repet: '',
      isPwd: true,
      pwd: true,
      value: false,
      senhaAntiga: '',
      labelSenha: 'Senha',
      labelConfirma: 'Confirmar Senha',
      showSenha: false
    }
  },
  computed: {
    ...mapState('usuario', ['usuario']),
    ...mapGetters('usuario', ['getIdUsuario'])
  },
  watch: {
    getIdUsuario (atual, anterior) {
      if (atual) {
        this.preparaAlterar()
      } else {
        this.resetForm()
      }
    }
  },
  methods: {
    ...mapActions('usuario', ['salvar', 'alterar']),
    ...mapMutations('usuario', ['limparUser']),
    submit () {
      if (this.usuario.id === null && !this.$refs.senha.hasErro) {
        this.usuario.senha = this.senha
        this.salvar(this.usuario)
      }
      if (this.usuario.id && !this.$refs.senha.hasErro) {
        this.usuario.novaSenha = this.senha
        this.usuario.senha = this.senhaAntiga
        this.alterar(this.usuario)
      }
    },
    preparaAlterar () {
      this.title = 'Alterando Usuário'
      this.icon = 'create'
      this.showSenha = true
      this.labelSenha = 'Nova Senha'
      this.labelConfirma = 'Confirme Nova Senha'
    },
    resetForm () {
      this.title = 'Novo Usuário'
      this.icon = 'fas fa-user-plus'
      this.labelSenha = 'Senha'
      this.labelConfirma = 'Confirmar Senha'
      this.showSenha = false
      this.limparUser()
      this.repet = ''
      this.senha = ''
      this.senhaAntiga = ''
      this.$refs.senha.resetValidation()
    }
  }
}
</script>

<style>
</style>
