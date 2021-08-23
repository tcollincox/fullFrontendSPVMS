<template>
    <div id="page">
        <h1>Add Opportunity</h1>
        <div class="form-line">
            <span class="form-line__field">
                <label for="title">Opportunity title</label>
                <input v-model="opportunity.title" placeholder="Opportunity title" class="input" id="title">
            </span>
            <span class="form-line__field">
                <label for="description">Description</label>
                <input v-model="opportunity.description" placeholder="Description" class="input" id="description">
            </span>
            <span class="form-line__field">
                <label for="maxPeople">Max People</label>
                <input v-model="opportunity.maxPeople" placeholder="1" class="input" id="maxPeople">
            </span>

        </div>
        <div class="form-line">
            <label for="status">Center</label>
            <select id="status" name="status" v-model="opportunity.center" >
                <option v-for="preferredCenter in preferredCentersOptions" :key="preferredCenter.id">{{preferredCenter.text}}</option>
            </select>
        </div>
        <h3>Skills</h3>
        <div class="form-line form-check" v-for="skills in skillsOptions" :key="skills.id">
            <label class="form-label-checkbox" :for="skills.id">{{skills.text}}</label>
            <input type="checkbox" v-model="opportunity.skills" :id="skills.text" :value="skills.text" class="check-space">
        </div>
        <br>
        <b-button @click="submitForm">Submit</b-button>
        <b-button @click="resetForm">Cancel</b-button>

    </div>
</template>

<script>
export default {
        data() {
            return {
                opportunity: {
                    skills: [],
                    title: ' ',
                    description: ' ',
                    center: ' ',
                    maxPeople: 0
                },
                opportunityValidation: {
                    title: false,
                    skills: false,
                    description: false,
                    center: false,
                    maxPeople: false
                },
                skillsOptions: [
                    { text: 'Sports' },
                    { text: 'Strength' },
                    { text: 'Teaching' },
                    { text: 'Listening' },
                    { text: 'Art' },
                    { text: 'Organizing' },
                    { text: 'Technology' }
                ],
                preferredCentersOptions: [
                    { text: 'Duval' },
                    { text: 'St. John\'s Bluff' },
                    { text: 'Riverside' },
                    { text: 'Duval North' }
                ]

            }

        },
        methods: 
        {
            submitForm()
            {
                    this.axios.post('http://localhost:3001/opportunities/Post', {
                        skills: this.opportunity.skills,
                        title: this.opportunity.title,
                        description: this.opportunity.description,
                        center: this.opportunity.center,
                        maxPeople: this.opportunity.maxPeople
                    })
                    this.resetForm();
            },
            resetForm() {
                this.opportunity.skills = [],
                this.opportunity.title = '',
                this.opportunity.description = '',
                this.opportunity.center = '',
                this.opportunity.maxPeople = 0
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
.margin-top-bottom{
  margin-top:1vh;
  margin-bottom:1vh;
}

.border{
  border-radius: 10px;
}

.row{
  display: inline;
  margin-left: 4vw;
}
span input{
  margin-right:20px;
}
span label{
  margin-right:3px;
}
.form-line{
  margin:3vh 0 3vh 0;
}
li{
  list-style: none;
}
li .inline{
  list-style: none;
  display: inline;
}
.form-check{
  display: inline;
}
.check-space{
  margin-left:3px;
}

.chosenTime{
  margin:0px 4px 0px 4px;
  display: inline;
}

.delete-click:hover{
  color:red;
  cursor: pointer;
}

.validation{
  color: red;
}

h3{
  font-size: 20px;
  margin-top:5px;
}

h4{
   font-size: 15px;
  margin-top:5px;
}
.time-input{
  margin: 0px 3px;
  width: 100px;
  height: 30px;
}
</style>