import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Chat from "./Screens/Chat";
import Join from "./Screens/Join";
import FriendList from "./Screens/FriendList";
const AppStack = createStackNavigator({ Home: FriendList, Chat });

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Join
    },
    { initialRouteName: "Join" }
  )
);
