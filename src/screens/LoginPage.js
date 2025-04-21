import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';


const LoginPage = ({ navigation }) => {
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
            <Text style={styles.title}>Вход в аккаунт</Text>

            <TextInput
                style={styles.input}
                placeholder="Email или номер телефона"
                value={email}
                onChangeText={setEmail}
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

            <View style={styles.middlebar}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#4630EB' : undefined}
                        style={{ borderRadius: 4 }}
                    />
                    <Text style={{
                        marginLeft: 5,
                        color: '#3B4054',
                    }}>Запомнить меня</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('PasswordReset')}>
                        <Text style={{
                            fontSize: 14,
                            color: '#377DFF',
                        }}>Забыли пароль?</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Войти в аккаунт</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E0E5EC' }} />
                <View>
                    <Text style={{ width: 50, textAlign: 'center' }}>или</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: '#E0E5EC' }} />
            </View>

            <View style={{
                flexDirection: 'row',
                gap: '15%',
                paddingVertical: 20,
            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    backgroundColor: '#F5F9FE',
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    borderRadius: 14,
                    width: 150,
                }}>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../../assets/page-assets/Facebook.png')}
                    />
                    <Text
                        style={{
                            color: '#61677D',
                            fontSize: 14,

                        }}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    backgroundColor: '#F5F9FE',
                    paddingVertical: 10,
                    paddingHorizontal: 25,
                    borderRadius: 14,
                    width: 200,
                    width: 150,
                }}>
                    <Image
                        style={{ width: 25, height: 25 }}
                        source={require('../../assets/page-assets/Google.png')}
                    />
                    <Text
                        style={{
                            color: '#61677D',
                            fontSize: 14,

                        }}>Google</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'row',
                gap: '2%'
            }}>
                <Text style={{
                    color: '#3B4054',
                    marginTop: 10,
                    fontSize: 14,
                }}>Нет аккаунта?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signupLink}>Создать</Text>
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
        width: '100%',
        height: 50,
        backgroundColor: '#F5F9FE',
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
        gap: '32%',
        justifyContent: 'space-between'
    }
});

export default LoginPage;