import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const DriverRegistration = ({ navigation }) => {
    const [images, setImages] = useState([null, null]); // Состояние для двух изображений
    const [number, setNumber] = useState('');
    const [color, setColor] = useState('');

    const handleLogin = () => {
        navigation.navigate('HomePage');
    };

    const [options, setOptions] = useState({
        seatHeater: false,
        heater: false,
        airConditioner: false,
    });

    const toggleOption = (option) => {
        setOptions({
            ...options,
            [option]: !options[option],
        });
    };

    const pickImage = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result); // Проверка результата в консоли

        if (!result.canceled) { // Используем result.canceled вместо result.cancelled
            const newImages = [...images];
            newImages[index] = result.assets[0].uri; // Используем result.assets[0].uri
            setImages(newImages);
        }
    };

    return (
        <View style={styles.container}>
            {/* Добавить фотографию */}
            <View style={styles.photoSection}>
                <Text style={styles.sectionTitle}>Добавить фотографию</Text>
            </View>

            {/* Контейнер для двух изображений */}
            <View style={styles.row}>
                {images.map((image, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => pickImage(index)}
                        style={styles.imageContainer}
                    >
                        {image ? (
                            <Image source={{ uri: image }} style={styles.image} />
                        ) : (
                            <Image source={require('../../assets/page-assets/pickFrame.png')} style={styles.placeholderImage} />
                        )}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Номер машины и цвет */}
            <View>
                <Text style={styles.sectionTitle}>Номер машины</Text>
                <TextInput
                    style={styles.input}
                    placeholder="ST5162AG"
                    value={number}
                    onChangeText={setNumber}
                    placeholderTextColor="#7C8BA0"
                />

                <Text style={styles.sectionTitle}>Цвет машины</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Белый"
                    value={color}
                    onChangeText={setColor}
                    placeholderTextColor="#7C8BA0"
                />
            </View>

            {/* Дополнительно */}
            <View>
                <Text style={styles.sectionTitle}>Дополнительно</Text>
                <Text style={styles.sectionSubtitle}>
                    Выберите те категории, которые {"\n"}присутствуют в вашей машине
                </Text>
            </View>

            {/* Кнопки выбора опций */}
            <View style={styles.optionsContainer}>
                {/* Первая строка: две кнопки в ряд */}
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.optionButton, options.seatHeater && styles.selectedOption]}
                        onPress={() => toggleOption('seatHeater')}
                    >
                        <Text style={[styles.optionText, options.seatHeater && styles.selectedText]}>
                            Обогреватель кресла
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.optionButton, options.heater && styles.selectedOption]}
                        onPress={() => toggleOption('heater')}
                    >
                        <Text style={[styles.optionText, options.heater && styles.selectedText]}>Печка</Text>
                    </TouchableOpacity>
                </View>

                {/* Вторая строка: одна кнопка под ними */}
                <View style={styles.singleOptionContainer}>
                    <TouchableOpacity
                        style={[styles.optionButton, options.airConditioner && styles.selectedOption]}
                        onPress={() => toggleOption('airConditioner')}
                    >
                        <Text style={[styles.optionText, options.airConditioner && styles.selectedText]}>Кондиционер</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Кнопка входа */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Войти в аккаунт</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    photoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    sectionTitle: {
        color: '#2F2F37',
        fontSize: 17,
        fontWeight: '600',
        marginTop: 20,
    },
    sectionSubtitle: {
        color: '#606060',
        fontWeight: '400',
        fontSize: 16,
        marginTop: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    imageContainer: {
        width: '48%', // Ширина контейнера для изображения
        aspectRatio: 1, // Соотношение сторон 1:1 (квадрат)
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F8',
        borderRadius: 10,
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#F2F3EE',
    },
    optionsContainer: {
        marginTop: 20,
    },
    optionButton: {
        flex: 1,
        padding: 15,
        marginHorizontal: 5,
        backgroundColor: '#F3F4F8',
        borderRadius: 42,
        alignItems: 'center',
        alignContent: "center"
    },
    selectedOption: {
        backgroundColor: '#3461FD',
    },
    optionText: {
        fontSize: 16,
        color: '#606060',
    },
    selectedText: {
        color: '#fff',
    },
    singleOptionContainer: {
        width: 200,
        height: 50, // Занимает всю ширину
        marginTop: 10,
        marginBottom: 10, // Отступ сверху
    },
    loginButton: {
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
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DriverRegistration;