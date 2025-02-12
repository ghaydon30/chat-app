import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState('');

  const colors = [
    '#090C08',
    '#474056',
    '#8A95A5',
    '#B9C6AE'
  ]

  return (
    <ImageBackground 
      source={require('../assets/A5-chatapp-assets/Background Image.png')} 
      style={styles.imageBackground}
      accessible={true}
      accessibilityLabel="Background image"
      accessibilityHint="Displays the background image of the start screen"
    >
      <Text style={styles.appTitle}>Chat App</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder='Your Name'
        />
        <Text style={styles.chooseBackgroundText}>Choose Background Color:</Text>
        <View style={styles.circlesContainer}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorCircle, { backgroundColor: color }]}
              onPress={() => navigation.navigate('Screen2', { name: name, backgroundColor: color })}
              // onPress={() => navigation.navigate('Screen2', { name: name})}
            />
          ))}
        </View>
        <TouchableOpacity
           accessible={true}
           accessibilityRole="button"
           accessibilityHint="Lets you choose to enter the chat room"
           style={styles.button}
           onPress={() => navigation.navigate('Screen2', { name: name})}
         >
           <Text style={styles.buttonText}>Start Chatting</Text>
         </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // height: '44%',
    // marginBottom: 40,
    // backgroundColor: '#ffffff'
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
  // contentContainer: {
  //   backgroundColor: '#ffffff', 
  //   // backgroundColor: '#f2f2f2',
  //   borderRadius: 4,
  //   width: '88%',
  //   height: '50%', 
  //   alignItems: 'center',
  //   justifyContent: 'space-around', 
  // },
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

export default Screen1;