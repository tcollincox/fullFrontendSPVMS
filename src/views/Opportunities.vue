<template>
<div>
    <h1>Opportunites</h1>
  <b-button @click="choice = 'displayAndFilter' ">Display and Filter</b-button>
  <b-button @click="choice = 'search'">Search</b-button>
  <b-button @click="choice = 'add'">Add New Volunteer</b-button>
  
    <displayAndFilter v-if="choice=='displayAndFilter'" />
    <search v-if="choice=='search'"/>
    <add v-if="choice=='add'"/>
    
</div>
</template>

<script>
import displayAndFilter from '../components/OpportunityDisplayAndFilter.vue'
import add from '../components/OpportunityAdd.vue'
import search from '../components/OpportunitySearch.vue'

export default {
  data(){
    return{
      choice:"displayAndFilter"
    }
  },
  components:{
    displayAndFilter,
    add,
    search
  }
}
</script>

<style scoped>
button{
  min-width: 80px;
  margin: 4vh 2vw 4vh 2vw;
  background-color:#FE7A53;
  border:none;
  width: 150px;
  border-radius: 20px;
}
button:focus{
  background-color:#FE7A53;
}
h1{
  margin-top: 4vh;
}
</style>