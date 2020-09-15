<template>
  <div>
    <div class="row items-center q-pa-md">
      <q-breadcrumbs active-color="teal">
        <q-breadcrumbs-el icon="home" label="Home" to="/" />
        <q-breadcrumbs-el label="Pesquisa" icon="search" to="/funcionario" />
      </q-breadcrumbs>
    </div>
    <q-form @submit="filtroDepartamento(tag)">
      <div class="row justify-center no-wrap q-px-md">
        <div class="col-sm-6 col-md-6 col-xs-10">
          <q-input
          class="q-pb-none"
            dense
            square
            outlined
            v-model="tag"
            color="secondary"
            label="Digite o Nome do Departamento"
            :rules="[ val => val && val.length > 0 || 'Este Campo não pode ser Vazio']"
          >
          </q-input>
        </div>
          <q-btn class="border-buttom" size="17px" outline color="grey-5" type="submit" dense icon="search" />
      </div>
    </q-form>
      <div class="q-px-md q-pt-md">
      <departamento-form />
    </div>
    <div class="q-pa-md">
      <q-table
        flat
        bordered
        dense
        separator="cell"
        title="Cargos Cadastrados"
        :data="getFiltroDepartamentos"
        :columns="columns"
        :filter="filter"
        row-key="idDepartamento"
      >
        <template v-slot:top>
          <p class="text-h6 no-margin">Departamentos Cadastrados</p>
          <q-space />
          <div class="col-sm-3 col-md-3 col-xs-12">
            <q-input
              borderless
              color="teal"
              dense
              debounce="400"
              v-model="filter"
              label="Busca Rápida"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <q-td slot="body-cell-opcoes" slot-scope="props" :props="props">
          <q-btn
            size="11px"
            icon="create"
            dense
            color="primary"
            round
            class
            flat
            @click="setDept(props.row)"
          >
            <q-tooltip content-style="font-size: 14px">Alterar</q-tooltip>
          </q-btn>
          <q-btn
            size="11px"
            icon="fas fa-trash-alt"
            round
            dense
            color="negative"
            flat
          >
            <q-popup-proxy square transition-show="flip-up" transition-hide="flip-down">
              <q-banner inline-actions class="bg-grey-2 text-white">
                  <div class="text-subtitle2 text-black">{{ `Deseja Excluir: ${props.row.nomeDepartamento}?`}}</div>
                  <template v-slot:action>
                  <q-btn @click="deletarDept(props.row.idDepartamento)" flat size="13px" icon="fa fa-trash-alt" color="negative" label="Excluir" dense no-caps/>
                  </template>
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </q-td>
      </q-table>
    </div>
  </div>
</template>
<script>
import departamentoForm from './departamento-formulario.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: { departamentoForm },
  data () {
    return {
      tag: '',
      filter: '',
      columns: [
        {
          name: 'idDepartamento',
          required: true,
          label: 'Código',
          align: 'left',
          field: 'idDepartamento',
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: 'nomeDepartamento',
          align: 'left',
          label: 'Nome',
          field: 'nomeDepartamento',
          sortable: true
        },
        {
          name: 'descricao',
          align: 'left',
          label: 'Descrição',
          field: 'descricao',
          sortable: true
        },
        { name: 'opcoes', label: 'Opções', align: 'center' }
      ]
    }
  },
  computed: {
    ...mapGetters('depart', ['getFiltroDepartamentos'])
  },
  methods: {
    ...mapActions('depart', ['filtroDepartamento', 'deletarDept']),
    ...mapMutations('depart', ['setDept'])
  }
}
</script>

<style scoped>
</style>
