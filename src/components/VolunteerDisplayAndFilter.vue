<template>
<div>
  <h3>Display And Filter</h3>
  <div>
    <b-dropdown id="filter-dropdown" text="Choose Filter" class="m-md-2">
      <b-dropdown-item @click="returnAll()">All</b-dropdown-item>
      <b-dropdown-item>Approved/Pending</b-dropdown-item>
      <b-dropdown-item @click="filterByOne('Approved')">Approved</b-dropdown-item>
      <b-dropdown-item @click="filterByOne('Pending Approval')">Pending Approval</b-dropdown-item>
      <b-dropdown-item @click="filterByOne('Disapproved')">Disapproved</b-dropdown-item>
      <b-dropdown-item @click="filterByOne('Inactive')">Inactive</b-dropdown-item>
    </b-dropdown>
  </div>
  <div v-for="volunteer in volunteersFiltered" :key="volunteer.id">
    <tr>
      <td>{{volunteer.firstName}}_</td>
      <td>{{volunteer.lastName}}</td>
    </tr>
  </div>
</div>
</template>

<script>


export default {
  data(){
    return{
      volunteers:[],
      volunteersFiltered:[],
      filter: "all"
    }
  },
  mounted(){
    this.getVolunteers()
  },
  methods:{
    getVolunteers(){
      this.axios.get('http://localhost:3001/volunteers')
      .then(response => (this.volunteers = response.data))
      .catch(error => console.log(error));
    },
    filterByOne(filterValue){
      this.volunteersFiltered = [];
      for(var i = 0; i<this.volunteers.length; i++){
        if(this.volunteers[i].approvalStatus == filterValue){
          this.volunteersFiltered.push(this.volunteers[i]);
        }
      }
    },
    returnAll(){
      this.volunteersFiltered = [];
      this.volunteersFiltered = this.volunteers;
    }
  }
}
</script>

<style scoped>

</style>