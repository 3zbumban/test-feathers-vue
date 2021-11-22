<template>
  <div class="home">
    <h1>Welcome Home 💚 {{ store.user.username }}</h1>
    <form @submit.prevent="post">
      <input v-model="payload" type="text" placeholder="write something!">
      <input type="submit" value="post!">
    </form>
    <div class="feed scroll scroll--grey" ref="feed">
        <p v-for="(post, index) in posts" :key="index">
            <span><small>{{ index }}:</small> {{ post }}</span>
        </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue"

import api from "../feathers"
import { store } from "../store";

const payload = ref("");
const feed = ref(null);
const posts = reactive([])


const post = async () => {
  console.log(payload.value);
  try {
    const post = await api.service("posts").create({
      text: payload.value,
    });
    console.log(post);
  } catch (error) {
    console.error(error.message);
  }
  payload.value = "";
}

const scrollToBottom = async () => {
  await nextTick(() => {
    feed.value.children[feed.value.children.length-1].scrollIntoView({
        behavior: "smooth",
      block: "end",
    });
  });
}

api.service("posts").on("created", (post) => {
  console.log(post.text);
  posts.push(post.text);
  scrollToBottom();
});

onMounted(async () => {
  try {
    const result = await api.service("posts").find()
    result.data.forEach(post => {
      posts.push(post.text);
    });
    await scrollToBottom();
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
    scroll-behavior: smooth;

    input[type="text"] {
      // padding: 0;
      width: 50rem;
    }
  }

  .feed {
    display: flex;
    flex-direction: column;
    overflow: auto;
    overflow-x: hidden;
    width: 60vw;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 3px;
    margin: 0 0 1rem 0;
    p {
      &:nth-child(even) {
        background-color: yellow;
      }
      background-color: lightgreen;
    }
  }
}
</style>