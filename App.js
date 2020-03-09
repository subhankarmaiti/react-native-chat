import React from "react";
import { YellowBox } from "react-native";
import Router from "./src/Router";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSocketMiddleware from "redux-socket.io";
import io from "socket.io-client";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

const socket = io("http://192.168.0.114:5000");
const socketIoMiddleware = createSocketMiddleware(socket, "server/");
function reducer(state = { conversations: {} }, action) {
  switch (action.type) {
    case "users_online":
      const conversations = { ...state.conversations };
      const usersOnline = action.data;
      console.log("ndgfuygdfjhnsdfjhsgfjhgfjfnjhgfjsbnfj", usersOnline);
      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId;
        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            username: usersOnline[i].username
          };
        }
      }
      return { ...state, usersOnline, conversations };
    case "private_message":
      const conversationId = action.data.conversationId;

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages
            ]
          }
        }
      };
    case "self_user":
      return { ...state, selfUser: action.data };
    default:
      return state;
  }
}
const store = createStore(reducer, applyMiddleware(socketIoMiddleware));
store.subscribe(() => {
  console.log("new state", store.getState());
});
export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
