<template>
    <q-expansion-item
      expand-separator
      :icon="icon"
      :label="title"
      header-class="bg-teal text-white text-subtitle1 text-weight-bold"
      expand-icon-class="text-white"
      class="shadow-1 overflow-hidden"
      style="border-radius: 5px;"
      :value="value">
      <q-card bordered>
        <q-card-section>
        <q-form @reset="reset" @submit="$emit('save') ">
             <slot></slot>
             <div class="q-gutter-sm">
              <q-btn  icon="save" label="Salvar" type="submit" color="teal" no-caps/>
              <q-btn  icon="fa fa-eraser" label="Limpar" type="reset" color="grey-7" no-caps/>
             </div>
        </q-form>
        </q-card-section>
      </q-card>
    </q-expansion-item>
</template>
<script>
export default {
  name: 'expandForm',
  props: ['title', 'value', 'icon'],
  data () {
    return {

    }
  },
  methods: {
    reset () {
      this.$emit('reset')
    }
  }
}
</script>

<style>

</style>
