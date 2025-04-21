import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';


const RoleChoose = ({ navigation }) => {

    const handleLogin = () => {
        // Здесь должна быть логика входа
        // Например, проверка email и password
        // Если вход успешен, тогда перенаправляем на HomePage
        navigation.navigate('HomePage');
    };

    const handleDriver = () => {
        // Здесь должна быть логика входа
        // Например, проверка email и password
        // Если вход успешен, тогда перенаправляем на HomePage
        navigation.navigate('DriverRegistration');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Выберите свою роль</Text>
            <Text style={{
                textAlign: 'center',
                paddingBottom: 60,
                color: '#61677D'
            }}>
                Вы можете зарегистрироваться как пассажир {'\n'}
                или водитель. Позже вы сможете переключаться {'\n'}
                между ролями в настройках
            </Text>

            <View style={{
                flexDirection: 'column',
                gap: 30
            }}>
                <TouchableOpacity onPress={handleDriver}>
                    <Image style={{
                        width: 220,
                        height: 100,
                    }}
                        source={require('../../assets/page-assets/carframe.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogin}>
                    <Image style={{
                        width: 220,
                        height: 100,
                    }}
                        source={require('../../assets/page-assets/characterframe.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Центрирование по вертикали
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#377DFF',
        marginBottom: 20,
    },
    input: {
        width: '15%',
        height: 60,
        backgroundColor: '#F5F9FE',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderColor: '#EAEFF5',
        borderWidth: 1
    },
    loginButton: {
        backgroundColor: '#377DFF',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 15,
        shadowColor: '#377DFF', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 5, // Размытие тени
        elevation: 5, // Для Android
    },
    roleButton: {
        backgroundColor: '#F5F9FE',
        width: 220,
        height: 100,
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 15,
        shadowColor: '#377DFF', // Цвет тени
        shadowOffset: { width: 0, height: 4 }, // Смещение тени
        shadowOpacity: 0.3, // Прозрачность тени
        shadowRadius: 5, // Размытие тени
        elevation: 5, // Для Android
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupLink: {
        fontSize: 14,
        color: '#377DFF',
        marginTop: 10,
    },
    middlebar: {
        flex: 0,
        flexDirection: 'row',
        gap: '32%',
    }
});

export default RoleChoose;