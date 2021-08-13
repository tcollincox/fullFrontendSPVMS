<template>
<div>
    <h1>Volunteers</h1>
  <b-button @click="choice = 'displayAndFilter' ">Display and Filter</b-button>
  <b-button @click="choice = 'search'">Search</b-button>
  <b-button @click="choice = 'editAndDelete'">Edit and Delete</b-button>
  <b-button @click="choice = 'add'">Add New Volunteer</b-button>
  <b-button @click="choice = 'matchWithOpportunity'">Match With An Opportunity</b-button>

    <displayAndFilter v-if="choice=='displayAndFilter'" />
    <search v-if="choice=='search'"/>
    <editAndDelete v-if="choice=='editAndDelete'"/>
    <add v-if="choice=='add'"/>
    <matchWithOpportunity v-if="choice=='matchWithOpportunity'"/>
</div>
</template>

<script>
import displayAndFilter from '../components/VolunteerDisplayAndFilter.vue'
import add from '../components/VolunteerAdd.vue'
import editAndDelete from '../components/VolunteerEditandDelete.vue'
import matchWithOpportunity from  '../components/VolunteerFindOpportunity.vue'
import search from '../components/VolunteerSearch.vue'

export default {
  data(){
    return{
      choice:"displayAndFilter"
    }
  },
  components:{
    displayAndFilter,
    add,
    editAndDelete,
    matchWithOpportunity,
    search
  }
}
</script>

<style scoped>
button{
  margin: 4vh 2vw 4vh 2vw;
  background-color:#3F3D56;
  border:none;
}
button:focus{
  background-color:#FE7A53;
}
h1{
  margin-top: 4vh;
}
</style>