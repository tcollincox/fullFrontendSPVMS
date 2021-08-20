<template>
  <div id="page">
    <h3>Full Detail</h3>
    <div>
      <p class="inline margin"><b>First Name:</b> {{volunteer.firstName}}</p>
      <p class="inline margin"><b>Last Name:</b> {{volunteer.lastName}}</p>
    </div>
    <div>
      <p class="inline margin"><b>Username:</b> {{volunteer.username}}</p>
      <p class="inline margin"><b>Password:</b> {{volunteer.password}}</p>
    </div>
    <p><b>Approval Status:</b> {{volunteer.approvalStatus}}</p>
    <div>
      <p class="inline"><b>Preferred Centers: </b></p>
      <p class="inline margin"  v-for="center in volunteer.preferredCenters" :key="center.id">{{center}}</p>
      </div>
    <div>
      <p class="inline"><b>Skills:</b></p>
      <p class="inline margin" v-for="skill in volunteer.skills" :key="skill.id">{{skill}}</p>
    </div>
    <div>
      <p class="inline"><b>Avalibility Times: </b></p>
      <p class="inline margin" v-for="time in volunteer.avalibilityTimes" :key="time.id">{{time}}</p>
    </div>
    <div>
      <p class="inline"><b>Licenses:</b></p>
      <p class="inline" v-for="licence in volunteer.licenses" :key="licence.id">{{licence}}</p>
    </div>
    <p><b>Address:</b> {{volunteer.address}}</p>
    <p><b>Home Phone:</b> {{volunteer.homePhone}}</p>
    <p><b>Cell Phone:</b> {{volunteer.cellPhone}}</p>
    <p><b>Work Phone:</b> {{volunteer.workPhone}}</p>
    <p><b>Email:</b> {{volunteer.email}}</p>
    <p><b>Educational Background:</b> {{volunteer.educationalBackground}}</p>
    <p><b>Emergency Contact Name:</b> {{volunteer.emergencyContactName}}</p>
    <p><b>Emergency Contact Phone: </b>{{volunteer.emergencyContactPhone}}</p>
    <p><b>Emergency Contact Email:</b> {{volunteer.emergencyContactEmail}}</p>
    <p><b>Social Security:</b> {{volunteer.socialSecurityOnFile}}</p>
    <p><b>Drivers License:</b> {{volunteer.driverLicenseOnFile}}</p>
    <div>
      <b-button class="inline" @click="$emit('change-to-display')">Back to display</b-button>
      <b-button  class="inline" @click="$emit('change-to-edit')">Edit</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props:[
    'volunteer'
  ]
}
</script>

<style scoped>
#page{
  display:flex;
  justify-content:center;
  flex-direction:column;
}
button{
  min-width: 80px;
  margin: 4vh 2vw 4vh 2vw;
  background-color:#FE7A53;
  border:none;
  width: 150px;
  border-radius: 20px;
}
li{
  list-style: none;
  display: inline;
  margin: 0px 0px 0px 10px;
}
.inline{
  display: inline;
}
.margin{
  margin: 5px 10px;
}
</style>