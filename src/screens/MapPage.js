import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text, Dimensions, Image, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;
const BOTTOM_SHEET_MAX_HEIGHT = height * 0.8;
const BOTTOM_SHEET_MIN_HEIGHT = height * 0.15;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const MapPage = ({ navigation }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
    const mapRef = useRef(null);
    
    // Анимация для bottom sheet
    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animatedValue.setOffset(lastGestureDy.current);
            },
            onPanResponderMove: (e, gesture) => {
                animatedValue.setValue(gesture.dy);
            },
            onPanResponderRelease: (e, gesture) => {
                animatedValue.flattenOffset();
                lastGestureDy.current += gesture.dy;
                
                if (gesture.dy > 0) { // Движение вниз
                    if (gesture.dy <= DRAG_THRESHOLD) {
                        springAnimation('up');
                    } else {
                        springAnimation('down');
                    }
                } else { // Движение вверх
                    if (gesture.dy >= -DRAG_THRESHOLD) {
                        springAnimation('down');
                    } else {
                        springAnimation('up');
                    }
                }
            },
        })
    ).current;

    const springAnimation = (direction) => {
        lastGestureDy.current = direction === 'up' ? MAX_UPWARD_TRANSLATE_Y : MAX_DOWNWARD_TRANSLATE_Y;
        Animated.spring(animatedValue, {
            toValue: lastGestureDy.current,
            useNativeDriver: true,
        }).start();
    };

    const bottomSheetAnimation = {
        transform: [
            {
                translateY: animatedValue.interpolate({
                    inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
                    extrapolate: 'clamp',
                }),
            },
        ],
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            const locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (newLocation) => {
                    setLocation(newLocation);
                    if (mapRef.current) {
                        mapRef.current.animateToRegion({
                            latitude: newLocation.coords.latitude,
                            longitude: newLocation.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        });
                    }
                }
            );

            return () => {
                if (locationSubscription) {
                    locationSubscription.remove();
                }
            };
        })();
    }, []);

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
                <View>
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
                {location ? (
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        showsMyLocationButton={true}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="Ваше местоположение"
                        />
                    </MapView>
                ) : (
                    <Text>{errorMsg || 'Определение местоположения...'}</Text>
                )}
            </View>

            {/* Bottom Sheet */}
            <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
                <View style={styles.draggableArea} {...panResponder.panHandlers}>
                    <View style={styles.dragHandle} />
                </View>
                <View style={styles.bottomSheetContent}>
                    <Text style={styles.bottomSheetTitle}>Куда поедем?</Text>
                    <TouchableOpacity style={styles.searchInput}>
                        <Ionicons name="search" size={20} color="#7A7A7A" />
                        <Text style={styles.searchInputText}>Поиск адреса или места</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.favoritePlaces}>
                        <Text style={styles.sectionTitle}>Избранные адреса</Text>
                        <View style={styles.placeItem}>
                            <Ionicons name="home" size={24} color="#093EFE" />
                            <Text style={styles.placeText}>Домой</Text>
                        </View>
                        <View style={styles.placeItem}>
                            <Ionicons name="briefcase" size={24} color="#093EFE" />
                            <Text style={styles.placeText}>На работу</Text>
                        </View>
                    </View>
                </View>
            </Animated.View>
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
        backgroundColor: 'gray'
    },
    map: {
        width: '100%',
        height: '100%',
    },
    // Bottom Sheet Styles
    bottomSheet: {
        position: 'absolute',
        width: '100%',
        height: BOTTOM_SHEET_MAX_HEIGHT,
        bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    draggableArea: {
        width: '100%',
        height: 32,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dragHandle: {
        width: 50,
        height: 5,
        backgroundColor: '#D1D1D1',
        borderRadius: 5,
    },
    bottomSheetContent: {
        flex: 1,
        padding: 20,
    },
    bottomSheetTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 20,
        color: '#000',
    },
    searchInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 20,
    },
    searchInputText: {
        marginLeft: 10,
        color: '#7A7A7A',
        fontSize: 16,
    },
    favoritePlaces: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#7A7A7A',
        marginBottom: 15,
    },
    placeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3',
    },
    placeText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#000',
    },
});

export default MapPage;