import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';

import AsyncStorage from '@react-native-async-storage/async-storage';

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
const Chat = ({ route, navigation, db, isConnected }) => {
  const { name, backgroundColor, uid } = route.params;
  const [messages, setMessages] = useState([]);

  // Store messages locally
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        'cached_messages',
        JSON.stringify(messagesToCache)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Load messages from local storage
  const [isLoading, setIsLoading] = useState(true);

  const loadCachedMessages = async () => {
    try {
      const cached = (await AsyncStorage.getItem('cached_messages')) || '[]';
      setMessages(JSON.parse(cached));
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Set screen title and connect to Firestore
  useEffect(() => {
    navigation.setOptions({ title: name });

    // Firestore real-time listener
    let unsubscribe;

    if (isConnected === true) {
      const messagesQuery = query(
        collection(db, 'messages'),
        orderBy('createdAt', 'desc')
      );

      unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const loadedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate(),
          };
        });
        cacheMessages(loadedMessages);
        setMessages(loadedMessages);
      });
    } else {
      loadCachedMessages(); // load cached messages if offline
    }
    return () => {
      if (unsubscribe) unsubscribe(); // clean up listener
    };
  }, [isConnected]); // re-run when connection changes

  // Send message to Firestore
  const onSend = async (newMessages = []) => {
    if (isConnected) {
      await addDoc(collection(db, 'messages'), newMessages[0]);
    }
  };

  // Customizes the appearance of message bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: { backgroundColor: '#FFF' }, // Received messages
          right: { backgroundColor: '#000' }, // Sent messages
        }}
      />
    );
  };

  // Custom input bar: hide when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    return null;
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
        renderInputToolbar={renderInputToolbar}
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
