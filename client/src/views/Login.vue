<template>
  <div>
    <form @submit.prevent="login" class="signUp">
      <h1>Login!</h1>
      <input v-model="user.username" type="text" placeholder="username">
      <input v-model="user.password" type="password" placeholder="password">
      <input type="submit" value="Login!">
    </form>
    <input @click.prevent="router.push({ path: '/signup'})" value="SignUp!" type="button">
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import api from '../feathers';
import { setUser } from '../store';

const router = useRouter();

const user = reactive({
  username: '',
  password: '',
  // confirmPassword: '',
});

const login = async () => {
  console.log(user)
  // await api.reAuthenticate()
  try {
    const created = await api.authenticate({
      strategy: 'local',
      ...user,
    })
    console.log('User logged in!')
    console.log(created)
    setUser(created.user.username, created.user._id)
    await router.push({path: '/home'})
  } catch (error) {
    console.log(error.message); 
  }
}

</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
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
