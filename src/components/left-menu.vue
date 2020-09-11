<template>
  <q-list dense>
    <q-item clickable v-ripple tag="a" to="/home/colaborador" active-class="my-menu-link">
      <q-item-section avatar>
        <q-icon name="fa fa-user" size="18px"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Colaborador</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item  clickable v-ripple tag="a" to="/home/cargo" active-class="my-menu-link">
    <q-item-section avatar>
        <q-icon name="fa fa-briefcase" size="18px"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Cargo</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-item clickable v-ripple tag="a" to="/home/departamento" active-class="my-menu-link">
    <q-item-section avatar>
        <q-icon name="fa fa-users" size="18px"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>Departamento</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
  </q-list>
</template>
<script>
export default {
  name: 'leftMenu',
  data () {
    return {}
  }
}
</script>

<style scoped>
.q-item__label {
  text-align: left;
}
.my-menu-link {
  color: #26A69A;
}
</style>
