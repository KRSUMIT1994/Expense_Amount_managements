import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar ,
  Text,
  TouchableOpacity,
} from 'react-native';
import HomeScreen from '../DrawerPage/HomeScreen';
import {Actions} from 'react-native-router-flux';
export default class Home extends Component {

  render() {
    return (
    
         <View style={styles.container}>
        <HomeScreen/>
      </View>
    
    );
  }
}

const styles = StyleSheet.create({
  // menuitem_scrren : {
  //   position: 'relative',
  //   top: 0,
  //   left: 100,
  //   right: 0,
  //   bottom: 200,
  // },
  // adddExpenseButton:{
  //     width:300,
  //     height:250,
  //     alignItems:'center',
  //     justifyContent:'center',
  //     backgroundColor:'rgba(255,255,255,0.2)',
  //     borderRadius:500
  // },
  // addText:{
  //     color:'#ffffff',
  //     fontSize:35,
  //     fontFamily:'sans-serif-light'
  // },
  // expenseText:{
  //     fontFamily:'sans-serif-light',
  //     fontSize:35,
  //     color:'#104E8B'
  // }
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    justifyContent: 'center',

},
});