<template>
  <div class="home">
    <h1>Welcome Home 💚</h1>
    <form @submit.prevent="post">
      <input v-model="payload" type="text" placeholder="write something!">
      <input type="submit" value="post!">
    </form>
    <div class="posts">
      <ul>
        <li v-for="(post, index) in posts" :key="index">
            <span><small>{{ index }}:</small> {{ post }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue"
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

onMounted(async () => {
  try {
    const result = await api.service("posts").find()
    result.data.forEach(post => {
      posts.push(post.text);
    });
  } catch (error) {
    console.log(error.message)
  }
});

</script>


<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-content: center;
  // justify-content: center;
  align-items: center;
  // width: 80rem;
  height: 100%;
  width: 100%;

  form {
    display: flex;
    flex-direction: row;
    justify-items: baseline;
    input[type="text"] {
      // padding: 0;
      width: 50rem;
    }
  }

  .posts {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
}
</style>