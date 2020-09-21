<template>
  <div>
    <div class="row items-center q-pa-md">
      <q-breadcrumbs active-color="teal">
        <q-breadcrumbs-el icon="home" label="Home" to="/home" />
        <q-breadcrumbs-el label="Pesquisa" icon="search" to="/funcionario" />
      </q-breadcrumbs>
    </div>
    <q-form @submit="filtroUser(tag)">
      <div class="row items-start justify-center q-px-md">
        <div class="col-sm-6 col-md-6 col-xs-10">
          <q-input
            class="q-pb-none"
            dense
            square
            outlined
            v-model="tag"
            color="secondary"
            label="Digite o Nome do usuário"
            :rules="[ val => val && val.length > 0 || 'Este Campo não pode ser Vazio']"
          />
        </div>
        <q-btn
          class="border-buttom"
          color="grey-5"
          size="17.5px"
          dense
          outline
          type="submit"
          icon="search"
        />
      </div>
    </q-form>
    <br />
    <div class="row q-px-md items-start q-col-gutter-md">
      <div class="col-sm-4 col-md-4 col-xs-12">
        <usuario-form />
      </div>
      <div class="col-sm-8 col-md-8 col-xs-12">
        <q-table
          dense
          bordered
          separator="cell"
          title="Usuários Cadastrados"
          :data="getFiltroUsuarios"
          :columns="columns"
          :filter="filter"
          row-key="name"
        >
          <template v-slot:top>
            <p class="text-h6 no-margin">Usuários Cadastrados</p>
            <q-space />
            <div class="col-sm-3 col-md-3 col-xs-12">
              <q-input
                borderless
                dense
                debounce="400"
                color="teal"
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
              @click="buscarPorId(props.row.id)"
            >
              <q-tooltip content-style="font-size: 14px">Alterar</q-tooltip>
            </q-btn>
            <q-btn size="11px" icon="fas fa-trash-alt" round dense color="negative" flat>
              <q-popup-proxy square transition-show="flip-up" transition-hide="flip-down">
                <q-banner class="bg-grey-2 text-white row items-start no-wrap q-px-sm no-shadow">
                  <div class="row items-center no-wrap q-gutter-sm">
                    <div
                      class="text-subtitle2 text-black"
                    >{{ `Deseja Excluir Permanentemente: ${props.row.login} ?`}}</div>
                    <q-btn
                      @click="deletar(props.row)"
                      flat
                      size="13px"
                      icon="fa fa-trash-alt"
                      color="negative"
                      label="Excluir"
                      dense
                      no-caps
                    />
                  </div>
                </q-banner>
              </q-popup-proxy>
            </q-btn>
          </q-td>
        </q-table>
      </div>
    </div>
  </div>
</template>
<script>
import usuarioForm from './usuario-formulario.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { usuarioForm },
  data () {
    return {
      tag: '',
      filter: '',
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Código',
          align: 'left',
          field: 'id',
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: 'login',
          align: 'left',
          label: 'Usuário',
          field: 'login',
          sortable: true
        },
        {
          name: 'admin',
          align: 'left',
          label: 'Administrador',
          field: 'admin',
          sortable: true
        },
        { name: 'opcoes', label: 'Opções', align: 'center' }
      ]
    }
  },
  computed: {
    ...mapGetters('usuario', ['getFiltroUsuarios'])
  },
  methods: {
    ...mapActions('usuario', ['filtroUser', 'buscarPorId', 'deletar'])
  }
}
</script>

<style>
</style>
