import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Text,
    Dimensions,
    Image,
    PanResponder,
    TextInput,
    Modal,
    Linking,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.7;
const BOTTOM_SHEET_MAX_HEIGHT = height * 0.8;
const BOTTOM_SHEET_MIN_HEIGHT = height * 0.15;
const MAX_UPWARD_TRANSLATE_Y = BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;
const CAR_ITEM_WIDTH = width * 0.3;

const MapPage = ({ navigation }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [destinationText, setDestinationText] = useState('');
    const [currentLocationText, setCurrentLocationText] = useState('Мое местоположение');
    const [isDestinationFocused, setIsDestinationFocused] = useState(false);
    const [selectedService, setSelectedService] = useState('taxi');
    const [showDriverSearch, setShowDriverSearch] = useState(false);
    const [driverFound, setDriverFound] = useState(false);
    const [driverInfo, setDriverInfo] = useState(false);
    const [selectedCarType, setSelectedCarType] = useState('econom');

    const menuAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
    const mapRef = useRef(null);
    const animationRef = useRef(null);
    const scrollViewRef = useRef(null);

    const carTypes = [
        {
            id: 'econom',
            name: 'Эконом',
            price: '20 TMT',
            image: require('../../assets/car-types/econom.png'),
        },
        {
            id: 'comfort',
            name: 'Комфорт',
            price: '30 TMT',
            image: require('../../assets/car-types/comfort.png'),
        },
        {
            id: 'premium',
            name: 'Престиж',
            price: '48 TMT',
            image: require('../../assets/car-types/premium.png'),
        },
        {
            id: 'minivan',
            name: 'Минивен',
            price: '50 TMT',
            image: require('../../assets/car-types/minivan.png'),
        },
    ];

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

                if (gesture.dy > 0) {
                    if (gesture.dy <= DRAG_THRESHOLD) {
                        springAnimation('up');
                    } else {
                        springAnimation('down');
                    }
                } else {
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

    const handleSearchDriver = () => {
        if (destinationText.trim() === '') return;

        setShowDriverSearch(true);
        setDriverFound(false);

        setTimeout(() => {
            setDriverFound(true);
            setDriverInfo({
                name: 'Бердымурад',
                carModel: 'Hyundai Sonata',
                carColor: 'Белый',
                carNumber: 'A567BC',
                arrivalTime: '7 минут',
                phone: '+99361616161'
            });
        }, 3000);
    };

    const renderCarItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.carItem,
                    selectedCarType === item.id && styles.selectedCarItem
                ]}
                onPress={() => setSelectedCarType(item.id)}
            >
                <Image source={item.image} style={styles.carImage} />
                <Text style={styles.carName}>{item.name}</Text>
                <Text style={styles.carPrice}>{item.price}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Кнопка меню */}
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
                    <View style={styles.menuHeader}>
                        <Image source={require('../../assets/page-assets/personimage.png')} />
                        <View style={styles.menuHeaderText}>
                            <Text style={styles.menuHeaderName}>Mammedogly</Text>
                            <Text style={styles.menuHeaderRole}>Пассажир</Text>
                        </View>
                    </View>
                    <View style={styles.menuItems}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DriveHistory')}
                            style={styles.menuItem}
                        >
                            <Image source={require('../../assets/page-assets/clock.png')} />
                            <Text style={styles.menuItemText}>История поездок</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require('../../assets/page-assets/ticket.png')} />
                            <Text style={styles.menuItemText}>Избранные адреса</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => navigation.navigate('SettingPage')}
                        >
                            <Image source={require('../../assets/page-assets/setting.png')} />
                            <Text style={styles.menuItemText}>Настройки</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('ReferalPage')}
                            style={styles.menuItem}
                        >
                            <Image source={require('../../assets/page-assets/users.png')} />
                            <Text style={styles.menuItemText}>Пригласить друга</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require('../../assets/page-assets/ticket-sales.png')} />
                            <Text style={styles.menuItemText}>Бонусы и промокоды</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Image source={require('../../assets/page-assets/quit.png')} />
                            <Text style={styles.menuItemText}>Выход из аккаунта</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuFooter}>
                        <TouchableOpacity style={styles.supportButton}>
                            <Image source={require('../../assets/page-assets/support.png')} />
                            <Text style={styles.supportButtonText}>Поддержка / жалоба</Text>
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
                    <View style={styles.serviceSelector}>
                        <TouchableOpacity
                            style={[
                                styles.serviceButton,
                                selectedService === 'taxi' && styles.selectedServiceButton
                            ]}
                            onPress={() => setSelectedService('taxi')}
                        >
                            <Text style={[
                                styles.serviceButtonText,
                                selectedService === 'taxi' && styles.selectedServiceButtonText
                            ]}>Такси</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.serviceButton,
                                selectedService === 'delivery' && styles.selectedServiceButton
                            ]}
                            onPress={() => setSelectedService('delivery')}
                        >
                            <Text style={[
                                styles.serviceButtonText,
                                selectedService === 'delivery' && styles.selectedServiceButtonText
                            ]}>Доставка</Text>
                        </TouchableOpacity>
                    </View>

                    {selectedService === 'taxi' ? (
                        <>
                            <ScrollView
                                ref={scrollViewRef}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.carouselContainer}
                            >
                                {carTypes.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={[
                                            styles.carItem,
                                            selectedCarType === item.id && styles.selectedCarItem
                                        ]}
                                        onPress={() => setSelectedCarType(item.id)}
                                    >
                                        <Image source={item.image} style={styles.carImage} />
                                        <Text style={styles.carName}>{item.name}</Text>
                                        <Text style={styles.carPrice}>{item.price}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {isDestinationFocused && (
                                <View style={styles.searchInputContainer}>
                                    <Ionicons name="location" size={20} color="#7A7A7A" />
                                    <TextInput
                                        style={styles.searchInputText}
                                        placeholder={currentLocationText}
                                        value={currentLocationText}
                                        onChangeText={setCurrentLocationText}
                                        placeholderTextColor="#7A7A7A"
                                    />
                                </View>
                            )}

                            <View style={styles.searchInputContainer}>
                                <Ionicons name="search" size={20} color="#7A7A7A" />
                                <TextInput
                                    style={styles.searchInputText}
                                    placeholder="Куда едем?"
                                    value={destinationText}
                                    onChangeText={setDestinationText}
                                    onFocus={() => setIsDestinationFocused(true)}
                                    onBlur={() => setIsDestinationFocused(false)}
                                    placeholderTextColor="#7A7A7A"
                                />
                            </View>

                            <TouchableOpacity
                                style={styles.driverMessageButton}
                                onPress={handleSearchDriver}
                            >
                                <Ionicons name="chatbox" size={20} color="#FFFFFF" />
                                <Text style={styles.driverMessageButtonText}>Скажу адрес водителю</Text>
                            </TouchableOpacity>

                            {!isDestinationFocused && (
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
                            )}
                        </>
                    ) : (
                        <TouchableOpacity
                            style={styles.deliveryButton}
                            onPress={() => Linking.openURL('tel:+99361616161')}
                        >
                            <Text style={styles.deliveryButtonText}>Заказать доставку</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>

            {/* Модальное окно поиска водителя */}
            <Modal
                visible={showDriverSearch}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDriverSearch(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowDriverSearch(false)}
                >
                    <TouchableOpacity
                        style={styles.modalContent}
                        activeOpacity={1}
                        onPress={(e) => e.stopPropagation()}
                    >
                        {!driverFound ? (
                            <>
                                <Text style={styles.modalTitle}>Поиск водителя</Text>
                                <Text style={styles.modalText}>Поиск водителя может занять до пяти минут</Text>
                                <LottieView
                                    ref={animationRef}
                                    source={require('../../assets/Animations/LoadAnimation.json')}
                                    autoPlay
                                    loop
                                    style={styles.loadingAnimation}
                                />
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Ваш водитель {driverInfo.name} уже выехал</Text>
                                <Text style={styles.modalText}>
                                    Автомобиль {driverInfo.carModel}, {driverInfo.carColor}, {driverInfo.carNumber}
                                    {'\n'}Прибудет через {driverInfo.arrivalTime}
                                </Text>

                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.callDriverButton}
                                        onPress={() => Linking.openURL(`tel:${driverInfo.phone}`)}
                                    >
                                        <Text style={styles.callDriverButtonText}>Позвонить водителю</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.closeModalButton}
                                        onPress={() => {
                                            setShowDriverSearch(false);
                                            setDriverInfo(true);
                                        }}
                                    >
                                        <Text style={styles.closeModalButtonText}>Закрыть</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            {/* Модальное окно информации о водителе */}
            <Modal
                visible={driverInfo}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setDriverInfo(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setDriverInfo(false)}
                >
                    <TouchableOpacity
                        style={styles.modalContent}
                        activeOpacity={1}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <Text style={styles.modalTitle}>Ваш водитель {driverInfo.name} уже выехал</Text>
                        <View style={styles.carInfoContainer}>
                            <Text style={styles.carInfoTitle}>О машине:</Text>
                            <Text style={styles.carInfoText}>- {driverInfo.carModel}</Text>
                            <Text style={styles.carInfoText}>- {driverInfo.carNumber}</Text>
                            <Text style={styles.carInfoText}>- {driverInfo.carColor}</Text>
                            <Text style={styles.carInfoText}>- Водитель приедет через {driverInfo.arrivalTime}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.callDriverButtonWide}
                            onPress={() => Linking.openURL(`tel:${driverInfo.phone}`)}
                        >
                            <Text style={styles.callDriverButtonText}>Позвонить водителю</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
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
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 80,
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
    menuHeader: {
        backgroundColor: '#093EFE',
        width: '100%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 15,
    },
    menuHeaderText: {
        flexDirection: 'column'
    },
    menuHeaderName: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 18
    },
    menuHeaderRole: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 14
    },
    menuItems: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 30,
        paddingHorizontal: 30,
        gap: 25,
    },
    menuItem: {
        flexDirection: 'row',
        gap: 5
    },
    menuItemText: {
        fontWeight: '500',
        fontSize: 15,
        color: '#7A7A7A'
    },
    menuFooter: {
        paddingVertical: '90%'
    },
    supportButton: {
        backgroundColor: '#F3F3F3',
        padding: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '10%',
        gap: 10
    },
    supportButtonText: {
        fontWeight: '500',
        fontSize: 15,
        color: '#7A7A7A'
    },
    content: {
        flex: 1,
        backgroundColor: 'gray'
    },
    map: {
        width: '100%',
        height: '100%',
    },
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
    serviceSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        padding: 5,
    },
    serviceButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    selectedServiceButton: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    serviceButtonText: {
        fontSize: 16,
        color: '#7A7A7A',
        fontWeight: '500',
    },
    selectedServiceButtonText: {
        color: '#093EFE',
    },
    carouselContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    carItem: {
        width: CAR_ITEM_WIDTH,
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 140,
        marginRight: 10,
    },
    selectedCarItem: {
        backgroundColor: '#E0E8FF',
        borderWidth: 1,
        borderColor: '#093EFE',
    },
    carImage: {
        width: 80,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    carName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 5,
    },
    carPrice: {
        fontSize: 14,
        color: '#7A7A7A',
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
    },
    searchInputText: {
        marginLeft: 10,
        color: '#7A7A7A',
        fontSize: 16,
        flex: 1,
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
    driverMessageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#093EFE',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        gap: 10,
    },
    driverMessageButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    deliveryButton: {
        backgroundColor: '#093EFE',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    deliveryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#7A7A7A',
        textAlign: 'center',
        marginBottom: 20,
    },
    loadingAnimation: {
        width: 150,
        height: 150,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    callDriverButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#3461FD',
    },
    callDriverButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    closeModalButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#DA1A2B',
    },
    closeModalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    callDriverButtonWide: {
        width: '100%',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#3461FD',
    },
    carInfoContainer: {
        width: '100%',
        marginTop: 10,
    },
    carInfoTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
    },
    carInfoText: {
        fontSize: 14,
        color: '#7A7A7A',
        marginBottom: 5,
    },
});

export default MapPage;