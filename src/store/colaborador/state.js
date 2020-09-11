export default {
  endereco: {
    idEndereco: null,
    cep: '',
    numero: '',
    complemento: '',
    colaborador: {
      idColaborador: null
    }
  },
  dashColaboradores: [],
  filtroColaboradores: [],
  colaborador: {
    idColaborador: null,
    nomeColaborador: '',
    cpfCnpj: '',
    salario: null,
    dataContratacao: '',
    telefone: '',
    email: '',
    departamento: {
      idDepartamento: null
    },
    cargo: {
      idCargo: null
    }
  },
  colaboradorVizualizar: {
    idColaborador: null,
    nomeColaborador: '',
    cpfCnpj: '',
    salario: 0,
    dataContratacao: '',
    telefone: '',
    email: '',
    departamento: {
      idDepartamento: null
    },
    cargo: {
      idCargo: null
    },
    enderecos: []
  },
  colaboradoresCargo: [],
  colaboradoresDept: []
}
