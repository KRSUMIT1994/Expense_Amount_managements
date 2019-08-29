import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar ,
  Text	,ActivityIndicator,

	AsyncStorage
} from 'react-native';
import Routs from './src/Router';
import Login from './src/pages/Login';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="#1c313a"
           barStyle="light-content"
         />
         <Routs/>
       
      </View>
    );
  }
}
// const AppStack = createStackNavigator({ Home: Login, Other: home });
// const AuthStack = createStackNavigator({ Home:HomeScreen});
// class AuthLoadingScreen extends React.Component {
// 	constructor(props) {
// 	  super(props);
// 	  this._isLoading();
// 	}
// 	render() {
// 		return (
// 		  <View style={{ flex: 1,
// 			justifyContent: "center",
// 			alignItems: "center",
// 			backgroundColor: "#455a64"}}>
// 			<ActivityIndicator />
// 			<StatusBar barStyle="default" />
// 		  </View>
// 		)};
// 		_isLoading = async () => {
// 			const Userid = await AsyncStorage.getItem('Userid');
// 			this.props.navigation.navigate(Userid ? 'App' : 'Auth');
// 		  };
// 	}
// 	export default createAppContainer((
// 		{
// 		  AuthLoading: AuthLoadingScreen,
// 		  App: AppStack,
// 		  Auth: AuthStack,
// 		},
// 		{
// 		  initialRouteName: 'AuthLoading',
// 		}
// 	  ));

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});