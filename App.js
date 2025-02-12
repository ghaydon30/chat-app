import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

const App = () => {
  
  // Create the navigator
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Screen1"
      >
        <Stack.Screen
          name="Screen1"
          component={Screen1}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;

/* TASKS:

1. 
  On the start screen, add a text input field and a button as per the 
  screen design provided in your project brief.
  - Add the decal from the assets

2. 
  Apply the appropriate stylings to your start screen as per the handoff document.

3. 
  background image that can be used as your start screen’s background 
  (as per the image in your project brief) instead of just a color. 
  Use the React Native component ImageBackground to implement this in your start screen.

4. 
  Add the different colors the user can choose from when setting the 
  background color of their chat app’s UI.

  Use fixed widths and heights to display the colors in your layout.

  Use borderRadius to create circles. T

5. 
  Display the user’s name in the navigation bar at the top of the chat screen.

6. 
  Set the chat screen’s background to the color chosen by the user in the start screen.

7. 
  Include a README file.
*/