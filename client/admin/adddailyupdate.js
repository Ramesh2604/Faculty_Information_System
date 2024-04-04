import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function AddDailyUpdate() {
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const navigation = useNavigation();

    const handleConfirm = (selectedDate) => {
        setDate(selectedDate.toLocaleDateString());
        hideDatePicker();
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://192.168.200.150:5000/api/dailyupdate/adddailyupdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ description, department, date }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('Success', 'Daily update added successfully');
                navigation.navigate("Adminhome");
            } else {
                console.error('Error adding daily update:', data.error);
            }
        } catch (error) {
            console.error('Error adding daily update:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Add Daily Update</Text>
            
            <Text style={styles.label}>Department</Text>
            <View style={styles.inputContainer}>
                <Icon name="building" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    value={department}
                    onChangeText={text => setDepartment(text)}
                    placeholder="Enter department"
                    placeholderTextColor="#aaa"
                />
            </View>

            <Text style={styles.label}>Date</Text>
            <View style={[styles.inputContainer,isDatePickerVisible && styles.activeInput]}>
                <Icon name="calendar" size={20} color="#666" style={styles.icon} />
                <TouchableOpacity onPress={showDatePicker}>
                    <Text style={styles.dateInput}>{date ? date : 'Select date'}</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

            <Text style={styles.label}>Description</Text>
            <View style={styles.inputContainer}>
                <Icon name="edit" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={text => setDescription(text)}
                    placeholder="Enter description"
                    placeholderTextColor="#aaa"
                    multiline
                />
            </View>
            
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Create Daily Update</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        padding: 20,
        flex: 1,
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        borderRadius: 10,
    },
    dateInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 30,
        paddingVertical: 20,
        fontSize: 16,
        color: '#333',
        borderRadius: 10,
    },
    icon: {
        marginRight: 10,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
        width: '60%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    head:{
        fontSize:25,
        fontWeight:"bold",
        textAlign:"center",
        marginTop:50,
        marginBottom:30,
        color: '#333',
    },
    activeInput: {
        borderColor: 'blue', // Change border color when active
    },
});
