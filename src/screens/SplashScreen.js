import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    withSequence,
    withDelay,
    Easing,
    runOnJS,
    interpolate,
    Extrapolate,
} from 'react-native-reanimated';

const Particle = ({ index, progress, colors }) => {
    const angle = (index * (2 * Math.PI)) / 16;
    const distance = 120 + Math.random() * 60;

    const particleStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            progress.value,
            [0, 0.3, 0.8, 1],
            [0, 1, 1, 0],
            Extrapolate.CLAMP
        );

        const currentDistance = interpolate(
            progress.value,
            [0, 1],
            [10, distance],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [
                {
                    translateX: currentDistance * Math.cos(angle)
                },
                {
                    translateY: currentDistance * Math.sin(angle)
                },
                {
                    scale: interpolate(
                        progress.value,
                        [0, 0.5, 1],
                        [0.5, 1, 0.3],
                        Extrapolate.CLAMP
                    )
                }
            ],
            backgroundColor: colors[index % colors.length],
        };
    });

    return (
        <Animated.View style={[
            styles.particle,
            particleStyle,
        ]} />
    );
};

const SplashScreenComponent = ({ navigation }) => {
    // Основные анимации
    const scale = useSharedValue(0.7);
    const opacity = useSharedValue(0);
    const positionY = useSharedValue(80);
    const borderRadius = useSharedValue(100);
    const glow = useSharedValue(0);
    const progress = useSharedValue(0);
    const taxiLight = useSharedValue(0);

    // Цвета для частиц (фирменные цвета TaxiTm + белый)
    const particleColors = ['#1D43A1', '#5A24B3', '#FFFFFF', '#00B0FF', '#00153D'];

    // Создаем 16 частиц
    const particles = Array.from({ length: 16 }, (_, i) => i);

    useEffect(() => {
        const prepare = async () => {
            try {
                // 1. Старт анимации
                progress.value = withTiming(1, { duration: 4000 });

                // 2. Анимация "такси-лампы" (пульсация)
                taxiLight.value = withSequence(
                    withDelay(500, withTiming(1, { duration: 300 })),
                    withTiming(0, { duration: 200 }),
                    withDelay(1000, withTiming(1, { duration: 300 })),
                    withTiming(0, { duration: 200 }),
                    withDelay(500, withTiming(1, { duration: 300 })),
                    withTiming(0.3, { duration: 1000 }),
                );

                // 3. Появление логотипа
                positionY.value = withSequence(
                    withTiming(-15, { duration: 700, easing: Easing.out(Easing.exp) }),
                    withSpring(0, { damping: 8, stiffness: 100 })
                );

                opacity.value = withTiming(1, { duration: 800 });

                // 4. Анимация масштаба
                scale.value = withSequence(
                    withTiming(1.1, { duration: 700, easing: Easing.out(Easing.exp) }),
                    withSpring(1, { damping: 8, stiffness: 100 })
                );

                // 5. Эффект превращения в квадрат
                borderRadius.value = withTiming(0, {
                    duration: 2000,
                    easing: Easing.out(Easing.exp),
                });

                // 6. Эффект свечения
                glow.value = withSequence(
                    withDelay(1200, withTiming(1, { duration: 600 })),
                    withTiming(0.5, { duration: 1500 })
                );

                // 7. Задержка перед финальным эффектом
                await new Promise(resolve => setTimeout(resolve, 3500));

                // 8. Финальный "отъезд такси"
                positionY.value = withTiming(-200, {
                    duration: 800,
                    easing: Easing.in(Easing.exp),
                });

                scale.value = withTiming(1.5, {
                    duration: 800,
                    easing: Easing.in(Easing.exp),
                });

                opacity.value = withTiming(0, { duration: 800 });
                glow.value = withTiming(2, { duration: 800 });

                // 9. Переход
                await new Promise(resolve => setTimeout(resolve, 800));
                runOnJS(navigation.replace)('Login');
            } catch (e) {
                console.warn(e);
            }
        };

        prepare();
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateY: positionY.value },
        ],
        opacity: opacity.value,
        borderRadius: borderRadius.value,
    }));

    const glowStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            glow.value,
            [0, 0.5, 1, 2],
            [0, 0.15, 0.25, 0],
            Extrapolate.CLAMP
        ),
        transform: [
            {
                scale: interpolate(
                    glow.value,
                    [0, 1, 2],
                    [1, 1.3, 2],
                    Extrapolate.CLAMP
                )
            }
        ]
    }));

    const taxiLightStyle = useAnimatedStyle(() => ({
        opacity: taxiLight.value,
        transform: [
            {
                translateX: interpolate(
                    taxiLight.value,
                    [0, 1],
                    [-10, 10],
                    Extrapolate.CLAMP
                )
            }
        ]
    }));

    return (
        <LinearGradient
            colors={['#00153D', '#1D43A1', '#5A24B3']}
            style={styles.container}
        >
            {/* Частицы */}
            {particles.map((_, index) => (
                <Particle
                    key={index}
                    index={index}
                    progress={progress}
                    colors={particleColors}
                />
            ))}

            {/* Свечение */}
            <Animated.View style={[styles.glow, glowStyle]} />

            {/* Логотип */}
            <Animated.View style={[styles.logoContainer, animatedStyle]}>
                <Image
                    source={require('../../assets/images/icon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

            </Animated.View>

            {/* Название приложения */}
            <Animated.Text style={[
                styles.appName,
                {
                    opacity: progress,
                    transform: [{
                        translateY: interpolate(
                            progress.value,
                            [0, 1],
                            [30, 0],
                            Extrapolate.CLAMP
                        )
                    }]
                }
            ]}>
                TAXI TM
            </Animated.Text>

            <Animated.Text style={[
                styles.madeBy,
                {
                    opacity: progress,
                    transform: [{
                        translateY: interpolate(
                            progress.value,
                            [0, 1],
                            [30, 0],
                            Extrapolate.CLAMP
                        )
                    }]
                }
            ]}>
                Made by German Fetisov

            </Animated.Text>
            <Animated.Text style={[
                styles.madeBy,
                {
                    opacity: progress,
                    transform: [{
                        translateY: interpolate(
                            progress.value,
                            [0, 1],
                            [30, 0],
                            Extrapolate.CLAMP
                        )
                    }]
                }
            ]}>
                Designed by Demure Iskander

            </Animated.Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    logoContainer: {
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        zIndex: 2,
        position: 'relative',
    },
    logo: {
        width: '80%',
        height: '80%',
        zIndex: 2,
    },
    glow: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'rgba(100, 150, 255, 0.3)',
        zIndex: 1,
    },
    particle: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        zIndex: 0,
    },
    appName: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 60,
        letterSpacing: 1.5,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        zIndex: 3,
    },
    madeBy: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'italic',
        letterSpacing: 1.5,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        zIndex: 3,
    },
    taxiLight: {
        position: 'absolute',
        top: 10,
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 2,
        zIndex: 1,
    },
});

export default SplashScreenComponent;