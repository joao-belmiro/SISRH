<template>
<div>
  <q-card flat bordered class="absolute-center card-container">
    <q-card-section>
      <div class="text-h6">Insira suas Credenciais</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit="login">
        <div class="column q-gutter-md jutify-evenly">
          <q-input
          class="q-pb-sm"
          dense
          outlined
          color="secondary"
          v-model="user"
          label="Usuário"
          :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']">
            <template v-slot:append>
              <q-icon name="fa fa-user" />
            </template>
          </q-input>
          <q-input
            class="q-pb-sm"
            v-model="password"
            color="secondary"
            label="Senha"
            dense
            outlined
            :type="isPwd ? 'password' : 'text'"
            :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn
            class="text-bold"
            type="submit"
            icon="fa fa-sign-in-alt"
            color="positive"
            text-color="white"
            label="Login"
            no-caps
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
  <div class="absolute-bottom-right q-pa-lg">
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
</div>
</template>
<script>
import { http } from '../services/config.js'
export default {
  data () {
    return {
      user: '',
      isPwd: true,
      password: ''
    }
  },
  methods: {
    login () {
      http
        .post('/usuario/autenticar', { login: this.user, senha: this.password })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userName', response.data.login)
            response.data.adm ? localStorage.setItem('adm', 'Administrador') : localStorage.setItem('adm', 'Usuário')
            this.$router.push({ path: '/home' })
          }
        })
    }
  }
}
</script>

<style >
.card-container {
  width: 100%;
  max-width: 400px !important;
  height: 100%;
  max-height: 500px;
}
</style>
