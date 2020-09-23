<template>
 <div class="row no-wrap q-pa-md">
        <div class="column items-center">
          <q-avatar size="72px">
            <q-icon name="fas fa-user-alt"/>
          </q-avatar>
          <div class="text-subtitle1 q-mt-md q-mb-xs">{{usuario}}</div>
          <div class="text-subtitle1 q-mb-xs">{{perfil}}</div>
          <q-btn
            icon="fas fa-sign-out-alt"
            color="positive"
            label="Sair"
            size="md"
            v-close-popup
            @click="sair"
          />
        </div>
      </div>
</template>

<script>
export default {
  data () {
    return {
      usuario: '',
      perfil: ''
    }
  },
  methods: {
    sair () {
      localStorage.removeItem('userName')
      localStorage.removeItem('token')
      localStorage.removeItem('adm')
      this.$store.replaceState({
        cargo: {
          cargo: {
            idCargo: null,
            nomeCargo: '',
            descricaoCargo: ''
          },
          filtroCargos: [],
          todosCargos: [],
          cargoLabels: [],
          cargoData: [],
          loadCargo: false
        },
        colaborador: {
          endereco: {
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
          colaboradorVisualizar: {
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
            endereco: {
              cep: '',
              numero: '',
              complemento: ''
            }
          },
          colaboradoresCargo: [],
          colaboradoresDept: []
        },
        depart: {
          departamento: {
            idDepartamento: null,
            nomeDepartamento: '',
            descricao: ''
          },
          filtroDepartamentos: [],
          todosDepartamentos: [],
          graficoDepartamentos: [],
          dashDepartamentos: [],
          departamentoVisualizar: {
            idDepartamento: null,
            nomeDepartamento: '',
            descricao: ''
          },
          data: [],
          labels: [],
          load: false
        },
        usuario: {
          usuario: {
            id: null,
            login: '',
            senha: '',
            admin: false
          },
          filtroUsuarios: []
        }
      })
      console.log(this.$store)
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    this.perfil = localStorage.getItem('adm')
    this.usuario = localStorage.getItem('userName')
  }
}
</script>

<style>

</style>
