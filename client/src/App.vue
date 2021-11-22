<template>
    <router-view/>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import api from "./feathers";
import { setUser } from "./store";

// const { user } = store

onMounted(async () => {
  try {
    const user = await api.reAuthenticate()
    console.log(user)
    console.log("reauthenticated!!")
    setUser(user.username, user._id)
  } catch (error) {
    console.log(error.message)
  }
});

</script>

<style lang="scss">
@import "../scss/scrollbars.scss";

html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  margin: 0;
  overflow: hidden;
}
</style>
