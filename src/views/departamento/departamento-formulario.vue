<template>
  <expand-form
  @save="submit"
  @reset="limparDept(true)"
  :title="title"
  :value="expand"
  :icon="icon">
    <div class="column">
      <q-input
        dense
        outlined
        v-model="departamento.nomeDepartamento"
        color="teal"
        label="Nome"
        :rules="[ val => val && val.length > 0 || 'Este Campo não pode ser Vazio']"
      />
      <q-input
        dense
        outlined
        v-model="departamento.descricao"
        color="teal"
        autogrow
        label="Descriçao"
        :rules="[ val => val && val.length > 0 || 'Este Campo não pode ser Vazio']"
      />
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
      expand: true,
      title: 'Novo Departamento',
      icon: 'group_add'
    }
  },
  watch: {
    getIdDept (atual, anterior) {
      if (atual !== null) {
        this.title = 'Alterando Departamento'
        this.icon = 'create'
      } else {
        this.title = 'Novo Departamento'
        this.icon = 'group_add'
      }
    }
  },
  computed: {
    ...mapState('depart', ['departamento']),
    getIdDept () {
      return this.departamento.idDepartamento
    }
  },
  methods: {
    ...mapMutations('depart', ['limparDept', 'tableUpdate']),
    ...mapActions('depart', ['salvarDept', 'alterarDept']),
    submit () {
      if (this.departamento.idDepartamento === null) {
        this.salvarDept(this.departamento)
      } else {
        this.alterarDept(this.departamento)
      }
    }
  },
  mounted () {
    if (this.departamento.idDepartamento !== null) { this.tableUpdate(this.departamento) }
  }
}
</script>

<style>
</style>
