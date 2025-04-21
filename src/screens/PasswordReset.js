import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PasswordReset = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);

    const handleLogin = () => {
        // Здесь должна быть логика входа
        // Например, проверка email и password
        // Если вход успешен, тогда перенаправляем на HomePage
        navigation.navigate('HomePage');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Забыли пароль</Text>
            <Text style={{
                color: '#61677D',
                textAlign: 'center',
                paddingBottom: 40
            }}>Пожалуйста, введите свой email {'\n'}
                для сброса пароля</Text>
            <TextInput
                style={styles.input}
                placeholder="Введите ваш Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#AAB2C4"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Подтвердить</Text>
            </TouchableOpacity>

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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2A4ECA',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#F5F7FA',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
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
    }
});

export default PasswordReset;