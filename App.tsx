import React, { ReactElement } from "react";
import { Home } from "./src/screens/home/Index";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import { GameContainer } from "./src/components/GameContainer";
import { Question } from "./src/screens/question";
import { Result } from "./src/screens/result/index";
const Stack = createStackNavigator();

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GameContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={"home"}
              options={{
                headerShown: false,
              }}
              component={Home}
            />
            <Stack.Screen
              name={"question"}
              component={Question}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={"result"}
              component={Result}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </GameContainer>
      </NavigationContainer>
    </Provider>
  );
}
