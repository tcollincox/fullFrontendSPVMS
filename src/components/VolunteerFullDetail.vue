<template>
  <div>
    <h3>full detail</h3>
    <p>{{volunteer.firstName}}</p>
    <b-button @click="$emit('change-to-display')">Back to display</b-button>
    <b-button @click="$emit('change-to-edit')">Edit</b-button>
  </div>
</template>

<script>
export default {
  props:[
    'volunteer'
  ]
}
</script>

<style scoped>

</style>