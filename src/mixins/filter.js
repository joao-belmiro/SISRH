const filter = {
  data () {
    return {
      arrayCargos: [],
      arrayDepartamentos: []
    }
  },
  methods: {
    filterDepartamento (val, update) {
      if (val === '') {
        update(() => {
          this.arrayDepartamentos = this.$store.state.depart.todosDepartamentos
        })
      }
      update(() => {
        const needle = val.toLowerCase()
        this.arrayDepartamentos = this.$store.state.depart.todosDepartamentos.filter(
          v => v.nomeDepartamento.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterCargo (val, update) {
      if (val === '') {
        update(() => {
          this.arrayCargos = this.$store.state.cargo.todosCargos
        })
      }
      update(() => {
        const needle = val.toLowerCase()
        this.arrayCargos = this.$store.state.cargo.todosCargos.filter(
          v => v.nomeCargo.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
export default filter
