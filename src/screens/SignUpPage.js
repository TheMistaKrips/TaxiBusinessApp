import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const SignUpPage = ({ navigation }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);

    const handleSignUp = () => {
        // Проверяем, что все поля заполнены и чекбокс отмечен
        if (name && phone && password && isChecked) {
            // Форматируем номер телефона (удаляем все нецифровые символы)
            const formattedPhone = phone.replace(/\D/g, '');
            navigation.navigate('CodePage', { phone: formattedPhone });
        }
    };

    const formatPhoneNumber = (text) => {
        // Удаляем все нецифровые символы
        const cleaned = text.replace(/\D/g, '');

        // Ограничиваем длину номера (код страны + 10 цифр)
        const limited = cleaned.slice(0, 11);

        // Форматируем номер телефона
        let formatted = limited;
        if (limited.length > 3) {
            formatted = `${limited.slice(0, 3)} ${limited.slice(3, 5)} ${limited.slice(5, 8)}`;
            if (limited.length > 8) {
                formatted += ` ${limited.slice(8)}`;
            }
        }

        setPhone(formatted);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Создание аккаунта</Text>

            <TextInput
                style={styles.input}
                placeholder="Имя и фамилия"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#AAB2C4"
            />
            <TextInput
                style={styles.input}
                placeholder="Номер телефона"
                value={phone}
                onChangeText={formatPhoneNumber}
                keyboardType="phone-pad"
                placeholderTextColor="#AAB2C4"
            />
            <TextInput
                style={styles.input}
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#AAB2C4"
            />

            <View style={styles.checkboxContainer}>
                <View style={styles.checkboxRow}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                        style={{ borderRadius: 4 }}
                    />
                    <Text style={styles.checkboxText}>Я согласен с </Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                    <Text style={styles.linkText}>Условиями обслуживания</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxText}>и </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                    <Text style={styles.linkText}>Политикой конфиденциальности</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[styles.loginButton, (!name || !phone || !password || !isChecked) && styles.disabledButton]}
                onPress={handleSignUp}
                disabled={!name || !phone || !password || !isChecked}
            >
                <Text style={styles.loginButtonText}>Создать аккаунт</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>или</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        style={styles.socialIcon}
                        source={require('../../assets/page-assets/Facebook.png')}
                    />
                    <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton}>
                    <Image
                        style={styles.socialIcon}
                        source={require('../../assets/page-assets/Google.png')}
                    />
                    <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.loginLink}>
                <Text style={styles.loginText}>Уже есть аккаунт?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signupLink}>Войти</Text>
                </TouchableOpacity>
            </View>
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
    input: {
        width: '100%',
        height: 50,
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
    signupLink: {
        fontSize: 14,
        color: '#377DFF',
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxText: {
        marginLeft: 5,
        color: '#3B4054',
        fontSize: 14,
    },
    linkText: {
        fontSize: 14,
        color: '#377DFF',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 15,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E5EC',
    },
    dividerText: {
        width: 50,
        textAlign: 'center',
        color: '#61677D',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        paddingVertical: 20,
        width: '100%',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#F5F9FE',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 14,
        width: 150,
    },
    socialIcon: {
        width: 25,
        height: 25,
    },
    socialText: {
        color: '#61677D',
        fontSize: 14,
    },
    loginLink: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 10,
    },
    loginText: {
        color: '#3B4054',
        fontSize: 14,
    },
});

export default SignUpPage;