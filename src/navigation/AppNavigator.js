import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreenComponent from '../screens/SplashScreen';
import LoginPage from '../screens/LoginPage';
import SignUpPage from '../screens/SignUpPage';
import HomePage from '../screens/HomePage';
import PasswordReset from '../screens/PasswordReset';
import CodePage from '../screens/CodePage';
import RoleChoose from '../screens/RoleChoose';
import Congrats from '../screens/Congrats';
import DriverRegistration from '../screens/DriverRegistration';
import MapPage from '../screens/MapPage';
import SettingPage from '../screens/SettingPage';
import DriveHistory from '../screens/DriveHistory';
import ReferalPage from '../screens/ReferalPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Симулируем загрузку (например, проверку авторизации)
        setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 секунды, потом переходим на LoginPage
    }, []);

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={isLoading ? 'SplashScreen' : 'Login'} // Управляем начальным экраном
        >
            <Stack.Screen name="SplashScreen" component={SplashScreenComponent} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name='PasswordReset' component={PasswordReset} />
            <Stack.Screen name='CodePage' component={CodePage} />
            <Stack.Screen name='RoleChoose' component={RoleChoose} />
            <Stack.Screen name='Congrats' component={Congrats} />
            <Stack.Screen name='DriverRegistration' component={DriverRegistration} />
            <Stack.Screen name='MapPage' component={MapPage} />
            <Stack.Screen name="SettingPage" component={SettingPage} />
            <Stack.Screen name='DriveHistory' component={DriveHistory} />
            <Stack.Screen name='ReferalPage' component={ReferalPage} />
        </Stack.Navigator>
    );
};

export default AppNavigator;