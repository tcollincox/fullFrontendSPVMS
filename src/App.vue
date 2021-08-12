<template>
<div id="app">
    <div id="nav">
      <b-nav>
      <b-nav-item active><router-link to="/home"><b-img :src="logo" class="logo"></b-img></router-link></b-nav-item>
      <b-nav-item class="top-space"><router-link to="/Volunteers">Volunteers</router-link></b-nav-item>
      <b-nav-item class="top-space"><router-link to="/Opportunities">Opportunities</router-link></b-nav-item>
      </b-nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      logo: require('./assets/logo.svg')
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pavanam&display=swap');

#app {
  font-family: 'Pavanam', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #FE7A53;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 2vh;
  height: 8vh;
  display: flex;
  align-items: center;
}

#nav a {
  font-weight: bold;
  margin: 0 3px 0 3px;
  color: #ffffff;
  text-decoration: none;
}

.logo{
  height: 4vh;
}

.top-space{
  margin-top:4px;
}



</style>
