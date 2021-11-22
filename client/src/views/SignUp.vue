<template>
  <div>
    <form @submit.prevent="signUp" class="signUp">
      <h1>SignUp!</h1>
      <input v-model="user.username" type="text" placeholder="username">
      <input v-model="user.password" type="password" placeholder="password">
      <input v-model="user.confirmPassword" type="password" placeholder="confirm password">
      <input type="submit" value="Sign up!">
    </form>
    <input @click.prevent="router.push({ path: '/login'})" value="login!" type="button">
  </div>
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

const signUp = async () => {
  // if (user.password !== user.confirmPassword) {
  //   alert('Passwords do not match!')
  //   return
  // }
  try {
    const created = await api.service("users").create({
      strategy: 'local',
      username: user.username,
      password: user.password,
    })
    console.log('User signed up!')
    console.log(created)
    await router.push({ path: '/login'}) 
  } catch (error) {
    console.log(error.message)
  }
}

</script>

<style lang="scss" scoped>
div {
  display: flex;
  justify-content: center;
  flex-direction: column;
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
