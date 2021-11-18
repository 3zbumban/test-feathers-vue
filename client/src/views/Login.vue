<template>
<div>
  <form @submit.prevent="login" class="signUp">
    <h1>Login!</h1>
    <input v-model="user.username" type="text" placeholder="username">
    <input v-model="user.password" type="password" placeholder="password">
    <input type="submit" value="Login!">
  </form>
</div>
<!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
<!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { reactive } from '@vue/reactivity';
import api from '../feathers';

const user = reactive({
  username: '',
  password: '',
  // confirmPassword: '',
});

const login = () => {
  console.log(user)
  api.authenticate({
    strategy: 'local',
    ...user,
    confirmPassword: user.password,
  }).then((user) => {
    console.log('User logged in!')
    console.log(user)
  }).catch((error) => {
    console.log(error.message)
  })
}

</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
  .signUp {
    display: flex;
    flex-direction: column;
    align-items: center;
    width:  50vw;
    
    input {
      margin: 10px;
    }
  }
}
</style>
