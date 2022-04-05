
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';


const windowHeight = Dimensions.get('screen').height;

export default function AddNewFeed() {
  let cameraRef = useRef<any>()

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [uri, setUri] = useState('');
  const [isCamera, setCamera] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function snap() {
    setCamera(true)
    if (cameraRef?.current) {
      let photo = await cameraRef?.current.takePictureAsync();
      if (photo.uri)
        setUri(photo.uri)
    }
  };

  const pickImage = async () => {
    setCamera(false)
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      console.log(result)
      setUri(result.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function renderCamera() {
    return <Camera style={styles.camera} type={type} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Text style={styles.text}> Xoay </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTake}
          onPress={() => snap()}>
          <Text style={styles.text}> Chụp </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonTake}
          onPress={pickImage}>
          <Text style={styles.text}> Thư viện </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  }


  function renderContent() {
    if (uri)
      return <View style={{ flex: 1 }}>
        <Image style={styles.camera} source={{ uri: uri }} />
        <View  >
          <TouchableOpacity
            style={styles.buttonTake}
            onPress={() => setUri('')}>
            <Text style={styles.text}> Chụp lại </Text>
          </TouchableOpacity>
        </View>
      </View>
    else if (isCamera) return renderCamera()
    else
      return <View />

  }
  return (
    <View style={styles.container}>
      <View style={{ height: (windowHeight - (StatusBar.currentHeight || 0)) }}>
        {renderContent()}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonTake: {
    alignSelf: 'flex-end',

  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});