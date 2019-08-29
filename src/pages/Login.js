import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import Loader from  '../components/Loader'
const userIfo={email:'email',password:'password'};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      email: "",
      password: "",
      Userid:'',
    isLoading:true,
    loading:true,
    };
    this.home = this.home.bind(this);
  }
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  };
  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };
  logins() {
    Actions.signup();
  }


   componentDidMount() {
    this._loadInitialState().done();
}
    _loadInitialState = async () => {
    let value= await AsyncStorage.getItem('Userid');
 
    if (value !== null  ){
      this.setState({isLoading:true})
      Actions.homepage()
    }
    else{
      this.setState({isLoading:false})
      //Actions.login()
    }
    }

  home = async() => {
    const { password } = this.state;
    let text = this.state.email;
    let emailError = this.state.emails;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (reg.test(text) === false) {
      this.setState({ msg: "Invalid email" });
      this.setState({ email: text });
      return false;
    } else if (password == "") {
      this.setState({ msg: "Please Enter password " });
    } else {
      const { email } = this.state;
      const { password } = this.state;
      fetch("http://192.168.1.18/account_management/Login.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error == false &&email===this.state.email &&password ===this.state.password) {
            AsyncStorage.setItem("Name", responseJson.user_data.name);
            AsyncStorage.setItem("email", responseJson.user_data.email);
            AsyncStorage.setItem("Userid", responseJson.user_data.user_id);
            AsyncStorage.setItem("Mobile", responseJson.user_data.mobile);
            AsyncStorage.setItem("password", responseJson.user_data.password);
      
            Actions.homepage({ type: "reset" });
          } 
        
          else {
            alert(responseJson.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  forgetPass = () => {
    Actions.forgetpassword();
  };
  render() {
    
    if (this.state.isLoading) {
      return(
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <ActivityIndicator size="large"  />
        </View>
      )
    }
    
    return (
      <View style={styles.container}>
     {/* <Loader
          loading={this.state.loading} /> */}
        <Text style={styles.welcomText}>Welcome to Account Management</Text>
        <Text style={{ color: "yellow", fontSize: 20 }}>{this.state.msg}</Text>
        <TextInput
          style={styles.inputBox}
          value={this.state.email}
          underlineColorAndroid="transparent"
          placeholder={" Email "}
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onSubmitEditing={() => this.password.focus()}
          onChangeText={text => this.setState({ email: text })}
          type="email"
          autoCapitalize="none"
        />

        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder={" Password"}
            secureTextEntry={this.state.hidePassword}
            placeholderTextColor="#ffffff"
            ref={input => (this.password = input)}
            onChangeText={password => this.setState({ password })}
          />

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.visibilityBtn}
            onPress={this.managePasswordVisibility}
          >
            <Image
              source={
                this.state.hidePassword
                  ? require("../logos/hide.png")
                  : require("../logos/show.png")
              }
              style={styles.btnImage}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.home}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={this.forgetPass}>
            <Text style={{ color: "#ffffff" }}> Forgot Password...?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={this.logins}>
            <Text style={styles.signupButton}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    }
}  
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#455a64"
  },
  welcomText: {
    fontFamily: "sans-serif-light",
    fontSize: 16,
    color: "#ffffff",
    padding: 10
  },
  inputBox: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10
  },
  button: {
    width: 300,
    backgroundColor: "#1c313a",
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
  },
  signupTextCont: {
    paddingVertical: 16,
    flexDirection: "row",
    fontFamily: "sans-serif-light",
    marginTop: 100
  },
  signupText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 16,
    fontFamily: "sans-serif-light"
  },
  signupButton: {
    fontSize: 16,
    color: "#FFBD62"
  },
  visibilityBtn: {
    position: "absolute",
    right: 8,
    height: 50,
    width: 35,
    padding: 3,
    bottom: 10
  },
  btnImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  }
});
