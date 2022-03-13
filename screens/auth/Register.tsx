import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Button, ScrollView } from "react-native";
import { iconSignIn } from "../../utils/svg";
import layout from '../../constants/Layout'
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { IUser, registration } from "../../hooks/auth";


const BackgroundSignIn = require('./../../assets/images/SignUp.png')
interface IProps {
    navigation: NavigationProp<ParamListBase>
};
export default function Register(props: IProps) {
    const [user, setUser] = useState<IUser>({ email: '', password: '' })

    async function handleRegister() {
        await registration(user)
    }

    return <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
    >
        <View style={styles.container}>
            <ImageBackground source={BackgroundSignIn} resizeMode="cover" style={styles.image}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.wrapperContent}
                >
                    <View >
                        <TextInput
                            style={styles.textInput}
                            placeholder="Full Name"
                            value={user.fullName}
                            onChangeText={(e) => setUser(u => ({ ...u, fullName: e }))}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            value={user.email}
                            onChangeText={(e) => setUser(u => ({ ...u, email: e }))}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Password"
                            value={user.password}
                            secureTextEntry
                            onChangeText={(e) => setUser(u => ({ ...u, password: e }))}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Confirm Password"
                            value={user.password}
                            secureTextEntry
                            onChangeText={(e) => setUser(u => ({ ...u, password: e }))}
                        />
                    </View>
                    <View style={styles.viewSignIn}>
                        <View  >
                            <TouchableOpacity
                                onPress={() => props.navigation.navigate('Login')}
                            >
                                <Text style={styles.textSignUp}> Đăng nhập</Text>
                                <View style={{ backgroundColor: '#E4DB7C', width: 78, position: 'absolute', top: 16, opacity: 0.6, bottom: 0, height: 9 }} />
                            </TouchableOpacity>

                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleRegister()}
                        >
                            {iconSignIn()}
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>

            </ImageBackground>

        </View>

    </ScrollView >
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, image: {
        flex: 1,
        zIndex: 1
    },
    viewSignIn: { width: layout.width - 60, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingBottom: 20 },
    viewSignUp: { width: layout.width - 60, alignItems: 'flex-start' },
    button: {
        backgroundColor: '#8A4C7D',
        width: 64,
        height: 64,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textSignUp: {

        fontSize: 18,
        fontWeight: 'bold',
    },
    wrapperContent: {
        justifyContent: 'center',
        alignItems: 'center',
        // position: 'absolute',
        // zIndex: 2,
        height: layout.height

    },
    textInput: {
        backgroundColor: '#0000001A',
        width: layout.width - 60,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        borderRadius: 20,
        paddingLeft: 15,
        color: '#3C3C3C',
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 20
    },
    facebookText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: 16,
        paddingLeft: 5
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
