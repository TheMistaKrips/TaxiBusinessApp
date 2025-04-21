import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';


const CodePage = ({ navigation }) => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);

    const handleLogin = () => {
        // Здесь должна быть логика входа
        // Например, проверка email и password
        // Если вход успешен, тогда перенаправляем на HomePage
        navigation.navigate('Congrats');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Введите код</Text>
            <Text style={{
                textAlign: 'center',
                paddingBottom: 20,
                color: '#61677D'
            }}>
                Мы отправили пятизначный код на номер {'\n'} телефона +993 65 25 55 20. Пожалуйста, введите {'\n'} его в поле ниже
            </Text>
            <View style={{
                flexDirection: 'row',
                gap: 5
            }}>
                <TextInput
                    style={styles.input}
                    value={code}
                    onChangeText={setCode}
                    placeholderTextColor="#AAB2C4"
                />
                <TextInput
                    style={styles.input}
                    value={code}
                    onChangeText={setCode}
                    placeholderTextColor="#AAB2C4"
                />
                <TextInput
                    style={styles.input}
                    value={code}
                    onChangeText={setCode}
                    placeholderTextColor="#AAB2C4"
                />
                <TextInput
                    style={styles.input}
                    value={code}
                    onChangeText={setCode}
                    placeholderTextColor="#AAB2C4"
                />
                <TextInput
                    style={styles.input}
                    value={code}
                    onChangeText={setCode}
                    placeholderTextColor="#AAB2C4"
                />
            </View>
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

export default CodePage;