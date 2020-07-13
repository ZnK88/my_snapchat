import * as React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


export default function AppCamera(props) {

    
    const takeImage = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowEditing: true,
        });
        if (!cancelled) {
            props.navigation.navigate('Snap', { image: uri });
        }
    }

    return (

        <View style={ styles.container }>
            <TouchableOpacity 
                style={ styles.buttonparam }
                onPress={ () => props.navigation.navigate('Setting') }
            >
                 <Image style={ styles.iconparam } source={ require('../assets/icon-parametre.png') } />
            </TouchableOpacity>
           
            <Image style={ styles.logo } source={ require('../assets/small-logo.png') } />
            <TouchableOpacity 
                style={ styles.button }
                onPress={ () => takeImage() }
            >
                <Text style={ styles.text }>Take a snap</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
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
        height: 60,
    },
    text: {
        fontSize: 20,
        color: 'grey',
    },
    logo:{
        width:250,
        height:400
    },
    iconparam:{
        width:25,
        height:25
    }
})

