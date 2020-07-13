import React, { useState } from 'react';
import { 
    View, 
    Text,
    Image, 
    TouchableOpacity, 
    TextInput, 
    StyleSheet
} from 'react-native';
import Axios from 'axios';

function AppRegister({ navigation }) {
    //Ajout des variable a set
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <View style= { styles.container }>
            <Image style={ styles.logo } source={ require('../assets/logo.png') } />
            <Text styles={styles.title}>E-mail address</Text>
            <TextInput 
                style={ styles.input } 
                placeholder = "E-mail address"
                onChangeText={ email => setEmail(email) } 
            />
            <Text styles={ styles.title }>Password</Text>
            <TextInput 
                style={ styles.input }  
                secureTextEntry={ true }
                placeholder = "Password"
                onChangeText={ password => setPassword(password) }
            />
            <TouchableOpacity
                style={ styles.button }
                onPress={ () => { axiosRegister(email,password,{navigation}) } }
            >
                <Text style={ styles.text }>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

function axiosRegister(email, password, { navigation }) {
    console.log(email)
    console.log(password)
    Axios.post('http://snapi.epitech.eu/inscription',{
          "email" : email,
          "password" : password,
    })
    .then(res => {
        navigation.goBack();
        navigation.push('Login');
    })
    .catch(err => {
        if(err.response.data.data.email) {
            alert(err.response.data.data.email);
        }
        if(err.response.data.data.password) {
            alert(err.response.data.data.password);
        }
    });
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    logo: {
        width: 300,
        height: 200,
        resizeMode: 'cover',
        margin: 10,
    },
    text: {
        fontSize: 20,
        color: 'black',
    },
    input: {
        margin: 15,
        width: 300,
        height: 40,
        fontSize: 20,
        borderColor: 'dimgrey',
        textAlign:'center',
        color: 'dimgrey',
        borderWidth: 1
    },
    button: {
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 5,
        borderColor: 'dimgrey',
        borderRadius: 5,
        borderWidth: 1,
        margin: 5,
    },
});


export default AppRegister;
