import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './constants/Configs';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useState } from 'react';
import NavigationAuth from './navigation/NavigationAuth';
import useCachedResources from './hooks/useCachedResources';
import { Image } from 'react-native'
import { Provider } from 'react-redux';
import store from './store';
const logo = require('./assets/images/icon.png')

initializeApp(firebaseConfig);
const auth = getAuth();
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [loggedIn, setLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  onAuthStateChanged(auth, user => {
    if (user != null) {
      setLoading(false)
      setLoggedIn(true)
      console.log('We are authenticated now!');
    } else {
      setLoading(false)
      console.log('Un authenticated now!');
    }
    // Do other things
  });

  if (!isLoadingComplete || loading)
    return <Image style={{
      padding: 200,
      height: '50%',
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#FFFFFF'
    }} source={logo} />
  else if (!loggedIn)
    return <SafeAreaProvider>
      <NavigationAuth />
      {/* <StatusBar /> */}
    </SafeAreaProvider>
  else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>

    );
  }
}
