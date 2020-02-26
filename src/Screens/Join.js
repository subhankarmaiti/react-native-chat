import React, { useState } from "react";
import {
  Button,
  View,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView
} from "react-native";

import { useDispatch } from "react-redux";
export default function Join(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../../assets/chat-icon.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          style={{ fontSize: 30, textAlign: "center" }}
          placeholder="Enter username"
          value={username}
          onChangeText={setUsername}
        />
        <Button
          title="Join Chat"
          onPress={() => {
            dispatch({ type: "server/join", payload: username });
            props.navigation.navigate("App");
          }}
        />
      </View>
      <KeyboardAvoidingView behavior="padding" />
    </View>
  );
}
