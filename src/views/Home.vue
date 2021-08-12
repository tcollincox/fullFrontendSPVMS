<template>
<div>
  <h1 class="top-text">
    Manage Your Volunteers and Opportunities
  </h1>
  <div class="centered left">
    <img class="body-img" :src="manageVolunteers" />
    <h2  @click="$router.push('Volunteers')"  class="page-link-mine">Manage Volunteers</h2>
    <p class="limited">Going to Manage Volunteers allows you to filter, search, edit, delete, and match volunteers.</p>
  </div>
  <div class="centered right">
    <img class="body-img" :src="manageOpportunities" />
    <h2 @click="$router.push('Opportunities')" class="page-link-mine">Manage Opportunities</h2>
    <p class="limited">Going to Manage Opportunities allows you to filter, search, edit, delete, and match opportunities.</p>
  </div>
</div>

</template>

<script>
export default {
  data(){
    return{
      manageVolunteers: require('../assets/manageVolunteers.svg'),
      manageOpportunities: require('../assets/manageOpportunities.svg'),

    }
  }
}
</script>

<style scoped>
  h1{
  font-size: 64px;
}
.homeText{
    font-size: 35px;
    text-align: center;
    position: relative;
}
ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.link{
  float:right;
  display: block;
  color: white;
  text-align: center;
  padding: 22px 40px;
  text-decoration: none;
}
.edge{
  padding-right:60px;
}

.logo{
  float:left;
  display: block;
  color: white;
  text-align: center;
  padding: 13px 26px;
  text-decoration: none;
  
}
.left{
  float: left;
  width:50%;
  text-align: center;
}

.right{
  float:right;
  width:50%;
  text-align: center;
}
.limited{
  margin:0 auto;
  margin-top:3vh;
  width:20vh;
}
.navbar{
  background-color:#FE7A53;
}
.navbar-brand{
  padding-left: 10vh;
}
.navbar-nav{
  color:white;
}
.nav-item{
  color:white;
}
.body-img{
  height: 300px;
  margin-top:10vh;
  margin-bottom: 5vh;
}
.top-text{
  margin-top:5vh;
}

.page-link-mine{
  color:#FE7A53;
  border:none;
  text-decoration: underline;
}

.page-link-mine:hover{
  color:cornflowerblue;
  cursor: pointer;
}
</style>