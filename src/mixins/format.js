export default {
  methods: {
    formatCurrency (salario) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(salario)
    },
    formatCpf (cpf) {
      cpf = cpf.replace(/\D/g, '')
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
      cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      return cpf
    },
    formatData (data) {
      return new Intl.DateTimeFormat('pt-BR').format(data)
    },
    formatCep (cep) {
      cep = cep.replace(/\D/g, '')
      cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
      return cep
    },
    formatPhone (cel) {
      cel = cel.replace(/\D/g, '')
      cel = cel.replace(/(\d{0})(\d)/, '$1($2')
      cel = cel.replace(/(\d{2})(\d)/, '$1) $2')
      cel = cel.replace(/(\d{5})(\d)/, '$1-$2')
      return cel
    }
  }
}
