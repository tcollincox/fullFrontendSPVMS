<template>
  <div>
    <h3>Find Volunteer for {{opportunity.title}}</h3>
    <h4 v-if="displayCenter">{{opportunity.center}}</h4>
    <h4 v-if="displaySkills">{{opportunity.skills}}</h4>
    <b-button @click="$emit('change-to-display')">Back to display</b-button>
    <b-dropdown id="filter-dropdown" text="Choose Filter" class="m-md-2">
        <b-dropdown-item @click="returnAll()">All</b-dropdown-item>
      </b-dropdown>
    <p v-for="(volunteer, i) in volunteersFiltered" :key="volunteer.id">
      <b>First Name:</b> {{volunteer.firstName}} |<b> Last Name:</b> {{volunteer.lastName}} <span v-if="displayCenter">|<b> Centers:</b> {{volunteer.preferredCenters}}</span> <span v-if="displaySkills">|<b> Skills:</b> {{volunteer.skills}}</span> | <span @click="match(i), $emit('change-to-display')" class="clickable">Match</span>
    </p>
  </div>
</template>

<script>
export default {
  props:[
    'opportunity'
  ],
  data(){
    return{
      volunteers: [],
      volunteersFiltered:[],
      filledOpportunity:{
        title: this.opportunity.title,
        center: this.opportunity.center,
        opportunityId: this.opportunity._id,
        volunteerId: "",
        volunteerFirstName: "",
        volunteerLastName: "",
      },
      displaySkills: false,
      displayCenter : false
    }
  },
  mounted(){
    this.getVolunteers();
  },
  methods:{
    getVolunteers(){
      this.axios.get('http://localhost:3001/volunteers')
      .then(response => (this.volunteers = response.data, this.volunteersFiltered = response.data))
      .catch(error => console.log(error));
    },
    match(volunteersIndex){
      let volunteer = this.volunteers[volunteersIndex];
      this.filledOpportunity.volunteerFirstName = volunteer.firstName;
      this.filledOpportunity.volunteerLastName = volunteer.lastName;
      this.filledOpportunity.volunteerId = volunteer._id;
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
        this.volunteersFiltered = this.volunteers;
        this.displaySkills = false;
        this.displayCenter = false;
      },
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