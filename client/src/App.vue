<template>
    <router-view/>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import api from "./feathers";
import { setUser } from "./store";

const router = useRouter();

onMounted(async () => {
  try {
    const { user } = await api.reAuthenticate()
    console.log(user)
    console.log("reauthenticated!!")
    setUser(user.username, user._id)
  } catch (error) {
    console.log(error.message)
    localStorage.removeItem("feathers-jwt");
    document.cookie = "";
    await router.push({ path: "/signup" })
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
