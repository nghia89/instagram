import React, { useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAuth } from '../../store/reducers/userReducer';

interface IProps {

}

export default function Home(props: IProps) {
    const dispatch = useDispatch();
    const { message } = useSelector((state: any) => state.app);
    const { user } = useSelector((state: any) => state.users);


    useEffect(() => {
        dispatch(fetchUserAuth());
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One {message}</Text>

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
