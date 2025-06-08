import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

// Polyfill to suppress legacy removeListener API warning
if (!Keyboard.removeListener) {
  Keyboard.removeListener = () => {}; // No-op shim
}

// Main Chat screen component
const Chat = ({ route, navigation, db }) => {
  // Extract user info and screen styling props
  const { name, backgroundColor, uid } = route.params;

  // State to store chat messages
  const [messages, setMessages] = useState([]);

  // Set screen title and connect to Firestore
  useEffect(() => {
    navigation.setOptions({ title: name });

    // Firestore real-time listener
    const messagesQuery = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        };
      });
      setMessages(loadedMessages);
    });

    return unsubscribe;
  }, []);

  // Send message to Firestore
  const onSend = async (newMessages = []) => {
    await addDoc(collection(db, 'messages'), newMessages[0]);
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
        onSend={onSend}
        user={{ _id: uid, name: name }}
        renderBubble={renderBubble}
        renderTime={() => null}
        renderDay={() => null}
      />
    </KeyboardAvoidingView>
  );
};

// Styles for Chat screen layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;