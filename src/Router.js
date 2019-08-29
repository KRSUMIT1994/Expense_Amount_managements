import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
 
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddMyExpense from './pages/AddMyExpense';
import ViewMyExpense from './pages/ViewMyExpension';
import AboutUs from './pages/AboutUs';
import DetaiOfExpense from './pages/DetailOfExpension'; 
import Forgetpassword from './forgetPAssword/Forgetpassword';
import Edit_View_form from './pages/Edit_View_form';
import Shareit from './pages/ShareApp';
import HomeScreen from './DrawerPage/HomeScreen';
export default class Routes extends Component {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
			      <Scene key="login" component={Login} title="Login" initial={true}/>
			      <Scene key="signup" component={Signup} title="Register" />
				  <Scene key="homepage" component={Home} title="Home"   />
				  <Scene key="addmyexpenses" component={AddMyExpense} title="AddMyExpense"   />
				  <Scene key="viewmyexpenses" component={ViewMyExpense} title="ViewMyExpense"/>
				  <Scene key="aboutus" component={AboutUs} title="AboutUs"/>
				  <Scene key="detailOfExpense" component={DetaiOfExpense} title="DetaiOfExpense" />
				  <Scene key="forgetpassword" component={Forgetpassword} title="Forgetpassword" />
				  <Scene key='editViewForm' component={Edit_View_form} title="Edit_View_form" />
				  <Scene  key='shareit' component={Shareit} title="Shareit"/>
			
			    </Stack>
				
			 </Router>
			 
			)
	}
}
