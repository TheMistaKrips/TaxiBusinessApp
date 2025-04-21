import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Share, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const ReferalPage = ({ navigation }) => {
    const [referralLink] = useState('https://taxiapp.com/r/ABC123');
    const scrollViewRef = useRef();

    const handleCopyLink = async () => {
        await Clipboard.setStringAsync(referralLink);
        Alert.alert('Ссылка скопирована', 'Реферальная ссылка скопирована в буфер обмена');
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: referralLink,
                title: 'Приглашение в приложение',
            });
        } catch (error) {
            Alert.alert('Ошибка', error.message);
        }
    };

    // Генерация списка друзей для примера
    const friends = [
        { id: 1, name: 'Атаджан Гелдиев', date: '7 марта 2024', image: require('../../assets/page-assets/person1.png') },
        { id: 2, name: 'Сердар Аннаков', date: '15 декабря 2024', image: require('../../assets/page-assets/person2.png') },
        { id: 3, name: 'Айсолтан Байрамова', date: '3 февраля 2025', image: require('../../assets/page-assets/person3.png') },
        // Добавьте больше друзей по необходимости
        { id: 4, name: 'Атаджан Гелдиев', date: '7 марта 2024', image: require('../../assets/page-assets/person1.png') },
        { id: 5, name: 'Сердар Аннаков', date: '15 декабря 2024', image: require('../../assets/page-assets/person2.png') },
        { id: 6, name: 'Айсолтан Байрамова', date: '3 февраля 2025', image: require('../../assets/page-assets/person3.png') },
        // Добавьте больше друзей по необходимости

    ];

    return (
        <View style={styles.container}>
            <View style={{ paddingTop: 30 }}>
                <Text style={{ fontWeight: '700', fontSize: 32, color: '#2F2F37' }}>Пригласить друга</Text>
            </View>
            <View>
                <Text style={{ fontWeight: '500', fontSize: 18, color: '#2F2F37' }}>Приглашайте друзей, получайте{'\n'}бонусы и наслаждайтесь выгодными{'\n'}поездками!</Text>
            </View>
            <View style={{
                backgroundColor: '#F5F5F6',
                height: 150,
                width: '100%',
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 16,
                gap: 16,
                elevation: 5
            }}>
                <View>
                    <Text style={{ fontWeight: '600', fontSize: 18, color: '#2F2F37' }}>Как это работает?</Text>
                </View>
                <View>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#2F2F37'
                    }}>• Вы получаете 5% бонусов от первой поездки каждого приглашённого друга.</Text>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 14,
                        color: '#2F2F37'
                    }}>• Ваш друг получает скидку 10% на свою первую поездку.</Text>
                </View>
            </View>

            <View style={{ paddingVertical: 10 }}>
                <Text style={{ fontWeight: '600', fontSize: 22, color: '#2F2F37' }}>Список добавленных друзей</Text>
            </View>

            {/* Список друзей с возможностью прокрутки */}
            <ScrollView
                ref={scrollViewRef}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {friends.map((friend) => (
                    <View
                        key={friend.id}
                        style={{
                            backgroundColor: '#F5F5F6',
                            height: 70,
                            width: '100%',
                            borderRadius: 16,
                            paddingVertical: 16,
                            paddingHorizontal: 16,
                            gap: 16,
                            elevation: 5,
                            marginBottom: 10
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 5
                            }}>
                                <Image source={friend.image} />
                                <View>
                                    <Text style={{
                                        color: '#2F2F37',
                                        fontWeight: '600',
                                        fontSize: 16
                                    }}>
                                        {friend.name}
                                    </Text>
                                    <Text style={{
                                        color: '#2F2F37',
                                        fontWeight: '400',
                                        fontSize: 10
                                    }}>
                                        Присоединился {friend.date}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <Image
                                    style={{
                                        width: 19,
                                        height: 19
                                    }}
                                    source={require('../../assets/page-assets/iblack.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Блок с ссылкой и кнопкой копирования (теперь внизу) */}
            <View style={{
                backgroundColor: '#F5F5F6',
                height: 60,
                width: '100%',
                borderRadius: 16,
                paddingVertical: 16,
                paddingHorizontal: 16,
                gap: 16,
                elevation: 5,
                marginBottom: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        fontWeight: '400',
                        fontSize: 12,
                        color: '#2F2F37'
                    }}>
                        {referralLink}
                    </Text>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5
                        }}
                        onPress={handleCopyLink}
                    >
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 13,
                            color: '#2F2F37'
                        }}>
                            Скопировать
                        </Text>
                        <Image
                            style={{
                                width: 14,
                                height: 14
                            }}
                            source={require('../../assets/page-assets/copy.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Кнопка поделиться (теперь внизу) */}
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleShare}
            >
                <Text style={styles.loginButtonText}>Поделиться</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        gap: 10
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
    loginButton: {
        backgroundColor: '#377DFF',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#377DFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ReferalPage;