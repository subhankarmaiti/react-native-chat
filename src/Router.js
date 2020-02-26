import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Screens/Home";
import Join from "./Screens/Join";

const AppStack = createStackNavigator({ Home: Home });

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Join
    },
    { initialRouteName: "Join" }
  )
);
