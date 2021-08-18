<template>
  <div>
    <h3>Find Opportunity</h3>
    <p>{{volunteer.firstName}}</p>
    <b-button @click="$emit('change-to-display')">Back to display</b-button>
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