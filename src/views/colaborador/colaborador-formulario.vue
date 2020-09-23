<template>
  <q-dialog v-model="medium" position="top" persistent transition-hide="scale">
    <q-card class="my-card bg-white text" style="width: 100%; max-width: 750px;">
      <q-card-section class="row text-white bg-teal-5  no-wrap">
        <div class="row items-center">
          <q-icon class="q-pr-sm" size="24px" :name="icon" />
          <div class="text-h6">{{title}}</div>
        </div>
        <q-space />
        <q-btn @click="cancel" round dense flat icon="close">
          <q-tooltip content-style="font-size: 16px">Fechar</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-card-section>
        <q-form @submit="salvar">
          <div class="column q-col-gutter-md q-pt-md">
            <div class="row items-start q-col-gutter-md">
              <div class="col-sm-6 col-md-6 col-xs-12">
                <q-input
                  color="teal"
                  dense
                  class="q-pb-none"
                  outlined
                  v-model="colaborador.nomeColaborador"
                  label="Nome Completo"
                  :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
                  clearable
                />
              </div>
              <div class="col-sm-6 col-md-6 col-xs-12">
                <q-input
                  color="teal"
                  outlined
                  dense
                  class="q-pb-none"
                  v-model="colaborador.cpfCnpj"
                  mask="###.###.###-##"
                  label="Cpf"
                  unmasked-value
                  :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
                  clearable
                />
              </div>
            </div>
            <div class="row items-start q-col-gutter-md">
              <div class="col-sm-6 col-md-6 col-xs-12">
                <q-input
                  style="padding-bottom:0px;"
                  outlined
                  color="teal"
                  dense
                  class="q-pb-none"
                  v-model="colaborador.dataContratacao"
                  label="Data da Contratação"
                  mask= "##/##/####"
                  :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          color="teal"
                          mask="DD/MM/YYYY"
                          v-model="colaborador.dataContratacao"
                          @input="() => $refs.qDateProxy.hide()"
                        />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-sm-6 col-md-6 col-xs-12">
                <q-input
                  outlined
                  color="teal"
                  prefix="R$"
                  type="number"
                  reverse-fill-mask
                  dense
                  class="q-pb-none"
                  v-model="colaborador.salario"
                  label="Salário"
                  :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
                />
              </div>
            </div>
            <div class="row items-start q-col-gutter-md">
              <div class="col-sm-6 col-md-6 col-xs-12">
                <q-select
                  outlined
                  color="teal"
                  dense
                  class="q-pb-none"
                  use-input
                  @filter="filterCargo"
                  option-value="idCargo"
                  option-label="nomeCargo"
                  v-model="colaborador.cargo.idCargo"
                  label="Cargos"
                  :options="arrayCargos"
                  map-options
                  emit-value
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-teal">No results</q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-sm-6 col-md-6 col-xs-12">
                <q-select
                  outlined
                  color="teal"
                  dense
                  class="q-pb-none"
                  use-input
                  @filter="filterDepartamento"
                  option-value="idDepartamento"
                  option-label="nomeDepartamento"
                  v-model="colaborador.departamento.idDepartamento"
                  label="Departamentos"
                  :options="arrayDepartamentos"
                  map-options
                  emit-value
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-teal">No results</q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row items-start q-col-gutter-md">
              <div class="col-sm-6 col-md-6 col-xs-12">
                <q-input
                  outlined
                  color="teal"
                  dense
                  class="q-pb-none"
                  v-model="colaborador.email"
                  :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"
                  label="Email"
                />
              </div>
              <div class="col-sm-6 col-md-6 col-xs-12">
                <q-input
                  outlined
                  color="teal"
                  dense
                  class="q-pb-none"
                  v-model="colaborador.telefone"
                  label="Telefone"
                  mask="(##) #####-####"
                  unmasked-value
                />
              </div>
            </div>
          </div>
          <q-card-actions align="right" class="bg-white q-pt-md" style="padding-right: 0px;">
            <q-btn type="submit" label="Salvar" color="teal" icon="save" no-caps />
            <q-btn  outline label="Cancelar" @click="cancel" color="red-10" icon="close" no-caps />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import filter from '../../mixins/filter.js'
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  mixins: [filter],
  data () {
    return {
      medium: true,
      step: 1,
      title: 'Novo Colaborador',
      icon: 'add'
    }
  },
  computed: {
    ...mapState('colaborador', ['colaborador'])
  },
  methods: {
    ...mapActions('colaborador', ['salvarColab', 'alterarColab']),
    ...mapMutations('colaborador', ['limparColaborador']),
    ...mapActions('cargo', ['todosCargos']),
    ...mapActions('depart', ['todosDepartamentos']),
    cancel () {
      window.history.back()
      this.limparColaborador(true)
    },
    salvar () {
      this.$route.params.idColaborador ? this.alterarColab(this.colaborador) : this.salvarColab(this.colaborador)
      window.history.back()
    },
    preparaAlterar () {
      if (this.$route.params.idColaborador) {
        this.title = 'Alterando Colaborador'
        this.icon = 'create'
      }
    }
  },
  created () {
    this.preparaAlterar()
    this.todosCargos()
    this.todosDepartamentos()
  }
}
</script>

<style scoped>
.q-card__section--vert {
  padding: 6px 16px 9px 16px !important;
}
</style>
