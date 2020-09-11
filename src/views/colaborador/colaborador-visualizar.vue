<template>
  <q-dialog v-model="medium" position="top" persistent transition-hide="scale">
    <q-card class="bg-white card-dimension">
      <q-card-section class="row bar-padding bg-teal-5">
        <div class="text-h6"></div>
        <q-space />
        <div class="q-pt-sm q-pr-sm">
        <q-btn color="white" @click="cancel" dense round size="13px" flat icon="close">
          <q-tooltip content-style="font-size: 15px">Fechar</q-tooltip>
        </q-btn>
        </div>
      </q-card-section>
      <q-card-section >
        <q-tabs
          v-model="tab"
          class="bg-teal-5 text-white "
          inline-label
        >
          <q-tab name="dados" icon="fa fa-address-card" label="Colaborador" />
          <q-tab name=endereco icon="home" label="Endereço" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-left"
          transition-next="jump-right"
        >
          <q-tab-panel name="dados">
            <div class="text-h6 q-mb-md">{{colaboradorVizualizar.nomeColaborador}}</div>
            <q-list dense>
               <q-item class="q-pl-none">
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Departamento</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{colaboradorVizualizar.departamento.nomeDepartamento}}</q-item-label>
          </q-item-section>
        </q-item>
         <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Cargo</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{colaboradorVizualizar.cargo.nomeCargo}}</q-item-label>
          </q-item-section>
        </q-item>
          <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Contratação</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{colaboradorVizualizar.dataContratacao}}</q-item-label>
          </q-item-section>
        </q-item>
         <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Nº Documento</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{formatCpf(colaboradorVizualizar.cpfCnpj)}}</q-item-label>
          </q-item-section>
        </q-item>
         <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Salário</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{formatCurrency(colaboradorVizualizar.salario)}}</q-item-label>
          </q-item-section>
        </q-item>
         <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">E-mail</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{colaboradorVizualizar.email}}</q-item-label>
          </q-item-section>
        </q-item>
         <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Telefone</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{formatPhone(colaboradorVizualizar.telefone)}}</q-item-label>
          </q-item-section>
        </q-item>
            </q-list>
          </q-tab-panel>

          <q-tab-panel name="endereco">
            <q-list dense>
                <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Endereço</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{`${consulta.logradouro}, Nº${colaboradorVizualizar.endereco.numero}`}}</q-item-label>
          </q-item-section>
        </q-item>
         <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Complemento</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{`${colaboradorVizualizar.endereco.complemento.toLowerCase()}`}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Cep</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{formatCep(colaboradorVizualizar.endereco.cep)}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Bairro</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{consulta.bairro}}</q-item-label>
          </q-item-section>
        </q-item>
         <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Cidade</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{consulta.localidade}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
        <q-item-section>
          <q-item-label class="text-subtitle text-bold">Unidade Federativa</q-item-label>
          </q-item-section>
           <q-item-section side>
          <q-item-label class="text-subtitle2">{{consulta.uf}}</q-item-label>
          </q-item-section>
        </q-item>
        </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import format from '../../mixins/format.js'
import { mapActions, mapState } from 'vuex'
import { viaCep } from '../../services/config.js'
export default {
  mixins: [format],
  data () {
    return {
      tab: 'dados',
      splitterModel: 15,
      medium: true,
      consulta: {
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
        ibge: null,
        gia: '',
        ddd: null
      }
    }
  },
  computed: {
    ...mapState('colaborador', ['colaboradorVizualizar'])
  },
  methods: {
    ...mapActions('colaborador', ['buscarPorId']),
    cancel () {
      window.history.back()
    }
  },
  created () {
    viaCep.get(`${this.colaboradorVizualizar.endereco.cep}/json`).then(response => {
      this.consulta = response.data
    })
  }
}
</script>
<style scoped>
.card-dimension {
  height: 100%;
  max-height: 900px;
  width: 100%;
  max-width: 500px;
}
.q-item__label {
  text-align: left;
}
.card-container {
  width: 320px;
}
.q-card__section--vert {
  padding: 0px 0px 0px 0px !important;
}
.bg-card {
  background-color: #fafafa;
}
.bar-padding {
  padding-left: 16px !important;
}
.q-item {
  padding-left: 0px;
  padding-right: 0px;
}
.q-dialog__inner--right > div, .q-dialog__inner--top > div {
    border-top-right-radius: 4px;
}
.q-dialog__inner--left > div, .q-dialog__inner--top > div {
  border-top-left-radius: 4px;
}
</style>
