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
function reducer(state = {}, action) {
  switch (action.type) {
    case "message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
const store = createStore(reducer, applyMiddleware(socketIoMiddleware));
store.subscribe(() => {
  console.log("new state", store.getState());
});
store.dispatch({ type: "server/hello", payload: "Hello" });
export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
