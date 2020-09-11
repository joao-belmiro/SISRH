<template>
  <div>
    <div class="row items-start justify-between q-pa-md no-wrap">
      <q-breadcrumbs active-color="teal">
        <q-breadcrumbs-el icon="home" label="Home" to="/" />
        <q-breadcrumbs-el label="Pesquisa" icon="search" to="/colaborador" />
      </q-breadcrumbs>
      <q-btn
        flat
        class="no-padding text-bold"
        color="grey-7"
        icon="add"
        label="Novo Colaborador"
        to="colaborador/novo-colaborador"
        no-caps
      />
    </div>
    <q-form @submit="filtro(tag)">
      <div class="row items-center justify-center no-wrap q-px-md">
        <div class="col-sm-6 col-md-6 col-xs-10">
          <q-input
            class="q-pb-none"
            dense
            square
            outlined
            v-model="tag"
            color="secondary"
            label="Digite o Nome, Cargo ou Departamento do Colaborador"
            :rules="[ val => val && val.length > 0 || 'Este Campo não pode ser Vazio']"
          />
        </div>
        <q-btn
          class="border-buttom"
          size="17.5px"
          color="grey-5"
          outline
          type="submit"
          dense
          icon="search"
        />
      </div>
    </q-form>
    <br />
    <div class="q-pa-md">
      <q-table
        square
        flat
        class="no-padding"
        bordered
        dense
        title="Treats"
        :data="getFiltroColaboradores"
        :columns="columns"
        :filter="filter"
        grid
        row-key="idColaborador"
      >
        <template v-slot:top>
          <p class="text-h6 no-margin">Colaboradores Cadastrados</p>
          <q-space />
          <div class="col-sm-3 col-md-3 col-xs-12 q-px-none">
            <q-input color="teal" dense debounce="400" v-model="filter" label="Busca Rápida">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </template>
        <template v-slot:item="props">
          <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 q-pa-sm grid-style-transition">
            <q-card flat bordered>
              <q-card-section class="row items-center" style="padding: 9px 16px 9px 16px;">
                <label>{{props.row.nomeColaborador.toUpperCase()}}</label>
                <q-space />
                <q-btn flat rounded dense icon="more_vert" color="grey-7" size="11px">
                  <q-menu>
                    <q-list>
                      <q-item clickable v-close-popup @click="alterar(props.row)">
                        <q-item-section avatar>
                          <q-icon class="q-pr-none" name="create" color="primary" size="15px" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Alterar</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section avatar>
                          <q-icon
                            class="q-pr-none"
                            name="fa fa-trash-alt"
                            color="negative"
                            size="15px"
                          />
                        </q-item-section>
                        <q-popup-proxy square transition-show="flip-up" transition-hide="flip-down">
                          <q-banner class="bg-grey-2 text-white row items-start no-wrap">
                            <div class="row items-center no-wrap q-gutter-sm">
                              <div
                                class="text-subtitle2 text-black"
                              >{{ `Deseja Excluir: ${props.row.nomeColaborador}?`}}</div>
                              <q-btn
                                flat
                                size="13px"
                                icon="fa fa-trash-alt"
                                color="negative"
                                label="Excluir"
                                dense
                                no-caps
                                @click="deletarColaborador(props.row)"
                              />
                            </div>
                          </q-banner>
                        </q-popup-proxy>
                        <q-item-section>
                          <q-item-label>Excluir</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup @click="visualizar(props.row)">
                        <q-item-section avatar>
                          <q-icon class="q-pr-none" name="fa fa-eye" color="primary" size="15px" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Visualizar</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item
                        clickable
                        v-close-popup
                        :to="`colaborador/${props.row.idColaborador}/novo-endereco`"
                      >
                        <q-item-section avatar>
                          <q-icon class="q-pr-none" name="home" color="primary" size="18px" />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>Novo Enderço</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-card-section>
              <q-separator />
              <q-list dense>
                <q-item
                  v-for="col in props.cols.filter(col => col.nomeColaborador !== 'nomeColaborador')"
                  :key="col.nomeColaborador"
                >
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label caption>
                      {{ col.name === 'cpfCnpj' ? formatCpf(col.value) : col.name === 'telefone' ?
                      formatPhone(col.value) : col.value}}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import format from '../../mixins/format.js'
export default {
  mixins: [format],
  data () {
    return {
      tag: '',
      filter: '',
      colab: null,
      columns: [
        {
          name: (row) => row.cargo.nomeCargo,
          required: true,
          label: 'Cargo',
          align: 'left',
          field: (row) => row.cargo.nomeCargo,
          sortable: true
        },
        {
          name: (val) => val.departamento.nomeDepartamento,
          align: 'left',
          label: 'Departamento',
          field: (val) => val.departamento.nomeDepartamento,
          sortable: true
        },
        {
          name: 'cpfCnpj',
          align: 'left',
          label: 'Nº Documento',
          field: 'cpfCnpj',
          sortable: true
        },
        {
          name: 'dataContratacao',
          align: 'left',
          label: 'Data',
          field: 'dataContratacao'
        },
        {
          name: 'telefone',
          align: 'left',
          label: 'Telefone',
          field: 'telefone'
        },
        { name: 'email', align: 'left', label: 'E-mail', field: 'email' }
      ]
    }
  },
  computed: {
    ...mapGetters('colaborador', ['getFiltroColaboradores'])
  },
  methods: {
    ...mapActions('colaborador', ['filtro', 'deletarColaborador']),
    ...mapMutations('colaborador', [
      'setColaborador',
      'setColaboradorVizualizar'
    ]),
    alterar (colaborador) {
      this.setColaborador(colaborador)
      this.$router.push({
        path: `colaborador/${colaborador.idColaborador}/alterar`
      })
    },
    visualizar (colaborador) {
      this.setColaboradorVizualizar(colaborador)
      this.$router.push({
        path: `colaborador/${colaborador.idColaborador}/visualizar`
      })
    },
    resetar () {
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.q-item__label {
  text-align: left;
}
.q-item__section--avatar {
  min-width: 25px;
}
</style>
