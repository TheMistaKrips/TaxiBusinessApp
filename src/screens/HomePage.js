import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const HomePage = ({ navigation }) => {
    const [progress, setProgress] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Данные для карусели (рекламные изображения)
    const carouselData = [
        { id: '1', image: require('../../assets/page-assets/reklam.png') },
        { id: '2', image: require('../../assets/page-assets/reklam.png') },
        { id: '3', image: require('../../assets/page-assets/reklam.png') },
    ];

    // Автоматическая прокрутка
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % carouselData.length;
                scrollViewRef.current.scrollTo({ x: nextIndex * screenWidth, animated: true });
                return nextIndex;
            });
        }, 3000); // Интервал автопрокрутки (3 секунды)

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, [carouselData.length]);

    // Пример: автоматическое увеличение прогресса каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress < 100) {
                    return prevProgress + 1; // Увеличиваем прогресс на 1% каждую секунду
                } else {
                    clearInterval(interval); // Останавливаем интервал, когда прогресс достигает 100%
                    return prevProgress;
                }
            });
        }, 1000); // Интервал в 1 секунду

        return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, []);

    const handleLogin = () => {
        navigation.navigate('MapPage');
    };

    const handleSettings = () => {
        navigation.navigate('SettingPage');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5
                }}>
                    <Image source={require('../../assets/images/littleLogo.png')}
                        style={{
                            width: 25,
                            height: 25
                        }} />
                    <Text style={{
                        color: '#3461FD',
                        fontWeight: '700',
                        fontSize: 18
                    }}>Drivio</Text>
                </View>
                <TouchableOpacity onPress={handleSettings}>
                    <Image source={require('../../assets/page-assets/personimage.png')}
                        style={{
                            width: 32,
                            height: 32
                        }} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    backgroundColor: '#3461FD',
                    width: '100%',
                    borderRadius: 14,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 25
                }}
            >
                <View>
                    <Text
                        style={{
                            fontWeight: '800',
                            fontSize: 17,
                            color: "#fff",
                            marginHorizontal: 15,
                            marginVertical: 10
                        }}>Ваш бонусный уровень! {'\n'}
                        <Text style={{
                            fontWeight: '500',
                            fontSize: 14,
                            color: "#fff",
                        }}>
                            Осталось 1 поездка до скидки 10%
                        </Text></Text>
                    <View style={{
                        paddingHorizontal: 15,
                        marginBottom: 10
                    }}>
                        <View style={styles.progressBarBackground}>
                            <View style={[styles.progressBarFill, { width: "80%" }]} />
                        </View>
                    </View>
                </View>
                <Image
                    style={{
                        width: '25%',
                        height: '100%',
                        maxHeight: '100%',
                        maxWidth: '25%',
                    }}
                    source={require('../../assets/page-assets/moneyImage.png')} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 30,

            }}>
                <TouchableOpacity>
                    <Image
                        source={require('../../assets/page-assets/foodDeliveryButton.png')} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../../assets/page-assets/marketDeliveryButton.png')} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogin} style={{
                paddingVertical: "8%",

            }}>
                <Image source={require('../../assets/page-assets/ToMap.png')}
                    style={{
                        shadowColor: '#377DFF', // Цвет тени
                        shadowOffset: { width: 0, height: 4 }, // Смещение тени
                        shadowOpacity: 0.3, // Прозрачность тени
                        shadowRadius: 5, // Размытие тени
                        elevation: 2, // Для Android 
                        width: '100%',
                        borderRadius: 100,
                    }} />
            </TouchableOpacity>
            {/* История поездок */}
            <View>
                <Text style={{
                    fontWeight: '600',
                    fontSize: 18,
                    color: '#2F2F37',

                }}>
                    История поездок
                </Text>
                <View style={{
                    paddingVertical: '2%',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: '#A9AAAE',
                            fontWeight: '600',
                            fontSize: 15
                        }}>
                            Проспект Мира, 7
                        </Text>
                        <Image source={require('../../assets/images/line.png')} />
                        <Text style={{
                            color: '#A9AAAE',
                            fontWeight: '600',
                            fontSize: 15
                        }}>
                            Ул. Пушкина, 10
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: '#A9AAAE',
                            fontWeight: '600',
                            fontSize: 15
                        }}>
                            Ул. Ленина, 12
                        </Text>
                        <Image source={require('../../assets/images/line.png')} />
                        <Text style={{
                            color: '#A9AAAE',
                            fontWeight: '600',
                            fontSize: 15
                        }}>
                            Ул. Гагарина, 25
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            color: '#A9AAAE',
                            fontWeight: '600',
                            fontSize: 15
                        }}>
                            Ул. Советская, 15
                        </Text>
                        <Image source={require('../../assets/images/line.png')} />
                        <Text style={{
                            color: '#A9AAAE',
                            fontWeight: '600',
                            fontSize: 15
                        }}>
                            ТЦ  "Мега", 1

                        </Text>
                    </View>
                </View>
            </View>
            {/* Рекламный блок */}
            <View style={{
                paddingVertical: '8%'
            }}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    {carouselData.map((item, index) => (
                        <View key={item.id} style={{ width: screenWidth }}>
                            <Image source={item.image} style={styles.carouselImage} />
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        paddingHorizontal: '8%',
        paddingVertical: '5%',
        marginTop: 20,
    },
    progressBarBackground: {
        width: '80%',
        height: 8,
        backgroundColor: '#1C3691', // Цвет фона шкалы
        borderRadius: 30,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#00C974', // Цвет заполняющей части
        borderRadius: 10,
    },
    carouselImage: {
        width: 345,
        height: 157, // Высота изображения
        borderRadius: 14,
    },
});

export default HomePage;