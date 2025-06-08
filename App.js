import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import screens
import Start from './components/Start';
import Chat from './components/Chat';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Bubble uses the legacy contextTypes API',
  'MessageText uses the legacy contextTypes API',
  'GiftedChat uses the legacy childContextTypes API',
  'A props object containing a "key" prop is being spread into JSX',
]);

const App = () => {
  
  // Create the navigator
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
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