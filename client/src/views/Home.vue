<template>
  <div class="home">
    <h1>Welcome Home 💚</h1>
    <form @submit.prevent="post">
      <input v-model="payload" type="text" placeholder="write something!">
      <input type="submit" value="post!">
    </form>
    <div>
      <ul>
        <li v-for="(post, index) in posts" :key="index">
            <h3>{{ index }}</h3>
            <p>{{ post }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// import { reactive } from "@vue/reactivity";
import { ref, reactive } from "vue"
import api from "../feathers"

const payload = ref("");

const posts = reactive([])

const post = async () => {
  console.log(payload.value);
  try {
    const post = await api.service("posts").create({
      strategy: 'jwt',
      accessToken: localStorage.getItem("feathers-jwt"),
      text: payload.value,
    });
    console.log(post);
  } catch (error) {
    console.error(error.message);
  }
  payload.value = "";
}

api.service("posts").on("created", (post) => {
  console.log(post.text);
  posts.push(post.text);
});

</script>


<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 80rem;

  form {
    display: flex;
    flex-direction: row;
    justify-items: baseline;
    // input {
      // padding: 0;
    // }
  }
}
</style>