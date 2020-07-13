//Erreur 422 toujours présente dans l'API "Recipient does not exist"
import * as React from 'react';
import { 
    Text, 
    View, 
    StyleSheet,
    Image,
    Picker,
    TouchableOpacity, 
    AsyncStorage,  
} from 'react-native';
import Axios from 'axios';

export default function AppSnap(props) {
    
    const uri = props.route.params.image
    const [ users, setUsers ]           = React.useState([]);
    const [ sendTo, setSendTo ]         = React.useState('none');
    const [ duration, setDuration ]     = React.useState('');
    const [ tokenUser, setTokenUser ]   = React.useState('');

    const data = {
        "duration"  : duration,
        "to"        : sendTo,
        "image"     : uri,
    }

    const sendSnapHandler = () => {
        Axios.post('snapi.epitech.eu/snap', data , 
            {
                headers: {
                    "Content-Type" : "multipart/form-data",
                    "token" : tokenUser,
                }
            })
        .then(response => {
                console.log('Response : ', response.data);
                console.log('Status : ', response.status);
        })
        .catch(error => {
                console.log('Data dans error : ', data); //data is ok but still error 422
                console.log('Error : ', error.response.data);
                console.log(error.response.status);
        });
        }
    

    React.useEffect(() => { getUsers(); }, []);

    const  getUsers = async () => {
        const token = await AsyncStorage.getItem("token");
        setTokenUser(token);
        Axios.get('http://snapi.epitech.eu/all', {
                headers: {
                    'token': token,
                }
        })
        .then(response => {
            setUsers(response.data.data);
        })
        .catch(error => {
            console.log('Error to  get users : ', error);
        });
    }


    return (
        <View style={ styles.container }>
            <Text style={ styles.text }>Preview</Text>
            <Image 
                source={{ uri: uri }}
                style={ styles.preview } 
            />
            <Text style={ styles.text }>Contact</Text>
            <Picker
                selectedValue={ sendTo }
                style={ styles.picker }
                onValueChange={ itemValue => 
                    setSendTo(itemValue)
                }
            >
                <Picker.Item label="Select a user" value="none" />
                { 
                
                    users.map((item, index) => {
                        return <Picker.Item key={ index } label={ item.email } value={ item.email } />})
                }
            </Picker>
            <Text style={ styles.text }>Duration</Text>
            <Picker
                selectedValue={ duration }
                style={ styles.picker }
                onValueChange={ itemValue => 
                    setDuration(itemValue)
                }
            >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="12" value="12" />
            </Picker>
            <TouchableOpacity
                style={ styles.button }
                onPress={ () => sendSnapHandler() }
            >
                <Text style={ styles.text }>Send a Snap</Text>
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
    preview: {
        margin: 30,
        marginTop : 4,
        width: 300,
        height: 400,
        resizeMode:  'contain',
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        color: 'black',
    },
    picker: {
        height: 50,
        width: 300,
        color: 'dimgrey',
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
    }
});