<template>
  <div>
    <h3>Find Opportunity for {{volunteer.firstName}}</h3>
    <h4 v-if="displayCenter">{{volunteer.preferredCenters}}</h4>
    <h4 v-if="displaySkills">{{volunteer.skills}}</h4>
    <b-button @click="$emit('change-to-display')">Back to display</b-button>
    <b-dropdown id="filter-dropdown" text="Choose Filter" class="m-md-2">
        <b-dropdown-item @click="returnAll()">All</b-dropdown-item>
        <b-dropdown-item @click="filterByCenters()">By Center(s)</b-dropdown-item>
        <b-dropdown-item @click="filterBySkills()">By Skill(s)</b-dropdown-item>
      </b-dropdown>
    <p v-for="(opportunity, i) in opportunitiesFiltered" :key="opportunity.id">
      <b>Title:</b> {{opportunity.title}} |<b> Description:</b> {{opportunity.description}} <span v-if="displayCenter">|<b> Center:</b> {{opportunity.center}}</span> <span v-if="displaySkills">|<b> Skills:</b> {{opportunity.skills}}</span> | <span @click="match(i), $emit('change-to-display')" class="clickable">Match</span>
    </p>
  </div>
</template>

<script>
export default {
  props:[
    'volunteer'
  ],
  data(){
    return{
      opportunities: [],
      opportunitiesFiltered:[],
      filledOpportunity:{
        title: "",
        center: "",
        opportunityId: "",
        volunteerId: this.volunteer._id,
        volunteerFirstName: this.volunteer.firstName,
        volunteerLastName: this.volunteer.lastName,
      },
      displaySkills: false,
      displayCenter : false
    }
  },
  mounted(){
    this.getOpportunities();
  },
  methods:{
    getOpportunities(){
      this.axios.get('http://localhost:3001/opportunities')
      .then(response => (this.opportunities = response.data, this.opportunitiesFiltered = response.data))
      .catch(error => console.log(error));
    },
    match(opportunityIndex){
      let opportunity = this.opportunities[opportunityIndex];
      this.filledOpportunity.title = opportunity.title;
      this.filledOpportunity.center = opportunity.center;
      this.filledOpportunity.opportunityId = opportunity._id;
      this.axios.post('http://localhost:3001/filledOpportunities/Post', {
        title: this.filledOpportunity.title ,
        center: this.filledOpportunity.center,
        opportunityId: this.filledOpportunity.opportunityId,
        volunteerId: this.filledOpportunity.volunteerId,
        volunteerFirstName: this.filledOpportunity.volunteerFirstName,
        volunteerLastName: this.filledOpportunity.volunteerLastName,
        });
      },
      returnAll(){
        this.opportunitiesFiltered = this.opportunities;
        this.displaySkills = false;
        this.displayCenter = false;
      },
      filterByCenters(){
        this.opportunitiesFiltered = [];
        for(var i = 0; i<this.opportunities.length;i++){
          for(var j = 0; j < this.volunteer.preferredCenters.length;j++){
            if(this.opportunities[i].center == this.volunteer.preferredCenters[j]){
              this.opportunitiesFiltered.push(this.opportunities[i]);
            }
          }
        }
        this.displaySkills = false;
        this.displayCenter = true;
      },
      filterBySkills(){
        let notLogged = true;
        this.opportunitiesFiltered = [];
        for(var i = 0; i<this.opportunities.length;i++){
          notLogged = true
          for(var j = 0; j < this.volunteer.skills.length;j++){
            for(var k = 0; k < this.opportunities[i].skills.length;k++){
              console.log(this.opportunities[i].skills[k] + "=" + this.volunteer.skills[j])
              if(this.opportunities[i].skills[k] == this.volunteer.skills[j] && notLogged){
                this.opportunitiesFiltered.push(this.opportunities[i]);
                notLogged = false;
              }
            }
          }
          this.displaySkills = true;
          this.displayCenter = false;
        }
      }
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
.clickable:hover{
  cursor: pointer;
  color: red;
}
li {
  list-style: none;
}
</style>