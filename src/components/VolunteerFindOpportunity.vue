<template>
  <div>
    <h3>Find Opportunity</h3>
    <b-button @click="$emit('change-to-display')">Back to display</b-button>
    <p v-for="(opportunity, i) in opportunities" :key="opportunity.id">
      <b>Title:</b> {{opportunity.title}} <b>Description:</b> {{opportunity.description}} | <span @click="match(i), $emit('change-to-display')" class="clickable">Match</span>
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
      filledOpportunity:{
        title: "",
        center: "",
        opportunityId: "",
        volunteerId: this.volunteer._id,
        volunteerFirstName: this.volunteer.firstName,
        volunteerLastName: this.volunteer.lastName,
      }
    }
  },
  mounted(){
    this.getOpportunities()
  },
  methods:{
    getOpportunities(){
      this.axios.get('http://localhost:3001/opportunities')
      .then(response => (this.opportunities = response.data))
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
        volunteerId: this.filledOpportunity._id,
        volunteerFirstName: this.filledOpportunity.firstName,
        volunteerLastName: this.filledOpportunity.lastName,
        });
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