import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CodePage = ({ navigation, route }) => {
    const [codes, setCodes] = useState(['', '', '', '', '']);
    const inputs = useRef([]);

    // Получаем номер телефона из параметров навигации
    const { phone } = route.params || {};

    // Форматируем номер для отображения
    const formattedPhone = phone
        ? `+${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(8)}`
        : '+993 65 25 55 20';

    const handleLogin = () => {
        const fullCode = codes.join('');
        console.log('Full code:', fullCode);
        navigation.navigate('Congrats');
    };

    const handleCodeChange = (text, index) => {
        const newText = text.replace(/[^0-9]/g, '').substring(0, 1);

        const newCodes = [...codes];
        newCodes[index] = newText;
        setCodes(newCodes);

        if (newText !== '' && index < 4) {
            inputs.current[index + 1].focus();
        }

        if (newCodes.every(code => code !== '')) {
            const fullCode = newCodes.join('');
            console.log('Full code:', fullCode);
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && codes[index] === '' && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Введите код</Text>
            <Text style={styles.subtitle}>
                Мы отправили пятизначный код на номер {'\n'} телефона {formattedPhone}. Пожалуйста, введите {'\n'} его в поле ниже
            </Text>
            <View style={styles.codeContainer}>
                {[0, 1, 2, 3, 4].map((index) => (
                    <TextInput
                        key={index}
                        ref={ref => inputs.current[index] = ref}
                        style={styles.input}
                        value={codes[index]}
                        onChangeText={(text) => handleCodeChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        placeholderTextColor="#AAB2C4"
                        keyboardType="numeric"
                        maxLength={1}
                        textAlign="center"
                    />
                ))}
            </View>
            <TouchableOpacity
                style={[styles.loginButton, !codes.every(code => code !== '') && styles.disabledButton]}
                onPress={handleLogin}
                disabled={!codes.every(code => code !== '')}
            >
                <Text style={styles.loginButtonText}>Подтвердить</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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
    subtitle: {
        textAlign: 'center',
        paddingBottom: 20,
        color: '#61677D'
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
    codeContainer: {
        flexDirection: 'row',
        gap: 5,
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#377DFF',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 15,
        shadowColor: '#377DFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    disabledButton: {
        backgroundColor: '#AAB2C4',
        shadowColor: '#AAB2C4',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CodePage;