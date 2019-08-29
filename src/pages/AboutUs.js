import React, { Component } from "react";
import {
  StyleSheet,Text,View
} from "react-native";

export default class AboutUs extends Component {

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.container}>
          <Text style={{ color:'#ffffff',fontSize:30}}>About Us</Text>
      </View>
    
      </View>
     
    )
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#455a64',
      flex: 1,
      justifyContent: 'center',
      color:'#ffffff'

  },

});