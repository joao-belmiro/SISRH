<template>
  <div class="q-pa-md">
    <div class="row items-start q-gutter-sm">
      <q-chip outline square color="secondary" icon="fa fa-users" size="19px">
        <div class="text-bold q-pl-sm">{{`${countColabs()}`}} COLABORADORES</div>
      </q-chip>
      <q-chip outline square color="green-14" size="19px">
        <div class="text-bold ellipsis">{{`${formatCurrency(countCost())}`}} DE CUSTO OPERACIONAL</div>
      </q-chip>
    </div>
    <div class="row items-center q-pb-md">
      <div v-if="load" class="col-sm-7 col-md-7 col-xs-12">
        <bar-chart class="chart-container" :chartData="datacollection" :bind="true"/>
      </div>
      <div class="column col-sm-5 col-md-5 col-xs-11">
        <div class="q-pb-sm">
          <q-btn-dropdown
            split
            color="secondary"
            label="Recarregar Gráfico"
            icon="refresh"
            @click="refreshPie"
            dropdown-icon="pie_chart"
            no-caps
          >
            <q-list
              v-for="departamento in getTodosDepartamentos"
              :key="departamento.idDepartamento"
            >
              <q-item clickable v-close-popup @click="changePieData(departamento)">
                <q-item-section>
                  <q-item-label>{{departamento.nomeDepartamento.toUpperCase()}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div v-if="!loadCargo" class="spinner">
          <q-spinner-pie color="secondary" size="100px" />
        </div>
        <pie-chart v-if="loadCargo" class="pie-container" :chartData="pieData" :title="titlePie" />
      </div>
    </div>
    <div class="row items-start q-col-gutter-md">
      <div
        class="col-sm-4 col-md-4 col-xs-12"
        v-for="departamento in getDashDepartamentos"
        v-bind:key="departamento.idDepartamento"
      >
        <q-card
          class="my-card card-hover cursor-pointer card-dimension"
          @click.native="pesquisar(departamento)"
        >
          <q-card-section align="left" class="q-py-sm">
            <div class="row items-center justify-between no-wrap">
              <div class="text-subtitle text-bold ellipsis">{{departamento.nomeDepartamento.toUpperCase()}}</div>
              <q-chip>
                <q-avatar color="teal" text-color="white">{{departamento.ncolaboradores}}</q-avatar>
                <div class="text-bold text-overline">Membros</div>
              </q-chip>
            </div>
            <div class="text-caption text-grey format-text">{{departamento.descricao}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <br />
    <div class="row items-start q-col-gutter-md">
      <div class="col-sm-6 col-md-6 col-xs-12">
        <q-card bordered class="my-card" style="height: 496px;">
          <q-card-section class="q-py-none">
            <q-toolbar class="q-px-none">
              <q-toolbar-title style="text-align:left;">Novos Colaboradores</q-toolbar-title>
              <div>
                <q-btn flat dense round color="teal-4" icon="fas fa-user-plus" to="home/novo-colaborador">
                  <q-tooltip content-style="font-size: 14px">Novo Colaborador</q-tooltip>
                </q-btn>
              </div>
            </q-toolbar>
          </q-card-section>
          <q-separator />
          <q-card-section class="no-padding">
            <q-scroll-area class="size-scroll">
              <q-list separator>
                <template v-for="colaborador in getDashColaboradores">
                  <q-item v-bind:key="colaborador.idColaborador">
                    <q-item-section>
                      <q-item-label>Nome</q-item-label>
                      <q-item-label caption>{{colaborador.nomeColaborador}}</q-item-label>
                      <q-item-label>Lotação</q-item-label>
                      <q-item-label caption>{{colaborador.departamento.nomeDepartamento}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Cargo</q-item-label>
                      <q-item-label caption>{{colaborador.cargo.nomeCargo}}</q-item-label>
                      <q-item-label>Telefone</q-item-label>
                      <q-item-label caption>{{formatPhone(colaborador.telefone)}}</q-item-label>
                    </q-item-section>
                    <q-item-section side top>
                      <div class="row q-gutter-sm">
                        <q-btn
                          color="primary"
                          size="10px"
                          dense
                          round
                          flat
                          icon="create"
                          @click="alterar(colaborador)"
                        />
                        <q-btn color="red-7" size="10px" round flat dense icon="fa fa-trash-alt">
                          <q-popup-proxy
                            square
                            transition-show="flip-up"
                            transition-hide="flip-down"
                          >
                            <q-banner class="bg-grey-2 text-white row items-start no-wrap">
                              <div class="row items-center no-wrap q-gutter-sm">
                                <div
                                  class="text-subtitle2 text-black"
                                >{{ `Deseja Excluir: ${colaborador.nomeColaborador}`}}</div>
                                <q-btn
                                  flat
                                  size="13px"
                                  icon="fa fa-trash-alt"
                                  color="negative"
                                  label="Excluir"
                                  dense
                                  no-caps
                                  @click="deletarColaborador(colaborador)"
                                />
                              </div>
                            </q-banner>
                          </q-popup-proxy>
                        </q-btn>
                      </div>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-scroll-area>
          </q-card-section>
        </q-card>
      </div>
      <div class="column col-sm-6 col-md-6 col-xs-12">
        <departamento-form />
        <br />
        <cargo-form />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import departamentoForm from './departamento/departamento-formulario'
import cargoForm from './cargo/cargo-formulario'
import filter from '../mixins/filter.js'
import format from '../mixins/format.js'
import barChart from '../components/bar-chart.vue'
import pieChart from '../components/pie-chart.vue'
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
export default {
  mixins: [filter, format],
  components: { departamentoForm, cargoForm, barChart, pieChart },
  name: 'Home',
  data () {
    return {
      titlePie: 'PROPORÇÃO DE COLABORADORES',
      datacollection: {
        labels: [],
        datasets: [
          {
            label: 'Departamento',
            pointBackgroundColor: 'white',
            backgroundColor: 'rgba(0, 150, 136, 0.5)',
            borderColor: 'rgba(53, 150, 150,1)',
            hoverBackgroundColor: 'rgba(0, 180, 180, 0.4)',
            hoverBorderColor: 'rgba(0, 150, 136, 0.5)',
            borderWidth: 1,
            data: []
          }
        ]
      },
      pieData: {
        hoverBackgroundColor: '#f4f4f4',
        hoverBorderWidth: 1,
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [
              '#42b983',
              '#cc0000',
              '#61dafb',
              '#8257e6',
              '#1976d2',
              '#31ccec',
              '#026e00',
              '#ff2d20',
              '#80ea6e',
              '#80ea9F'
            ],
            data: []
          }
        ]
      }
    }
  },
  watch: {},
  computed: {
    ...mapGetters('depart', ['getDashDepartamentos', 'getTodosDepartamentos']),
    ...mapState('depart', ['load']),
    ...mapState('cargo', ['cargoData', 'loadCargo']),
    ...mapGetters('colaborador', ['getDashColaboradores'])
  },
  methods: {
    ...mapActions('depart', ['dashDepartamentos']),
    ...mapActions('colaborador', ['novosColabs', 'deletarColaborador']),
    ...mapActions('cargo', ['dashCargo']),
    ...mapMutations('cargo', ['setLoadCargo']),
    ...mapMutations('depart', ['setDeptVisu', 'changePieData']),
    ...mapMutations('colaborador', ['setColaborador']),
    pesquisar (departamento) {
      this.setDeptVisu(departamento)
      this.$router.push({ path: `home/${departamento.idDepartamento}/visualizar` })
    },
    alterar (colaborador) {
      this.setColaborador(colaborador)
      this.$router.push({
        path: `home/${colaborador.idColaborador}/alterar-colaborador`
      })
    },
    changePieData (departamento) {
      this.setLoadCargo(false)
      this.titlePie = `Colaboradores de ${departamento.nomeDepartamento}`.toUpperCase()
      if (this.$store.state.cargo.cargoLabels.length !== 0) { this.pieData.labels = [] }
      if (this.$store.state.cargo.cargoData.length !== 0) { this.pieData.datasets[0].data = [] }
      const index = this.getDashDepartamentos.findIndex(
        (dept) => dept.idDepartamento === departamento.idDepartamento
      )
      const labels = Object.keys(this.getDashDepartamentos[index].countCargos)
      this.pieData.labels = labels
      labels.forEach((el) => {
        this.pieData.datasets[0].data.push(
          this.getDashDepartamentos[index].countCargos[el]
        )
      })
      setTimeout(() => {
        this.setLoadCargo(true)
      }, 300)
    },
    refreshPie () {
      this.dashCargo()
      this.titlePie = 'PROPORÇÃO DE COLABORADORES'
      this.pieData.labels = this.$store.state.cargo.cargoLabels
      this.pieData.datasets[0].data = this.$store.state.cargo.cargoData
    },
    countColabs () {
      const reducer = (soma, valorAtual) => soma + valorAtual.ncolaboradores
      const count = this.getDashDepartamentos.reduce(reducer, 0)
      return count
    },
    countCost () {
      const reducer = (soma, valorAtual) => soma + valorAtual.custoDepartamento
      const count = this.getDashDepartamentos.reduce(reducer, 0)
      return count
    }
  },
  created () {
    this.novosColabs()
    this.dashCargo()
    this.pieData.labels = this.$store.state.cargo.cargoLabels
    this.pieData.datasets[0].data = this.$store.state.cargo.cargoData
    this.datacollection.labels = this.$store.state.depart.labels
    this.datacollection.datasets[0].data = this.$store.state.depart.data
  },
  mounted () {
    this.dashDepartamentos()
  }
}
</script>
<style scoped>
.card-hover {
  transition: all 0.5s ease-in-out;
}
.card-hover:hover {
  background-color: #f4f4f4;
}
.cursor-pointer {
  cursor: pointer;
}
.card-dimension {
  width: 100%;
  height: 100%;
  max-height: 200px;
}
.q-item__label {
  text-align: left;
}
.chart-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  min-height: 300px;
}
.pie-container {
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 350px !important;
  max-height: 350px;
}
.size-scroll {
  height: 444px;
  max-width: 1000px;
}
.format-text {
  overflow: hidden;
  text-overflow: Ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.spinner {
  padding: 50px;
}
#doughnut-chart {
  height: 360px !important;
}
</style>
