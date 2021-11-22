<template>
  <div class="home">
    <h1>Welcome Home 💚 <span v-if="store.user.username" class="username">~ {{ store.user.username }}</span></h1>
    <button @click.prevent="logout">Logout</button>
    <form @submit.prevent="post">
      <input v-model="payload" type="text" placeholder="write something!">
      <input type="submit" value="post!" class="button-primary">
    </form>
    <div class="feed scroll scroll--grey" ref="feed">
        <p v-for="(post, index) in posts" :key="index">
            <span><small>{{ post.user }}:</small> {{ post.text }}</span>
        </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue"

import api from "../feathers"
import { store, setUser } from "../store";
import { useRouter } from "vue-router";

const feed = ref(null);
const router = useRouter();

const payload = ref("");
const posts = reactive([])

const logout = async () => {
  try {
    setUser("", "");
    await api.logout()
    await router.push({ path: "/login" })
  } catch (error) {
    console.log(error.message)
  }
}

const post = async () => {
  console.log(payload.value);
  if (payload.value.length > 0) {
  try {
    const post = await api.service("posts").create({
      text: payload.value,
      user: store.user.username
    });
    // console.log(post);
  } catch (error) {
    console.error(error.message);
  }
  payload.value = "";
  } else {
    console.log("no post");
  }
}

const scrollToBottom = async () => {
  await new Promise((res, rej) => {
    setTimeout(async () => {
      await nextTick(() => {
        feed.value.children[feed.value.children.length-1].scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
        res();
      });
    }, 600);
  });
}

api.service("posts").on("created", (post) => {
  console.log(post);
  posts.push({...post});
  scrollToBottom();
});

onMounted(async () => {
  try {
    const result = await api.service("posts").find()
    console.log(result);
    result.data.forEach(post => {
      posts.push({...post});
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
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10px;

  form {
    display: flex;
    flex-direction: row;
    justify-items: baseline;
    scroll-behavior: smooth;

    input[type="text"] {
      width: 50vw;
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

.username {
  text-decoration: underline;
  text-decoration-style: dotted;
  background-color: lightgreen;
  border-radius: 0.5rem;
}
</style>