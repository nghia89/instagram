import React, { useEffect, useState } from "react";
import { View, Image, Linking, FlatList, Dimensions } from "react-native";
import * as MediaLibrary from 'expo-media-library'

let width = Dimensions.get('screen').width;
export default function ChooseImg() {
    const [images, setImages] = useState<any[]>([])
    useEffect(() => {
        CheckAtt()
    }, [])

    async function CheckAtt() {

        let permission = await MediaLibrary.requestPermissionsAsync();

        console.log('request', permission)

        if (!permission.canAskAgain || permission.status === "denied") {
            console.log('permission', permission)
            Linking.openSettings();

        } else {
            if (permission.status === "granted") {
                let result = await MediaLibrary.getAssetsAsync({
                    first: 30,
                    after: undefined,
                    mediaType: ['photo'],
                    album: undefined,
                    sortBy: MediaLibrary.SortBy.creationTime
                });
                setImages([...result.assets])
            }
        }


    }


    return <View>
        <FlatList key={1}
            data={images}
            extraData={(item: any, index: number) => `${index}`}
            renderItem={(obj) => <Image
                source={{ uri: obj.item.uri }}
                style={{
                    width: (width - 30) / 3,
                    height: (width - 30) / 3, flex: 1, resizeMode: 'cover'
                }}
            />}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={1}
        />
    </View>
}