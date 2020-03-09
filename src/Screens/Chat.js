import React, { useEffect, useState, useRef } from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Header } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";
function Chat({ navigation }) {
  const dispatch = useDispatch();
  const selfUser = useSelector(state => state.selfUser);
  const conversations = useSelector(state => state.conversations);
  const userId = navigation.getParam("userId");
  const messages = conversations[userId].messages;
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={messages => {
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: userId }
          });
          dispatch({
            type: "server/private_message",
            data: { message: messages[0], conversationId: userId }
          });
        }}
        user={{
          _id: selfUser.userId
        }}
      />

      {Platform.OS === "android" && (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Header.HEIGHT}
        />
      )}
    </View>
  );
}
Chat.navigationOptions = props => {
  const name = props.navigation.getParam("name", "");
  console.log(name);
  return { title: name };
};
export default Chat;
