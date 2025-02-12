import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Screen2 = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

 return (
   <View style={[styles.container, { backgroundColor }]}>
     <Text>Chat Screen!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  // background: {
  //   backgroundColor: backgroundColor
  // },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Screen2;