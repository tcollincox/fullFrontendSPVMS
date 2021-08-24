<template>
<div id="page">
  <editAndDelete v-if="pageDisplay=='editAndDelete'" v-bind:opportunity="selectedOpportunity" v-on:change-to-display="changeToDisplay"/>
  <matchWithVolunteer v-if="pageDisplay=='matchWithVolunteer'" v-bind:opportunity="selectedOpportunity" v-on:change-to-display="changeToDisplay"/>
  <div v-if="pageDisplay=='display'">
    <div>
      <h3>Display And Filter</h3>
      <b-dropdown id="filter-dropdown" text="Choose Filter" class="m-md-2">
        <b-dropdown-item @click="filterByDate('Most Recent')">Most Recent</b-dropdown-item>
        <b-dropdown-item @click="filterByCenter('By Center')">By Center</b-dropdown-item>
      </b-dropdown>
    </div>
    <table v-if="opportunitiesFiltered.length>0" class="table-display">
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Skills</th>
        <th>Center</th>
        <th>Maximum Number of People</th>
        <th>Date</th>
        <th>Edit</th>
        <th>Match</th>
      </tr>
      <tr v-for="(opportunity, i) in opportunitiesFiltered" :key="opportunity.id" >
        <td>{{opportunity.title}}</td>
        <td>{{opportunity.description}}</td>
        <td>{{opportunity.skills}}</td>
        <td>{{opportunity.center}}</td>
        <td>{{opportunity.maxPeople}}</td>
        <td>{{opportunity.date}}</td>
        <td class="table-click" @click="edit(i)"> Edit </td>
        <td class="table-click" @click="matchWithVolunteer(i)">Match</td>
      </tr>
    </table>
    <p v-if="opportunitiesFiltered.length == 0">No results to display</p>
  </div>
</div>
</template>

<script>
import editAndDelete from '../components/OpportunityEditandDelete.vue'
import matchWithVolunteer from '../components/OpportunityFindVolunteer.vue'

export default {

  data(){
    return{
      opportunities:[],
      opportunitiesFiltered:[],
      filter: "all",
      fields:["title", "description", "skills", "center", "maxPeople", "date"],
      pageDisplay: "display",
      selectedOpportunity: null,
      }
  },
  mounted(){
    this.getOpportunities()
  },
  methods:{
    getOpportunities(){
      this.axios.get('http://localhost:3001/opportunities')
      .then(response => (this.opportunities = response.data, this.opportunitiesFiltered=response.data ))
      .catch(error => console.log(error));
    },
    //check this out for date filter logic
    filterByDate(){
      this.opportunitiesFiltered = [];
      for(var i = 0; i < this.opportunities.length; i++){
        for(var j = 0; j < this.opportunity.date.length; j++){
          if(this.opportunities[i].date == this.opportunity.date[j]){
          this.opportunitiesFiltered.push(this.opportunities[i]);
          }
        }
      }
    },
    
    //check this out for center filter logic
    filterByCenter(){
      this.opportunitiesFiltered = [];
      for(var i = 0; i < this.opportunities.length; i++){
        for(var j = 0; j < this.opportunity.center.length; j++){
          if(this.opportunities[i].center == this.opportunity.center[j]){
          this.opportunitiesFiltered.push(this.opportunities[i]);
          }
        }
      }
    },
    
    returnAll(){
      this.opportunitiesFiltered = [];
      this.opportunitiesFiltered = this.opportunities;
    },
    edit(opportunity){
      this.selectedOpportunity = this.opportunitiesFiltered[opportunity];
      this.pageDisplay = 'editAndDelete';
    },
    changeToDisplay(){
      this.selectedOppotunity = null;
      this.getOpportunities();
      this.returnAll();
      this.pageDisplay = "display";
    },
    deleteOpportunity(opportunity){
      this.selectedOpportunity = this.opportunitiesFiltered[opportunity];
      let conformation = confirm(this.selectedOpportunity.title + " " + this.selectedOppotunity.center + " is going to be permanently deleted");
      if(conformation){
        let path = 'http://localhost:3001/opportunities/Delete/' + this.selectedOppotunity._id;
        this.axios.delete(path);
        this.opportunitiesFiltered.splice(opportunity,1);
      }
    },
    matchWithVolunteer(opportunityIndex){
      this.selectedOpportunity = this.opportunitiesFiltered[opportunityIndex];
      this.pageDisplay = 'matchWithVolunteer';
    }
  },
  components:{
    editAndDelete,
    matchWithVolunteer
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