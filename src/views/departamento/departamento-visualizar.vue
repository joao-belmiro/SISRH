<template>
  <q-dialog v-model="medium" position="top" persistent transition-hide="scale">
    <q-card class="bg-white card-dimension">
      <q-card-section class="row items-center text-black no-margin q-pt-sm" style="padding-bottom: 6px;">
        <div class="text-h6 q-pl-sm">{{departamentoVisualizar.nomeDepartamento}}</div>
        <q-space />
        <div class="q-px-sm">
           <q-chip>
            <q-avatar color="teal" text-color="white">{{getColaboradoresDept.length}}</q-avatar>
            <div class="text-overline">Membros</div>
          </q-chip>
        </div>
        <div>
        <q-btn round dense flat icon="close" @click="voltar">
          <q-tooltip content-style="font-size: 16px">Fechar</q-tooltip>
        </q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
          <div class="text-body1 q-px-sm q-pb-sm">{{departamentoVisualizar.descricao}} </div>
           <div class="row items-start justify-center q-gutter-md q-pb-sm">
               <div v-for="colaborador in getColaboradoresDept" :key="colaborador.idColaborador">
            <q-card  flat bordered class="my-card bg-grey-11 card-container">
                  <q-card-section class="row items-center justify-between" style="padding: 9px 16px 9px 16px;">
            <div class="text-subtitle q-pa-none">{{colaborador.nomeColaborador}}</div>
            <div class="row q-pl-sm q-gutter-sm">
           <q-btn color="primary" size="9px" dense round flat icon="create" @click="alterar(colaborador)"/>
             <q-btn color="red-7" size="9px" round flat dense  icon="fa fa-trash-alt">
                <q-popup-proxy square transition-show="flip-up" transition-hide="flip-down">
                          <q-banner class="bg-grey-2 text-white row items-start no-wrap">
                            <div class="row items-center no-wrap q-gutter-sm">
                              <div
                                class="text-subtitle2 text-black"
                              >{{ `Deseja Excluir: ${colaborador.nomeColaborador}?`}}</div>
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
                  </q-card-section>
                  <q-separator />
            <q-list dense>
                   <q-item>
                <q-item-section>
                  <q-item-label >Cargo</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{colaborador.cargo.nomeCargo}}</q-item-label>
                </q-item-section>
                 </q-item>
                 <q-item>
                <q-item-section>
                  <q-item-label >Salário</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{formatCurrency(colaborador.salario)}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                  <q-item-label >Nº Documento</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{formatCpf(colaborador.cpfCnpj)}}</q-item-label>
                </q-item-section>
            </q-item>
                  <q-item>
                <q-item-section>
                  <q-item-label >Telefone</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{formatPhone(colaborador.telefone)}}</q-item-label>
                </q-item-section>
                  </q-item>
                   <q-item>
                <q-item-section>
                  <q-item-label >E-mail</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{colaborador.email}}</q-item-label>
                </q-item-section>
              </q-item>
               </q-list>
            </q-card>
               </div>
           </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import filter from '../../mixins/filter.js'
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import format from '../../mixins/format.js'
export default {
  mixins: [filter, format],
  data () {
    return {
      medium: true
    }
  },
  computed: {
    ...mapState('depart', ['departamentoVisualizar']),
    ...mapGetters('colaborador', ['getColaboradoresDept'])
  },
  methods: {
    ...mapActions('colaborador', ['colabsDepartameto', 'deletarColaborador']),
    ...mapMutations('depart', ['limparDept']),
    ...mapMutations('colaborador', ['setColaborador']),
    voltar () {
      this.limparDept(true)
      window.history.back()
    },
    alterar (colaborador) {
      this.setColaborador(colaborador)
      this.$router.push({ path: '/home/' + colaborador.idColaborador + '/alterar-colaborador' })
    }
  },
  created () {
    this.colabsDepartameto(this.$route.params.idDepartamento)
  }
}
</script>
<style scoped>
.card-dimension {
  height: 100%;
  max-height: 900px;
  width: 100%;
  max-width: 700px;
}
.q-item__label {
  text-align: left;
}
.card-container {
 width: 320px;
}
.q-dialog__inner--right > div, .q-dialog__inner--top > div {
    border-top-right-radius: 3px;
}
.q-dialog__inner--left > div, .q-dialog__inner--top > div {
  border-top-left-radius: 3px;
}
</style>
