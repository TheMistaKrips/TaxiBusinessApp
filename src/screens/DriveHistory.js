import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ScrollView } from 'react-native';

const DriveHistory = ({ navigation }) => {
    // Генерация данных для истории поездок (2022-2025)
    const generateTrips = () => {
        const years = [2025, 2024, 2023, 2022];
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const days = ['1', '2', '3', '5', '7', '10', '12', '15', '18', '20', '22', '25', '28', '30'];
        const addresses = [
            'Проспект Мира, 7',
            'Ул. Пушкина, 10',
            'Ул. Ленина, 12',
            'Ул. Гагарина, 25',
            'Ул. Советская, 15',
            'ТЦ "Мега", 1',
            'Ул. Центральная, 5',
            'ТРЦ "Галерея", 3',
            'Аэропорт',
            'ЖД Вокзал'
        ];

        return years.map(year => {
            // Случайное количество поездок от 4 до 7
            const tripCount = 4 + Math.floor(Math.random() * 4);
            const tripsForYear = [];

            for (let i = 0; i < tripCount; i++) {
                const month = months[Math.floor(Math.random() * months.length)];
                const day = days[Math.floor(Math.random() * days.length)];

                // Случайные маршруты (1-3 на поездку)
                const routeCount = 1 + Math.floor(Math.random() * 3);
                const routes = [];

                for (let j = 0; j < routeCount; j++) {
                    // Убедимся, что from и to разные
                    let fromIdx, toIdx;
                    do {
                        fromIdx = Math.floor(Math.random() * addresses.length);
                        toIdx = Math.floor(Math.random() * addresses.length);
                    } while (fromIdx === toIdx);

                    routes.push({
                        from: addresses[fromIdx],
                        to: addresses[toIdx]
                    });
                }

                tripsForYear.push({
                    id: `${year}-${i}`,
                    date: `${day} ${month.toLowerCase()}`,
                    fullDate: new Date(year, months.indexOf(month), parseInt(day)),
                    routes,
                    isOpen: false
                });
            }

            // Сортировка поездок внутри года от новых к старым
            tripsForYear.sort((a, b) => b.fullDate - a.fullDate);

            return {
                id: year.toString(),
                year: `${year}-й год`,
                trips: tripsForYear,
                isOpen: false
            };
        });
    };

    const [yearsData, setYearsData] = useState(generateTrips());
    const animations = yearsData.map(() => useRef(new Animated.Value(0)).current);

    // Функция для переключения состояния блока года
    const toggleYear = (id) => {
        setYearsData(yearsData.map(year => {
            if (year.id === id) {
                Animated.timing(animations[yearsData.findIndex(y => y.id === id)], {
                    toValue: year.isOpen ? 0 : 1,
                    duration: 200,
                    useNativeDriver: false,
                }).start();

                return { ...year, isOpen: !year.isOpen };
            }
            return year;
        }));
    };

    // Рендер маршрутов
    const renderRoutes = (routes) => {
        return routes.map((route, index) => (
            <View key={index} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5
            }}>
                <Text style={{
                    color: '#A9AAAE',
                    fontWeight: '600',
                    fontSize: 15,
                    flex: 1,
                    textAlign: 'right'
                }}>
                    {route.from}
                </Text>
                <Image source={require('../../assets/images/line.png')} style={{ marginHorizontal: 8 }} />
                <Text style={{
                    color: '#A9AAAE',
                    fontWeight: '600',
                    fontSize: 15,
                    flex: 1,
                    textAlign: 'left'
                }}>
                    {route.to}
                </Text>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={{ paddingVertical: 30 }}>
                <Text style={{ fontWeight: '700', fontSize: 32, color: '#2F2F37' }}>История поездок</Text>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 30 }}>
                {yearsData.map((year, index) => (
                    <View key={year.id} style={{ marginBottom: 16 }}>
                        <TouchableOpacity
                            onPress={() => toggleYear(year.id)}
                            style={{
                                backgroundColor: '#F5F5F6',
                                borderRadius: 16,
                                paddingVertical: 16,
                                paddingHorizontal: 16,
                                justifyContent: 'center',
                                elevation: 5
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                gap: 10
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 5,
                                    alignItems: 'center'
                                }}>
                                    <Image source={require('../../assets/page-assets/date.png')} />
                                    <Text style={{ fontWeight: '500', fontSize: 16, color: '#4D4D4D' }}>{year.year}</Text>
                                </View>
                                <View style={{
                                    justifyContent: 'center',
                                    transform: [{ rotate: year.isOpen ? '180deg' : '0deg' }]
                                }}>
                                    <Image source={require('../../assets/page-assets/vector-arrow.png')} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {year.isOpen && (
                            <Animated.View
                                style={{
                                    backgroundColor: '#F5F5F6',
                                    width: '100%',
                                    borderRadius: 16,
                                    paddingVertical: 16,
                                    paddingHorizontal: 16,
                                    gap: 16,
                                    elevation: 5,
                                    marginTop: -10,
                                    zIndex: -1
                                }}
                            >
                                {year.trips.map((trip, tripIndex) => (
                                    <View key={trip.id} style={{
                                        paddingVertical: '2%',
                                        borderBottomWidth: tripIndex === year.trips.length - 1 ? 0 : 1,
                                        borderBottomColor: '#E0E0E0',
                                        paddingBottom: tripIndex === year.trips.length - 1 ? 0 : 16
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: '600',
                                                color: '#2F2F37',
                                                marginBottom: 8
                                            }}>
                                            {trip.date}
                                        </Text>
                                        {renderRoutes(trip.routes)}
                                    </View>
                                ))}
                            </Animated.View>
                        )}
                    </View>
                ))}
            </ScrollView>
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

export default DriveHistory;