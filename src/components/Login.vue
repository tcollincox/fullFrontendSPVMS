<template>
    <div>
        <div class="split left">
            <div class="colored-background">
                <div class="logo">
                    <img :src="logo" alt="Volunteer Managment Logo">
                </div>
                <div class="centered">
                    <img :src="loginPicture" alt="woman organizing">
                </div>
            </div>
        </div>
        <div class="split right">
            <div class="centered">
                <h1>Sign In</h1>
                <p>Enter in your username and password</p>
                <p class="alert" v-show="!this.loginChecker">Username or password is incorrect</p>
                <b-form-input class="form" type="text" name="username" v-model="input.username" placeholder="Username" />
                <b-form-input class="form" type="password" name="password" v-model="input.password" placeholder="Password" />
                <b-button pill class="form button" type="button" v-on:click="login()">Sign In</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Login",
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                },
                loginPicture: require('../assets/loginPic.svg'),
                logo: require('../assets/logo.svg'),
                admin: [],
                loginChecker: true,
            }
        },
        methods: {
            async login() {
                var loginChecking = false;
                await axios.get('http://localhost:3001/admins')
                .then((response) => {
                    this.admin = response.data;
                });
                for(var i = 0; i < this.admin.length; i++ ){
                    if(this.input.username == this.admin[i].username && this.input.password == this.admin[i].password){
                        loginChecking = true;
                        this.$store.commit("setAuthentication", true);
                        this.$router.replace({ name: "home" });
                    }
                }
                if(loginChecking == false){
                    this.loginChecker = false;
                }
                else{
                    this.loginChecker = true;
                }
            }
        }
    }
</script>

<style scoped>
    .split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
  padding-top: 0px;
}

.left {
  left: 0;
  background-color: white;
}

.right {
  right: 0;
  background-color: white;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.form{
    margin: 10px 0px 10px 0px
}
.colored-background{
    height: 100%;
    width: 100%;
    background-color: #FE7A53;
    border-radius: 0px 20px 20px 0px;
}

.centered img {
  width: 100%;
}

.logo{
    position: absolute;
    margin: 10px 10px 10px 10px;
}

.button{
    background-color:#FE7A53;
    border: none;
    width: 100%;
}
.alert{
    color:red;
}
</style>