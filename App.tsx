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
const logo = require('./assets/images/icon.png')

initializeApp(firebaseConfig);
const auth = getAuth();
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [loggedIn, setLoggedIn] = useState(false)

  onAuthStateChanged(auth, user => {
    if (user != null) {
      console.log('We are authenticated now!');
    } else

      console.log('Un authenticated now!');
    // Do other things
  });

  if (!isLoadingComplete)
    return <Image style={{
      padding: 200,
      height: '100%',
      width: '100%'
    }} source={logo} />
  else if (!loggedIn)
    return <SafeAreaProvider>
      <NavigationAuth />
      {/* <StatusBar /> */}
    </SafeAreaProvider>
  else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
