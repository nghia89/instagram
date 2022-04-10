
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, Image, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../constants/Configs';
import { initializeApp } from 'firebase/app';
import { AdPostData } from '../api/userApi';

initializeApp(firebaseConfig)
const auth = getAuth();

const windowHeight = Dimensions.get('screen').height;

type ProfileScreenNavigationProp = NativeStackNavigationProp<any>;
type ProfileScreenRouteProp = RouteProp<any, any>;
interface IProps {
  navigation: ProfileScreenNavigationProp,
  route: ProfileScreenRouteProp;
}

const storage = getStorage();
const storageRef = ref(storage, `post/${auth.currentUser?.uid}/${Math.random().toString(36)}`);

export default function SaveNewFeed(props: IProps) {
  const { uri } = props.route.params;
  const [caption, setCaption] = useState('')


  async function HandleSubmit() {
    let bold = await fetch(uri).then(async (rsp) => { return await rsp.blob() });
    uploadBytes(storageRef, bold).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        await AdPostData({ caption: caption, img: downloadURL }).then((rsp) => {
          props.navigation.navigate('Home')
        })
      });
    });
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View>
          <TextInput style={styles.textInput} placeholder='Caption' onChangeText={(e) => setCaption(e)} />
          <Image style={styles.camera} source={{ uri: uri }} />
        </View>
        <Button title='Submit' onPress={() => HandleSubmit()} />
      </View>
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    padding: 15,
    justifyContent: 'space-between'
  }, camera: {
    height: windowHeight / 2
  },
  textInput: {
    height: 48,
    marginTop: 50
  }
});