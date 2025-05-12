import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreenComponent = ({ navigation }) => {
    useEffect(() => {
        const prepare = async () => {
            try {
                // Имитация загрузки данных
                await new Promise(resolve => setTimeout(resolve, 4000));
            } catch (e) {
                console.warn(e);
            } finally {
                // Переход на LoginPage вместо HomePage
                navigation.replace('Login');
            }
        };

        prepare();
    }, []);

    return (
        <LinearGradient
            colors={['#00153D', '#1D43A1']}
            style={styles.container}
        >
            <LottieView
                source={require('../../assets/Animations/Flow2.json')}
                autoPlay
                loop
                style={styles.animation}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: '100%',
    },
    animation: {
        width: "100%", // Настройте размер анимации по вашему усмотрению
        height: "100%",
    },
});

export default SplashScreenComponent;