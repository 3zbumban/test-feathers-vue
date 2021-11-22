import { reactive } from 'vue';

export const store = reactive({
  user: {
    username: "",
    id: "",
  }
})

export const setUser = (username, id) => {
  console.log({ username, id });
  store.user.username = username;
  store.user.id = id;
}

// module.exports = {
//   store,
//   setUser: setUser
// }