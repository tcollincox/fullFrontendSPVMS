<template>
<div id="page">
  <editAndDelete v-if="pageDisplay=='editAndDelete'" v-bind:volunteer="selectedVolunteer" v-on:change-to-display="changeToDisplay"/>
  <matchWithOpportunity v-if="pageDisplay=='matchWithOpportunity'" v-bind:volunteer="selectedVolunteer" v-on:change-to-display="changeToDisplay"/>
  <fullDetail v-if="pageDisplay=='fullDetail'" v-bind:volunteer="selectedVolunteer" v-on:change-to-display="changeToDisplay" v-on:change-to-edit="changeToEdit"/>
  <div v-if="pageDisplay=='display'">
    <div>
      <h3>Display And Filter</h3>
      <b-dropdown id="filter-dropdown" text="Choose Filter" class="m-md-2">
        <b-dropdown-item @click="returnAll()">All</b-dropdown-item>
        <b-dropdown-item @click="filterByTwo('Approved', 'Pending Approval')">Approved/Pending</b-dropdown-item>
        <b-dropdown-item @click="filterByOne('Approved')">Approved</b-dropdown-item>
        <b-dropdown-item @click="filterByOne('Pending Approval')">Pending Approval</b-dropdown-item>
        <b-dropdown-item @click="filterByOne('Disapproved')">Disapproved</b-dropdown-item>
        <b-dropdown-item @click="filterByOne('Inactive')">Inactive</b-dropdown-item>
      </b-dropdown>
    </div>
    <table v-if="volunteersFiltered.length>0" class="table-display">
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Approval Status</th>
        <th>See All Details</th>
        <th>Match with Opportunities</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      <tr v-for="(volunteer, i) in volunteersFiltered" :key="volunteer.id" >
        <td>{{volunteer.firstName}} {{volunteer.lastName}}</td>
        <td>{{volunteer.username}}</td>
        <td>{{volunteer.approvalStatus}}</td>
        <td class="table-click" @click="seeFullDetail(i)">All Details</td>
        <td class="table-click" @click="matchWithOpportunities(i)">Match</td>
        <td class="table-click" @click="edit(i)"> Edit </td>
        <td class="table-click" @click="deleteVolunteer(i)">X</td>
      </tr>
    </table>
    <p v-if="volunteersFiltered.length == 0">No results to display</p>
  </div>
</div>
</template>

<script>
import editAndDelete from '../components/VolunteerEditandDelete.vue'
import matchWithOpportunity from  '../components/VolunteerFindOpportunity.vue'
import fullDetail from  '../components/VolunteerFullDetail.vue'

export default {

  data(){
    return{
      volunteers:[],
      volunteersFiltered:[],
      filter: "all",
      fields:["firstName","lastName","approvalStatus","email"],
      pageDisplay: "display",
      selectedVolunteer: null,
      }
  },
  mounted(){
    this.getVolunteers()
  },
  methods:{
    getVolunteers(){
      this.axios.get('http://localhost:3001/volunteers')
      .then(response => (this.volunteers = response.data, this.volunteersFiltered=response.data ))
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
    filterByTwo(filterValue1, filterValue2){
      this.volunteersFiltered = [];
      for(var i = 0; i<this.volunteers.length; i++){
        if(this.volunteers[i].approvalStatus == filterValue1 || this.volunteers[i].approvalStatus == filterValue2){
          this.volunteersFiltered.push(this.volunteers[i]);
        }
      }
    },
    returnAll(){
      this.volunteersFiltered = [];
      this.volunteersFiltered = this.volunteers;
    },
    edit(volunteer){
      this.selectedVolunteer = this.volunteersFiltered[volunteer];
      this.pageDisplay = 'editAndDelete';
    },
    changeToDisplay(){
      this.selectedVolunteer = null;
      this.getVolunteers();
      this.returnAll();
      this.pageDisplay = "display";
    },
    deleteVolunteer(volunteer){
      this.selectedVolunteer = this.volunteersFiltered[volunteer];
      let conformation = confirm(this.selectedVolunteer.firstName + " " + this.selectedVolunteer.lastName + " is going to be permanently deleted");
      if(conformation){
        let path = 'http://localhost:3001/volunteers/Delete/' + this.selectedVolunteer._id;
        this.axios.delete(path);
        this.volunteersFiltered.splice(volunteer,1);
      }
    },
    seeFullDetail(volunteer){
      console.log("activated")
      this.selectedVolunteer = this.volunteersFiltered[volunteer];
      this.pageDisplay = 'fullDetail';
    },
    changeToEdit(){
      this.pageDisplay = 'editAndDelete';
    },
    matchWithOpportunities(volunteer){
      this.selectedVolunteer = this.volunteersFiltered[volunteer];
      this.pageDisplay = 'matchWithOpportunity';
    }
  },
  components:{
    editAndDelete,
    matchWithOpportunity,
    fullDetail
  }
}
</script>

<style scoped>
  .table-display{
    margin-left: auto;
    margin-right: auto;
    width:50%;
  }
  table, th, td {
  border: 1px solid black;
  }

  table{
    border-collapse: collapse;
  }

  .table-click:hover{
    cursor:pointer;
    color:red;
  }
</style>