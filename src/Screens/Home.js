import React, { useEffect, useState, useRef } from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import io from "socket.io-client";
import { Input, Text } from "react-native-elements";
import { GiftedChat } from "react-native-gifted-chat";
import Join from "./Join";
export default function Home() {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [hasJoin, setHasJoin] = useState(false);
  const socket = useRef(null);
  useEffect(() => {
    socket.current = io("http://192.168.0.114:5000");
    socket.current.on("message", message => {
      setReceivedMessages(prevState => GiftedChat.append(prevState, message));
    });
  }, []);

  const onSend = message => {
    console.log(message);
    socket.current.emit("message", message[0].text);
    setReceivedMessages(prevState => GiftedChat.append(prevState, message));
  };
  const joinChat = username => {
    setHasJoin(true);
    socket.current.emit("join", username);
  };
  return (
    <View style={{ flex: 1 }}>
      {hasJoin ? (
        <GiftedChat
          renderUsernameOnMessage
          messages={receivedMessages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1
          }}
        />
      ) : (
        <Join joinChat={joinChat} />
      )}
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
