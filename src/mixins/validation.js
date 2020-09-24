export default {
  methods: {
    validarCpf (cpf) {
      let soma
      let resto
      soma = 0
      if (cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' ||
       cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' ||
       cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') {
        return false
      }
      for (let index = 1; index <= 9; index++) {
        soma = soma + parseInt(cpf.substring(index - 1, index)) * (11 - index)
      }
      resto = (soma * 10) % 11
      if (resto === 10 || resto === 11) resto = 0
      if (resto !== parseInt(cpf.substring(9, 10))) return false
      soma = 0
      for (let index = 1; index <= 10; index++) {
        soma = soma + parseInt(cpf.substring(index - 1, index)) * (11 - index)
      }
      if (resto === 10 || resto === 11) resto = 0
      if (resto !== parseInt(cpf.substring(10, 11))) {
        return false
      } else {
        return true
      }
    }
  }
}
