import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
} from 'react-native';
import Axios from 'axios';

class AppProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
           snaps : []
        }
    }

    alertItemDuration = (item) => {
        alert('Snap displayed for ' + item.duration + ' seconds');
    }
    
    async getSnapsHandler () {
        let token = await AsyncStorage.getItem('token');
        
        Axios.get('http://snapi.epitech.eu/snaps', {
            headers: {
                'token': token
            }
        })
        .then(response => {
            this.setState({snaps: response.data.data})
        })
        .catch(error => {
            console.log('Error : ', error);
        });
    }

    componentDidMount() {
        this.getSnapsHandler();
    }

    render () {
        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>Snaps received</Text>
                {
                   this.state.snaps.map((item, index) => (
                       <TouchableOpacity
                            style={ styles.button }
                            key={ item.from }
                            onPress={ () => this.alertItemDuration(item) }
                        >
                            <Text style={ styles.email }>{ item.from }</Text>
                        </TouchableOpacity>
                   ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
        color: 'black',
    },
    email: {
        fontSize: 20,
        color: 'dimgrey',
        textDecorationLine: 'underline',
    },
    button: {
        width: 300,
        resizeMode: 'contain',
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
});

export default AppProfile;