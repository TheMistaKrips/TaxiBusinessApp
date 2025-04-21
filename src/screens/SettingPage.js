import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

const SettingPage = ({ navigation }) => {
    // Состояния для переключателей
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [languageEnabled, setLanguageEnabled] = useState(false);

    // Анимационные значения
    const notificationsAnim = useRef(new Animated.Value(0)).current;
    const darkModeAnim = useRef(new Animated.Value(0)).current;
    const languageAnim = useRef(new Animated.Value(0)).current;

    // Функции переключения
    const toggleNotifications = () => {
        Animated.timing(notificationsAnim, {
            toValue: notificationsEnabled ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setNotificationsEnabled(!notificationsEnabled);
    };

    const toggleDarkMode = () => {
        Animated.timing(darkModeAnim, {
            toValue: darkModeEnabled ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setDarkModeEnabled(!darkModeEnabled);
    };

    const toggleLanguage = () => {
        Animated.timing(languageAnim, {
            toValue: languageEnabled ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        setLanguageEnabled(!languageEnabled);
    };

    // Интерполяции для анимации
    const notificationsTranslateX = notificationsAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 26],
    });

    const darkModeTranslateX = darkModeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 26],
    });

    const languageTranslateX = languageAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 26],
    });

    return (
        <View style={styles.container}>
            <View style={{ paddingVertical: 30 }}>
                <Text style={{ fontWeight: '700', fontSize: 32, color: '#2F2F37' }}>Настройки</Text>
            </View>

            <View style={{
                backgroundColor: '#F5F5F6',
                height: 310,
                width: '100%',
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 16,
                gap: 16,
                elevation: 5
            }}>
                <View>
                    <Text style={{ fontWeight: '500', fontSize: 16, color: '#4D4D4D' }}>Основные</Text>
                </View>

                <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/page-assets/personimage.png')}
                        style={{ width: 62, height: 62 }}
                    />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#000' }}>Mammedogly</Text>
                        <Text style={{ fontWeight: '500', fontSize: 10, color: '#A4A4A4' }}>
                            Добавить избранный адрес
                        </Text>
                    </View>
                </View>

                <View>
                    <Text style={{ fontWeight: '500', fontSize: 12, color: '#626262' }}>Account settings</Text>
                </View>

                <View style={{ flexDirection: 'column', gap: 12 }}>
                    {/* Уведомления */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Image
                                style={{ width: 14, height: 14 }}
                                source={require('../../assets/page-assets/push.png')}
                            />
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#2F2F37' }}>
                                Уведомления
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={toggleNotifications}
                            style={[
                                styles.switchContainer,
                                { backgroundColor: notificationsEnabled ? '#093EFE' : '#e0e0e0' }
                            ]}
                        >
                            <Animated.View
                                style={[
                                    styles.switchCircle,
                                    { transform: [{ translateX: notificationsTranslateX }] }
                                ]}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Темная тема */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Image
                                style={{ width: 14, height: 14 }}
                                source={require('../../assets/page-assets/night.png')}
                            />
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#2F2F37' }}>
                                Темная тема
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={toggleDarkMode}
                            style={[
                                styles.switchContainer,
                                { backgroundColor: darkModeEnabled ? '#093EFE' : '#e0e0e0' }
                            ]}
                        >
                            <Animated.View
                                style={[
                                    styles.switchCircle,
                                    { transform: [{ translateX: darkModeTranslateX }] }
                                ]}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Язык */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Image
                                style={{ width: 14, height: 14 }}
                                source={require('../../assets/page-assets/lang.png')}
                            />
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#2F2F37' }}>
                                Поменять язык
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={toggleLanguage}
                            style={[
                                styles.switchContainer,
                                { backgroundColor: languageEnabled ? '#093EFE' : '#e0e0e0' }
                            ]}
                        >
                            <Animated.View
                                style={[
                                    styles.switchCircle,
                                    { transform: [{ translateX: languageTranslateX }] }
                                ]}
                            >
                                <Image
                                    style={{ width: 24, height: 24, borderRadius: 12 }}
                                    source={
                                        languageEnabled
                                            ? require('../../assets/page-assets/rulang.png')
                                            : require('../../assets/page-assets/tmlang.png')
                                    }
                                />
                            </Animated.View>
                        </TouchableOpacity>

                    </View>
                    {/* Поменять почту */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Image
                                style={{ width: 14, height: 14 }}
                                source={require('../../assets/page-assets/mail.png')}
                            />
                            <Text style={{ fontWeight: '600', fontSize: 14, color: '#2F2F37' }}>
                                Изменить почту
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
            {/* GПоменять пароль */}

            <TouchableOpacity style={{
                backgroundColor: '#F5F5F6',
                height: 43,
                width: '100%',
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 16,
                gap: 16,
                justifyContent: 'center',
                elevation: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10
                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10
                    }} >
                        <Image source={require('../../assets/page-assets/lock.png')} />
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: '#4D4D4D'
                        }}>
                            Поменять пароль
                        </Text>
                    </View>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Image source={require('../../assets/page-assets/vector-arrow.png')} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: '#F5F5F6',
                height: 43,
                width: '100%',
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 16,
                gap: 16,
                justifyContent: 'center',
                elevation: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10
                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10
                    }} >
                        <Image source={require('../../assets/page-assets/mail-outline.png')} />
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: '#4D4D4D'
                        }}>
                            Поддержка / жалоба
                        </Text>
                    </View>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Image source={require('../../assets/page-assets/vector-arrow.png')} />
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
                backgroundColor: '#F5F5F6',
                height: 43,
                width: '100%',
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 16,
                gap: 16,
                justifyContent: 'center',
                elevation: 5
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10
                }}>
                    <View style={{
                        flexDirection: 'row',
                        gap: 10
                    }} >
                        <Image source={require('../../assets/page-assets/log-out.png')} />
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 16,
                            color: '#4D4D4D'
                        }}>
                            Выйти из аккаунта
                        </Text>
                    </View>
                    <View style={{
                        justifyContent: 'center'
                    }}>
                        <Image source={require('../../assets/page-assets/vector-arrow.png')} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        gap: '2%'
    },
    switchContainer: {
        width: 50,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        paddingHorizontal: 2,
    },
    switchCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
});

export default SettingPage;