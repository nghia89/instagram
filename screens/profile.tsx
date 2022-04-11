import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { getUserAuth, GetUserPosts } from '../api/userApi';

import { Text, View } from '../components/Themed';

let width = Dimensions.get('screen').width
export default function Profile() {
  const [profile, setProfile] = useState<any>(null)
  const [userPost, setUserPost] = useState<any>(null)
  const [loading, setLoading] = useState<any>(true)

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    let rsp = await getUserAuth()
    if (rsp != null) {
      console.log('rsp', rsp)
      setProfile(rsp)
      getUserPost()
    }
  }

  async function getUserPost() {
    let rsp = await GetUserPosts();
    if (rsp) {
      setUserPost(rsp)
      setLoading(false)
    }
  }

  function renderContent() {
    if (loading)
      return <ActivityIndicator />
    else
      return <View style={{ flex: 1, width: width - 30 }}>
        <Text style={styles.title}>FullName: {profile.fullName}</Text>
        <Text style={styles.title}>Email: {profile.email}</Text>
        <FlatList
          data={userPost}
          numColumns={3}
          horizontal={false}
          keyExtractor={item => item.id}
          renderItem={(obj) => {
            let { item } = obj
            return <View style={{ flex: 1 / 3, padding: 5 }}>
              <Image style={{ flex: 1, aspectRatio: 1 / 1 }} resizeMode="cover" source={{ uri: item.img }} />
              <Text style={styles.title}>Caption: {item.caption}</Text>
            </View>
          }}
          style={{ paddingTop: 15 }}
        />
      </View>
  }

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
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
