import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    AsyncStorage
} from 'react-native';

class AppHome extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      token: null
    }
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token')
    this.setState({token: token})
  }


  render(){
    const { navigation } = this.props;
    if (this.state.token != null)
    {
      navigation.navigate('Camera')
    }
    
    return (
      <View style={ styles.container }>
        <Image style={ styles.logo } source={ require('../assets/logo.png') }/>
        <TouchableOpacity
          style={styles.button}
          onPress={ () => navigation.navigate('Login') }
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={ () => navigation.navigate('Register') }
        >
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      backgroundColor: 'yellow',
    },
    logo: {
      width: 300,
      height: 200,
      resizeMode: 'cover',
      margin: 10,
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
    text: {
      fontSize: 20,
      color: 'black',
    }
});
export default AppHome;