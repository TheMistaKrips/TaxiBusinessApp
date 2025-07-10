import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DriverHomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Экран водителя</Text>
            <Text style={styles.subtitle}>Это специальный экран для водителей такси</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MapPage')}
            >
                <Text style={styles.buttonText}>Начать работу</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#377DFF',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        color: '#61677D',
        textAlign: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#377DFF',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 15,
        shadowColor: '#377DFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DriverHomeScreen;