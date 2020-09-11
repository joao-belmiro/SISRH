<template>
  <q-card flat bordered class="absolute-center card-container">
  <q-card-section>
      <div class="text-h6">Insira suas Credenciais</div>
  </q-card-section>
  <q-card-section>
    <div class="column q-gutter-md jutify-evenly">
        <q-input dense outlined v-model="text" label="Usuário" >
        <template v-slot:append>
          <q-icon name="fa fa-user" />
       </template>
        </q-input>
        <q-input v-model="password" label="Senha" dense outlined :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
        <q-btn class="text-bold" icon="fa fa-sign-in-alt" color="positive" text-color="white" label="Login"  to="home" no-caps/>
    </div>
  </q-card-section>
  </q-card>
</template>
<script>
export default {
  data () {
    return {
      text: '',
      isPwd: true,
      password: ''
    }
  }
}
</script>

<style >
.card-container {
    width: 100%;
    max-width: 400px !important;
    height: 100%;
    max-height: 300px;
}
</style>
