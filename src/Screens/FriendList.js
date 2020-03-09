import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useSelector } from "react-redux";
export default function FriendList({ navigation }) {
  const usersOnline = useSelector(state => state.usersOnline);

  const { itemContainerStyle, avatarStyle, listItemStyle } = styles;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center"
      }}
    >
      <FlatList
        data={usersOnline}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={itemContainerStyle}
              onPress={() =>
                navigation.navigate("Chat", {
                  name: item.username,
                  userId: item.userId
                })
              }
            >
              <Image style={avatarStyle} source={{ uri: item.avatar }} />
              <View style={listItemStyle}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {item.username}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.userId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: {
    flex: 1,
    flexDirection: "row"
  },
  avatarStyle: { width: 100, height: 100, borderRadius: 50 },
  listItemStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
