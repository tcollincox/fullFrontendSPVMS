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
    <h2>Personal Info</h2>
    <div class="form-line">
      <span class="form-line__field">
        <label for="firstName">First Name:</label>
        <input v-model="newVolunteer.firstName" placeholder="First name" class="input" id="firstName">
      </span>
      <span class="form-line__field">
        <label for="lastName">Last Name:</label>
        <input v-model="newVolunteer.lastName" placeholder="Last name" class="input" id="lastName">
      </span>
    </div>
    <div class="form-line">
      <span class="form-line__field">
        <label for="username">Username:</label>
        <input v-model="newVolunteer.username" placeholder="Username" autocomplete="off" class="input" id="username">
      </span>
      <span class="form-line__field"> 
        <label for="password">Password:</label>
        <input :type=field.password v-model="newVolunteer.password" placeholder="Password" class="input" id="passwword" value="" @focus="changeType" @blur="changeType" autocomplete="off"> 
      </span>
    </div>
    <h2>Contact Info</h2>
    <div class="form-line">
      <label for="address">Address:</label>
      <input v-model="newVolunteer.address" placeholder="Address" class="input" id="address">
    </div>
    <div class="form-line">
      <h4>Phones: Enter in format 904-444-4444 (Only Cell Required)</h4>
      <span>
        <label for="cell-phone">Cell:</label>
        <input v-model="newVolunteer.cellPhone" type="tel" id="cell-phone" name="phone" placeholder="904-444-4444">
      </span>
      <span>
        <label for="work-phone">Work:</label>
        <input v-model="newVolunteer.workPhone" type="tel" id="work-phone" name="phone" placeholder="904-444-4444">
      </span>
      <span>
        <label for="home-phone">Home:</label>
        <input v-model="newVolunteer.homePhone" type="tel" id="home-phone" name="phone" placeholder="904-444-4444">
      </span>
    </div>
    <div>
      <label for="email" class="margin-top-bottom">Email:</label>
      <input v-model="newVolunteer.email" placeholder="Email" class="input" id="email">
    </div>
    <h2>Volunteer Based Info</h2>
    <h3>Avalibility Times</h3>
    <label for="avalibility-times">Choose day and start time parings: </label>
    <select id="day" name="day" v-model="timeParing.day" class="time-input">
      <option v-for="day in days" :key="day.id" >{{day.text}}</option>
    </select>
    <input id="avalibility-times" type="time" name="avalibility-times"
          v-model="timeParing.time" class="time-input">
    <b-button @click="addTime(timeParing)">Add Time</b-button>
    <span>
      <ul>
        <li v-for="(times, i) in newVolunteer.avalibilityTimes" :key="times.id" class="chosenTime" v-on:click="deleteOption(i)"><span class="chosen-times" >{{times}} <span class="delete-click" ><b>x</b></span></span></li>
      </ul>
    </span>
    <div>
      <label for="education">Highest Level of Education: </label>
      <select id="education" name="education" v-model="newVolunteer.educationalBackground" >
        <option v-for="level in education" :key="level.id">{{level.text}}</option>
      </select>
    </div>
    <h3>Preferred Center</h3>
    <div class="form-line form-check" v-for="preferredCenter in preferredCentersOptions" :key="preferredCenter.id">
      <label class="form-label-checkbox" :for="preferredCenter.id">{{preferredCenter.text}}</label>
      <input type="checkbox" v-model="newVolunteer.preferredCenters" :id="preferredCenter.text" :value="preferredCenter.text" class="check-space">
    </div>
    <br/>
    <h3>Skills</h3>
    <div class="form-line form-check" v-for="skill in skillsOptions" :key="skill.id">
      <label class="form-label-checkbox" :for="skill.id">{{skill.text}}</label>
      <input type="checkbox" v-model="newVolunteer.skills" :id="skill.text" :value="skill.text" class="check-space">
    </div>
    
    <h3>Licences</h3>
    <div class="form-line form-check" v-for="licenses in licensesOptions" :key="licenses.id">
      <label class="form-label-checkbox" :for="licenses.id">{{licenses.text}}</label>
      <input type="checkbox" v-model="newVolunteer.licenses" :id="licenses.text" :value="licenses.text" class="check-space">
    </div>
    <h2>Emergency Contact Info</h2>
    <div class="form-line">
        <label for="firstName">Emergency Contact Name: </label>
        <input v-model="newVolunteer.emergencyContactName" placeholder="Name" class="input" id="emergencyContactName">
    </div>
    <div class="form-line">
      <label for="email">Emergency Contact Email: </label>
      <input v-model="newVolunteer.emergencyContactEmail" placeholder="Email" id="emergencyContactEmail">
    </div>
    <div class="form-line">
      <label for="address">Emergency Contact Address: </label>
      <input v-model="newVolunteer.emergencyContactAddress" placeholder="Address" class="input" id="emergencyContactAddress">
    </div>
    <h2>Ready to Approve</h2>
    <div class="form-line">
      <label for="status">Approval Status</label>
      <select id="status" name="status" v-model="newVolunteer.approvalStatus" >
        <option v-for="approvalStatus in approvalStati" :key="approvalStatus.id">{{approvalStatus}}</option>
      </select>
    </div>
    <div class="form-line">
      <h3>Drivers License on File</h3>
      <input type="radio" id="yes" value="true" v-model="newVolunteer.driverLicenseOnFile">
      <label for="yes">Yes</label>
      <br>
      <input type="radio" id="no" value="false" v-model="newVolunteer.driverLicenseOnFile">
      <label for="no">No</label>
    </div>
    <div class="form-line">
      <h3>Social Security on File</h3>
      <input type="radio" id="yes" value="true" v-model="newVolunteer.socialSecurityOnFile">
      <label for="yes">Yes</label>
      <br>
      <input type="radio" id="no" value="false" v-model="newVolunteer.socialSecurityOnFile">
      <label for="no">No</label>
    </div>
    <b-button @click="submit()">Submit</b-button>
    <b-button @click="clearForm()">Reset</b-button>


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
      field:{
        password:'text'
      },
      users: []
      

    }
  },
  methods:{
    addTime(givenTime){
      let notCurrentlyIn = true;
      for(var i = 0; i< this.newVolunteer.avalibilityTimes.length; i++){
        if((givenTime.day + ' ' + givenTime.time) == this.newVolunteer.avalibilityTimes[i]){
          notCurrentlyIn = false;
        }
      }
      if(notCurrentlyIn && (givenTime.day != null || givenTime.time != null)){
        this.newVolunteer.avalibilityTimes.push(givenTime.day + ' ' + givenTime.time);
      }
    },
    submit(){
      if(this.validate()){
        this.axios.post('http://localhost:3001/volunteers/Post', {
          firstName: this.newVolunteer.firstName,
          lastName: this.newVolunteer.lastName,
          username: this.newVolunteer.username,
          password: this.newVolunteer.password,
          approvalStatus: this.newVolunteer.approvalStatus,
          preferredCenters: this.newVolunteer.preferredCenters,
          skills: this.newVolunteer.skills,
          avalibilityTimes: this.newVolunteer.avalibilityTimes,
          address: this.newVolunteer.address,
          homePhone: this.newVolunteer.homePhone,
          cellPhone: this.newVolunteer.cellPhone,
          workPhone: this.newVolunteer.workPhone,
          email: this.newVolunteer.email,
          educationalBackground: this.newVolunteer.educationalBackground,
          licenses: this.newVolunteer.licenses,
          emergencyContactName: this.newVolunteer.emergencyContactName,
          emergencyContactPhone: this.newVolunteer.emergencyContactPhone,
          emergencyContactEmail: this.newVolunteer.emergencyContactEmail,
          emergencyContactAddress: this.newVolunteer.emergencyContactAddress,
          driverLicenseOnFile: this.newVolunteer.driverLicenseOnFile,
          socialSecurityOnFile: this.newVolunteer.socialSecurityOnFile,
        })
        
        this.clearForm();
      }
    },
    changeType(){
      this.field.password = 'password';
    },
    deleteOption(i){
      this.newVolunteer.avalibilityTimes.splice(i,1);
    },
    validate(){
      let validation = true;
      let regexPhone = new RegExp('[0-9]{3}-[0-9]{3}-[0-9]{4}');
      let phonePatternCheck = regexPhone.test(this.newVolunteer.cellPhone);
      let usernameExists = this.usernames.includes(this.newVolunteer.username);
      if(this.newVolunteer.firstName == ''){
        this.volunteerValidation.firstName = true;
        validation = false;
      }
      else{this.volunteerValidation.firstName = false}
      if(this.newVolunteer.lastName == ''){
        this.volunteerValidation.lastName = true;
        validation = false;
      }
      else{this.volunteerValidation.lastName = false}
      if(this.newVolunteer.username == '' || usernameExists){
        this.volunteerValidation.username = true;
        validation = false;
      }
      else{this.volunteerValidation.username = false}
      if(this.newVolunteer.password == ''){
        this.volunteerValidation.password = true;
        validation = false;
      }
      else{this.volunteerValidation.password = false}
      if(this.newVolunteer.approvalStatus == ''){
        this.volunteerValidation.approvalStatus = true;
        validation = false;
      }
      else{this.volunteerValidation.approvalStatus = false}
      if(this.newVolunteer.address == ''){
        this.volunteerValidation.address = true;
        validation = false;
      }
      else{this.volunteerValidation.address = false}
      if(this.newVolunteer.cellPhone == '' || !phonePatternCheck ){
        this.volunteerValidation.cellPhone = true;
        validation = false;
      }
      else{this.volunteerValidation.cellPhone = false}
      if(this.newVolunteer.email == ''){
        this.volunteerValidation.email = true;
        validation = false;
      }
      else{this.volunteerValidation.email = false}
      if(this.newVolunteer.educationalBackground == ''){
        this.volunteerValidation.educationalBackground = true;
        validation = false;
      }
      else{this.volunteerValidation.educationalBackground = false}
      return validation;
    },
    clearForm(){
        this.newVolunteer.firstName= '';
        this.newVolunteer.lastName= '';
        this.newVolunteer.username= '';
        this.newVolunteer.password= '';
        this.newVolunteer.approvalStatus= '';
        this.newVolunteer.preferredCenters= [];
        this.newVolunteer.skills= [];
        this.newVolunteer.avalibilityTimes= [];
        this.newVolunteer.address= '';
        this.newVolunteer.homePhone= '';
        this.newVolunteer.cellPhone= '';
        this.newVolunteer.workPhone= '';
        this.newVolunteer.email= '';
        this.newVolunteer.educationalBackground= '';
        this.newVolunteer.licenses= [];
        this.newVolunteer.emergencyContactName= '';
        this.newVolunteer.emergencyContactPhone= '';
        this.newVolunteer.emergencyContactEmail= '';
        this.newVolunteer.emergencyContactAddress= '';
        this.newVolunteer.driverLicenseOnFile= false;
        this.newVolunteer.socialSecurityOnFile= false;
      }
  },
  mounted(){
    this.axios
      .get('http://localhost:3001/volunteers')
      .then(response => (this.users = response.data))
  },
  computed: {
    usernames: function(){
      let usernameList = [];
      for(var i = 0; i<this.users.length;i++){
        usernameList.push(this.users[i].username);
      }
      return usernameList;
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