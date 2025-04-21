import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7; // 80% ширины экрана

const MapPage = ({ navigation }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;

    const toggleMenu = () => {
        Animated.timing(menuAnim, {
            toValue: isMenuOpen ? -MENU_WIDTH : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <View style={styles.container}>
            {/* Кнопка меню (теперь фиксированная) */}
            <TouchableOpacity
                style={[styles.menuButton, { backgroundColor: 'rgba(255, 255, 255, 0.16)', borderRadius: 100 }]}
                onPress={toggleMenu}
            >
                <Ionicons name={isMenuOpen ? "close" : "menu"} size={32} color="white" />
            </TouchableOpacity>

            {/* Затемнение фона */}
            {isMenuOpen && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={toggleMenu}
                />
            )}

            {/* Анимированное меню */}
            <Animated.View
                style={[
                    styles.menu,
                    { transform: [{ translateX: menuAnim }] }
                ]}
            >
                <View >

                    <View style={{
                        backgroundColor: '#093EFE',
                        width: '100%',
                        height: 180,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: 15,
                    }}>
                        <Image source={require('../../assets/page-assets/personimage.png')} />
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                color: '#FFFFFF',
                                fontWeight: '600',
                                fontSize: 18
                            }}>Mammedogly</Text>
                            <Text style={{
                                color: '#FFFFFF',
                                fontWeight: '400',
                                fontSize: 14
                            }}>Пассажир</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingVertical: 30,
                        paddingHorizontal: 30,
                        gap: 25,
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DriveHistory')}
                            style={{
                                flexDirection: 'row',
                                gap: 5
                            }}>
                            <Image source={require('../../assets/page-assets/clock.png')} />
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 15,
                                color: '#7A7A7A'
                            }}>История поездок</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Image source={require('../../assets/page-assets/ticket.png')} />
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 15,
                                color: '#7A7A7A'
                            }}>Избранные адреса</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            gap: 5
                        }} onPress={() => navigation.navigate('SettingPage')}>
                            <Image source={require('../../assets/page-assets/setting.png')} />
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 15,
                                color: '#7A7A7A'
                            }}>Настройки</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('ReferalPage')}
                            style={{
                                flexDirection: 'row',
                                gap: 5
                            }}>
                            <Image source={require('../../assets/page-assets/users.png')} />
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 15,
                                color: '#7A7A7A'
                            }}>Пригласить друга</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Image source={require('../../assets/page-assets/ticket-sales.png')} />
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 15,
                                color: '#7A7A7A'
                            }}>Бонусы и промокоды</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            gap: 5
                        }}>
                            <Image source={require('../../assets/page-assets/quit.png')} />
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 15,
                                color: '#7A7A7A'
                            }}>Выход из аккаунта</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        paddingVertical: '90%'
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: '#F3F3F3',
                            padding: 10,
                            paddingVertical: 10,
                            paddingHorizontal: 30,
                            borderRadius: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginHorizontal: '10%',
                            gap: 10
                        }}>
                            <Image source={require('../../assets/page-assets/support.png')} />
                            <Text style={{
                                fontWeight: '500',
                                fontSize: 15,
                                color: '#7A7A7A'
                            }}>Поддержка / жалоба</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Animated.View>

            {/* Основное содержимое */}
            <View style={styles.content}>
                <Text>Основное содержимое страницы (в работе)</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 100,
    },
    menu: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: MENU_WIDTH,
        height: '100%',
        backgroundColor: 'white',
        zIndex: 90,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 80,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray'
    },
    menuTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    menuItem: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default MapPage;