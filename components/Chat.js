import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Keyboard,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// Polyfill to suppress legacy removeListener API warning
if (!Keyboard.removeListener) {
  Keyboard.removeListener = () => {}; // No-op shim
}

// Main Chat screen component
const Chat = ({ route, navigation }) => {
  // Extract user name and background color passed from Start screen
  const { name, backgroundColor } = route.params;

  // State to store chat messages
  const [messages, setMessages] = useState([]);

  // Set screen title and initial messages when component mounts
  useEffect(() => {
    navigation.setOptions({ title: name });

    setMessages([
      {
        _id: 1,
        text: 'Hello developer!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'You’ve entered the chat',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // Function to handle sending new messages
  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  // Customizes the appearance of message bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: { backgroundColor: '#FFF' },   // Received messages
          right: { backgroundColor: '#000' },  // Sent messages
        }}
      />
    );
  };

  // Wraps chat in KeyboardAvoidingView to handle keyboard visibility on iOS/Android
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ _id: 1 }}
        renderBubble={renderBubble}
        renderTime={() => null}  // Disable default time display to avoid context errors
        renderDay={() => null}   // Disable default day display to avoid context errors
      />
    </KeyboardAvoidingView>
  );
};

// Styles for Chat screen layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
