<template>
  <expand-form :title="title"
  @save="submit"
  @reset="clear"
  :value="expand"
  :icon="icon">
    <div class="column">
    <q-input
      dense
      outlined
      v-model="cargo.nomeCargo"
      color="teal"
      label="Nome"
      :rules="[ val => val && val.length > 0 || 'Este Campo não pode ser Vazio']"/>
    <q-input
      dense
      outlined
      v-model="cargo.descricaoCargo"
      color="teal"
      autogrow
      label="Descriçao"
      :rules="[ val => val && val.length > 0 || 'Este Campo não pode ser Vazio']"/>
    </div>
  </expand-form>
</template>
<script>
import expandForm from '../../components/expand-form.vue'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  components: { expandForm },
  data () {
    return {
      expand: true,
      title: 'Novo Cargo',
      icon: 'fa fa-briefcase'
    }
  },
  watch: {
    getId (atual, anterior) {
      if (atual !== null) {
        this.title = 'Alterando Cargo'
        this.icon = 'create'
      } else {
        this.title = 'Novo Cargo'
        this.icon = 'fa fa-briefcase'
      }
    }
  },
  computed: {
    ...mapState('cargo', ['cargo']),
    getId () {
      return this.cargo.idCargo
    }
  },
  methods: {
    ...mapActions('cargo', ['salvarCargo', 'alterarCargo']),
    ...mapMutations('cargo', ['limparCargo']),
    submit () {
      if (this.cargo.idCargo === null) {
        this.salvarCargo(this.cargo)
      } else {
        this.alterarCargo(this.cargo)
      }
    },
    clear () {
      this.limparCargo(true)
      if (this.cargo.idCargo !== null) {
        console.log('foi')
        this.title = 'Novo Cargo'
        this.icon = 'fa fa-briefcase'
      }
    }
  }
}
</script>

<style>
</style>
