<template>
  <q-dialog v-model="alert" position="top" persistent>
    <q-card class="my-card" style="width: 100%; max-width: 750px;">
      <q-card-section class="row text-white bg-teal-5">
        <div class="row items-center">
          <q-icon class="q-pr-sm" size="24px" :name="icon" />
          <div class="text-h6">{{title}}</div>
        </div>
        <q-space />
        <q-btn @click="cancel" round dense flat icon="close">
          <q-tooltip content-style="font-size: 16px">Fechar</q-tooltip>
        </q-btn>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form @submit="submit">
          <div class="row items-start q-col-gutter-sm q-pt-md">
            <div class="col-sm-3 col-md-3 col-xs-12">
              <q-input
              class="q-pb-sm"
                dense
                outlined
                v-model="endereco.cep"
                color="secondary"
                label="Cep"
                mask="#####-###"
                unmasked-value
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"/>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12">
              <q-input
              class="q-pb-sm"
                dense
                outlined
                v-model="endereco.numero"
                color="secondary"
                label="Número"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"/>
            </div>
            <div class="col-sm-6 col-md-6 col-xs-12">
              <q-input
              class="q-pb-sm"
                dense
                outlined
                v-model="endereco.complemento"
                color="secondary"
                label="Complemento"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório']"/>
            </div>
            <div class="col-sm-6 col-md-6 col-xs-12">
                <q-input
                dense
                outlined
                v-model="consulta.logradouro"
                disable
                color="secondary"
                label="Logradouro"/>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-5">
                <q-input
                dense
                outlined
                v-model="consulta.bairro"
                color="secondary"
                disable
                label="Logradouro"/>
            </div>
            <div class="col-sm-2 col-md-2 col-xs-5">
                <q-input
                dense
                outlined
                v-model="consulta.localidade"
                color="secondary"
                disable
                label="Logradouro"/>
            </div>
            <div class="col-sm-1 col-md-1 col-xs-2">
                <q-input
                dense
                outlined
                v-model="consulta.uf"
                color="secondary"
                disable
                label="UF"/>
            </div>
          </div>
          <q-card-actions align="right" class="bg-white q-pt-md" style="padding-right: 0px;">
            <q-btn type="submit" label="Salvar" color="teal" icon="save" no-caps />
            <q-btn label="Cancelar" @click="cancel" color="red-10" icon="close" no-caps />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { viaCep } from '../../services/config.js'
import { mapActions, mapState } from 'vuex'
import format from '../../mixins/format.js'
export default {
  mixins: [format],
  data () {
    return {
      text: '',
      icon: 'add',
      title: 'Novo Endereço',
      alert: true,
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
  watch: {
    cep (atual, anterior) {
      if (atual.length === 8) this.buscarEndereco(atual)
    }
  },
  computed: {
    ...mapState('colaborador', ['endereco']),
    cep () {
      return this.endereco.cep
    }
  },
  created () {
    this.endereco.colaborador.idColaborador = this.$route.params.idColaborador
  },
  methods: {
    ...mapActions('colaborador', ['salvarEndereco', 'alterarEndereco', 'buscarEndereco']),
    cancel () {
      window.history.back()
    },
    submit () {
      if (this.endereco.idEndereco === null) {
        this.salvarEndereco(this.endereco)
        window.history.back()
      } else {
        this.alterarEndereco(this.endereco)
        window.history.back()
      }
    },
    buscarEndereco (cep) {
      viaCep.get(`${cep}/json`).then(response => {
        if (response.data.erro) this.$q.notify({ type: 'warning', position: 'top-right', message: `Endereço Não Encontrado para o Cep: ${this.formatCep(this.endereco.cep)}` })
        this.consulta = response.data
      })
    }
  }
}
</script>

<style scoped>
.q-card__section--vert {
  padding: 6px 16px 9px 16px !important;
}
.q-dialog__inner--right > div, .q-dialog__inner--top > div {
    border-top-right-radius: 4px;
}
.q-dialog__inner--left > div, .q-dialog__inner--top > div {
  border-top-left-radius: 4px;
}
</style>
