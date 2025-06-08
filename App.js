import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Firebase Modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
  // Firebase config
  const firebaseConfig = {
    apiKey: 'AIzaSyBGI0gxyHOdXgX4ZAOvukoFwHGxLQHZNQY',
    authDomain: 'chat-app-gregory.firebaseapp.com',
    projectId: 'chat-app-gregory',
    storageBucket: 'chat-app-gregory.appspot.com',
    messagingSenderId: '134124049544',
    appId: '1:134124049544:web:e04c52326affc8bfa5bb3d',
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  // Create the navigator
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start">
          {(props) => <Start auth={auth} {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;
