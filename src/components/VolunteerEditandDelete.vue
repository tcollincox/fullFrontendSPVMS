<template>
  <div>
    <h3>Edit</h3>
    <p>{{volunteer.firstName}}</p>
    <button @click="$emit('change-to-display')">Back to display</button>
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