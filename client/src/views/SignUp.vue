<template>
<div>
  <form @submit.prevent="signUp" class="signUp">
    <h1>SignUp!</h1>
    <input v-model="user.username" type="text" placeholder="username">
    <input v-model="user.password" type="password" placeholder="password">
    <input v-model="user.confirmPassword" type="password" placeholder="confirm password">
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
import { useRouter } from 'vue-router';
import api from '../feathers';

const router = useRouter();

const user = reactive({
  username: '',
  password: '',
  confirmPassword: '',
});

const signUp = () => {
  // if (user.password !== user.confirmPassword) {
  //   alert('Passwords do not match!')
  //   return
  // }
  api.service("users").create({
    strategy: 'local',
    ...user
  }).then((user) => {
    console.log('User signed up!')
    console.log(user)
    router.push({ path: '/login'})
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
