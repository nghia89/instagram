import React, { useEffect } from 'react';
import { Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View } from '../components/Themed';
import { setMessage } from '../store/reducers/appReducer';
import { fetchUserAuth } from '../store/reducers/userReducer';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const dispatch = useDispatch();
  const { message } = useSelector((state: any) => state.app);
  const { user } = useSelector((state: any) => state.users);


  const handlePress = () => {
    dispatch(setMessage('Message from Component'));
  };

  useEffect(() => {
    dispatch(fetchUserAuth());
  }, []);

  useEffect(() => {
    console.log('users', user)
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One {message}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title={'Set Message'} onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
