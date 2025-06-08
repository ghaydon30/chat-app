import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

// Main Start screen component
const Start = ({ navigation }) => {
  // State to store user's name input
  const [name, setName] = useState('');

  // State to store selected background color
  const [selectedColor, setSelectedColor] = useState('');

  // Available background color options
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  // Start screen UI content wrapped in ImageBackground
  const content = (
    <ImageBackground
      source={require('../assets/A5-chatapp-assets/Background Image.png')}
      style={styles.imageBackground}
      accessible={true}
      accessibilityLabel="Background image"
      accessibilityHint="Displays the background image of the start screen"
    >
      <Text style={styles.appTitle}>Chat App</Text>

      <View style={styles.container}>
        {/* Text input for user name */}
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
        />

        {/* Label for color selection */}
        <Text style={styles.chooseBackgroundText}>
          Choose Background Color:
        </Text>

        {/* Color selection buttons */}
        <View style={styles.circlesContainer}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorCircle, { backgroundColor: color }]}
              onPress={() => setSelectedColor(color)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Select ${color} background`}
              accessibilityHint="Sets the background color for your chat screen"
            />
          ))}
        </View>

        {/* Button to navigate to Chat screen */}
        <TouchableOpacity
          accessible={true}
          accessibilityRole="button"
          accessibilityHint="Lets you choose to enter the chat room"
          style={styles.button}
          onPress={() =>
            navigation.navigate('Chat', {
              name,
              backgroundColor: selectedColor,
            })
          }
        >
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  // Wrap in KeyboardAvoidingView on iOS to prevent keyboard overlap
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      {content}
    </KeyboardAvoidingView>
  ) : (
    content
  );
};

// Stylesheet for Start screen
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    height: "44%",
    width: "88%",
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#fff",
    padding: 15
  },
  appTitle: {
    flex: 1,
    fontSize: 45, 
    fontWeight: '600', 
    color: '#FFFFFF',
    margin: 25,
    marginTop: 75
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16
  }, 
  chooseBackgroundText: {
    fontSize: 16, 
    fontWeight: 300, 
    color: '#757083',
    opacity: '100%',
  },
  circlesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '88%',
    marginBottom: 20,
  },
  colorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    alignItems: 'center',
    backgroundColor: '#757083',
    borderRadius: 4,
    height: '20%',
    justifyContent: 'center',
    padding: 10,
    width: '88%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});

export default Start;