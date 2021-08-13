<template>
  <div id="page">
    <h1>Add Volunteer</h1>
    <ul>
      <li v-if="volunteerValidation.firstName" class="validation">First name empty</li>
      <li v-if="volunteerValidation.lastName" class="validation">Last name empty</li>
      <li v-if="volunteerValidation.username" class="validation" >Username taken or empty</li>
      <li v-if="volunteerValidation.password" class="validation">Password Empty</li>
      <li v-if="volunteerValidation.approvalStatus" class="validation">No Approval Status Chosen</li>
      <li v-if="volunteerValidation.address" class="validation">No Address Entered</li>
      <li v-if="volunteerValidation.cellPhone" class="validation">Cellphone format incorrect (###-###-####) or field empty</li>
      <li v-if="volunteerValidation.email" class="validation">Email format incorrect or field empty</li>
      <li v-if="volunteerValidation.educationalBackground" class="validation">No Education chosen</li>
    </ul>
    <div class="form-line">
      <span class="form-line__field">
        <label for="firstName">First Name</label>
        <input v-model="newVolunteer.firstName" placeholder="First name" class="input" id="firstName">
      </span>
      <span class="form-line__field">
        <label for="lastName">Last Name</label>
        <input v-model="newVolunteer.lastName" placeholder="Last name" class="input" id="lastName">
      </span>
    </div>
    <div class="form-line">
    <span class="form-line__field">
      <label for="username">Username</label>
      <input v-model="newVolunteer.username" placeholder="Username" class="input" id="username">
    </span>
    <span class="form-line__field"> 
      <label for="password">Password</label>
      <input type="password" v-model="newVolunteer.password" placeholder="Password" class="input" id="passwword">
    </span>
    </div>
    <label for="status">Approval Status</label>
    <select id="status" name="status" v-model="newVolunteer.approvalStatus" >
      <option v-for="approvalStatus in approvalStati" :key="approvalStatus.id">{{approvalStatus}}</option>
    </select>
    <br/>
    <h2>Preferred Center</h2>
    <div class="form-line form-check" v-for="preferredCenter in preferredCentersOptions" :key="preferredCenter.id">
      <label class="form-label-checkbox" :for="preferredCenter.id">{{preferredCenter.text}}</label>
      <input type="checkbox" v-model="newVolunteer.preferredCenters" :id="preferredCenter.text" :value="preferredCenter.text" class="check-space">
    </div>
    <br/>
    <h2>Skills</h2>
    <div class="form-line form-check" v-for="skill in skillsOptions" :key="skill.id">
      <label class="form-label-checkbox" :for="skill.id">{{skill.text}}</label>
      <input type="checkbox" v-model="newVolunteer.skills" :id="skill.text" :value="skill.text" class="check-space">
    </div>
    <h2>Avalibility Times</h2>
    <label for="avalibility-times">Choose day and start time parings and click add: </label>
    <select id="day" name="day" v-model="timeParing.day">
      <option v-for="day in days" :key="day.id" >{{day.text}}</option>
    </select>
    <input id="avalibility-times" type="time" name="avalibility-times"
         min="7:00" max="19:00" v-model="timeParing.time">
    <button @click="addTime(timeParing)">Add Time</button>
    <div>
      
      <label for="address">Address</label>
      <input v-model="newVolunteer.address" placeholder="Address" class="input" id="address">
    </div>
    <div>
      <label for="address">Phones: Enter in format (904-444-4444) (Only Cell Required)</label>
      <br/>
      <span>
     
        <label for="address">Cell:</label>
        <input v-model="newVolunteer.cellPhone" type="tel" id="cell-phone" name="phone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required>
      </span>
      <span>
        <label for="address">Work:</label>
        <input v-model="newVolunteer.workPhone" type="tel" id="work-phone" name="phone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
      </span>
      <span>
        <label for="address">Home:</label>
        <input v-model="newVolunteer.homePhone" type="tel" id="home-phone" name="phone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
      </span>
    </div>
    <div>
      
      <label for="email">Email:</label>
      <input v-model="newVolunteer.email" placeholder="Email" class="input" id="email" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" size="30" required>
    </div>
    <div>
      <label for="education">Highest Level of Education: </label>
      <select id="education" name="education" v-model="newVolunteer.educationalBackground" >
        <option v-for="level in education" :key="level.id">{{level.text}}</option>
      </select>
    </div>
    <h2>Licences</h2>
    <div class="form-line form-check" v-for="licenses in licensesOptions" :key="licenses.id">
      <label class="form-label-checkbox" :for="licenses.id">{{licenses.text}}</label>
      <input type="checkbox" v-model="newVolunteer.licenses" :id="licenses.text" :value="licenses.text" class="check-space">
    </div>
    <div class="form-line">
        <label for="firstName">Emergency Contact Name</label>
        <input v-model="newVolunteer.emergencyContactName" placeholder="Name" class="input" id="emergencyContactName">
    </div>
    <div>
      <label for="email">Emergency Contact Email:</label>
      <input v-model="newVolunteer.emergencyContactEmail" placeholder="Email" class="input" id="emergencyContactEmail" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" size="30" required>
    </div>
    <div>
      <label for="address">Emergency Contact Address</label>
      <input v-model="newVolunteer.emergencyContactAddress" placeholder="Address" class="input" id="emergencyContactAddress">
    </div>
    <div>
      <h2>Drivers License on File</h2>
      <input type="radio" id="yes" value="true" v-model="newVolunteer.driverLicenseOnFile">
      <label for="yes">Yes</label>
      <br>
      <input type="radio" id="no" value="false" v-model="newVolunteer.driverLicenseOnFile">
      <label for="no">No</label>
    </div>
    <div>
      <h2>Social Security on File</h2>
      <input type="radio" id="yes" value="true" v-model="newVolunteer.socialSecurityOnFile">
      <label for="yes">Yes</label>
      <br>
      <input type="radio" id="no" value="false" v-model="newVolunteer.socialSecurityOnFile">
      <label for="no">No</label>
    </div>
    <button @click="submit()">Submit</button>
    <button @click="onReset">Cancel</button>


  </div>
</template>

<script>
export default {
  data(){
    return{
      newVolunteer:{
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        approvalStatus: '',
        preferredCenters: [],
        skills: [],
        avalibilityTimes: [],
        address: '',
        homePhone: '',
        cellPhone:'',
        workPhone:'',
        email:'',
        educationalBackground:'',
        licenses:[],
        emergencyContactName:'',
        emergencyContactPhone:'',
        emergencyContactEmail:'',
        emergencyContactAddress:'',
        driverLicenseOnFile:false,
        socialSecurityOnFile:false,
      },
      volunteerValidation:{
        firstName: false,
        lastName: false,
        username: false,
        password: false,
        approvalStatus: false,
        address: false,
        cellPhone:false,
        email:false,
        educationalBackground:false,
      },
      timeParing:{
        day: '',
        time: ''
      },
      approvalStati:["Approved","Pending Approval","Disapproved","Inactive"],
      preferredCentersOptions:[
        { text: 'Duval'},
        { text: 'St. John\'s Bluff'},
        { text: 'Riverside'},
        { text: 'Duval North'}
      ],
      skillsOptions:[
        { text: 'Sports'},
        { text: 'Strength'},
        { text: 'Teaching'},
        { text: 'Listening'},
        { text: 'Art'},
        { text: 'Organizing'},
        { text: 'Technology'}
      ],
      education:[
        {text:'None'},
        {text: 'High School Diploma or Equivalent'},
        {text: 'Some College, No Degree'},
        {text: 'Associate\'s Degree'},
        {text: 'Associate\'s Degree'},
        {text: 'Bachelor\'s Degree'},
        {text: 'Apprenticeship'},
        {text: 'Master\'s Degree'},
        {text: 'Doctoral or Professional Degree'}],
      licensesOptions:[
        { text: 'Microsoft'},
        { text: 'Machinery'},
        { text: 'Special Driving'},
        { text: 'Other'}
      ],
      days:[{text:"Monday"},{text:"Tuesday"},{text:"Wednesday"},{text:"Thursday"},{text:"Friday"},{text:"Saturday"}],
      

    }
  },
  methods:{
    onSubmit(event){
      event.preventDefault();
      alert(JSON.stringify(this.newVolunteer));
    },
    onReset(event) {
        event.preventDefault()
    },
    addTime(givenTime){
      console.log(givenTime.day +' '+ givenTime.time)
      if(givenTime.day != '' || givenTime.time != ''){
        this.newVolunteer.avalibilityTimes.push(givenTime.day + ' ' + givenTime.time);
      }
    },
    submit(){
      alert(JSON.stringify(this.newVolunteer));
    } 
  },
    
}
</script>

<style scoped>
button{
  min-width: 80px;
  margin:3vh 1vw 3vh 1vw;
  width:5vw;
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
  display: inline;
}
.form-check{
  display: inline;
}
.check-space{
  margin-left:3px;
}
</style>