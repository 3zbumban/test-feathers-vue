<template>
  <router-view/>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import api from "./feathers";


onMounted(async () => {
  try {
    await api.reAuthenticate()
    console.log("reauthenticated!!")
  } catch (error) {
    console.log(error.message)
  }
});

</script>

<style lang="scss">
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
