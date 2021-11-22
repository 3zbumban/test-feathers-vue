import { reactive } from 'vue';

export const store = reactive({
  user: {}
})

export const setUser = (username, id) => {
  store.user.username = username;
  store.user.id = id;
}

// module.exports = {
//   store,
//   setUser: setUser
// }