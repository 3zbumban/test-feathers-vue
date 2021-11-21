import io from "socket.io-client/dist/socket.io";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import auth from "@feathersjs/authentication-client";

const socket = io("http://localhost:3030");
const client = feathers();

client.configure(socketio(socket, {
    transports: ["websocket"],
    timeout: 2500,
    forceNew: true,
  })
);
client.configure(auth(
  { 
    storage: window.localStorage, 
    storageKey: "feathers-jwt", 
    userService: "users",
    usernameField: "username",
    passwordField: "password",
  }
));

// client.service("users").create({
//     username: "asd1",
//     password: "asd"
// }).then(user => {
//     console.log(user);
// }).catch(error => {
//     console.error(error.message);
// });

// const messageService = client.service('messages');

// messageService.on('created', message => console.log('Created a message', message));

// // Use the messages service from the server
// messageService.create({
//   text: 'Message from client'
// });

export default client;