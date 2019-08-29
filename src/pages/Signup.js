import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { Actions } from "react-native-router-flux";


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
      name: "",
      mobile: "",
      email: "",
      password: "",
      conf_password: "",
      isLoading: true
    };
  }
  managePasswordVisibility = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    });
  };
  handlePasswordChange = evt => {
    this.setState({
      password: evt.target.value
    });
  };
  goBack = () => {
    Actions.pop();
  };
  validateEmail = function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    const { validEmail } = this.state;
}
  login = () => {
    const { name, mobile, email, password, conf_password } = this.state;
    if (name == "") {
      this.setState({
        msg: "Please Enter Name"
      });
    } else if (mobile == "") {
      this.setState({
        msg: "Please Enter Mobile number "
      });
    } 
    if (this.state.email.trim().length == 0) {
      this.setState({msg:"Please Enter Email"})
   
    }else if(this.validateEmail(this.state.email) == false){
     this.setState({msg:"Please Enter Valid Email "})
    }
    else if (password == "") {
      this.setState({
        msg: "Please Enter Password "
      });
    }
    else if (conf_password == "") {
      this.setState({ msg: "Please Enter Confirm Password" })
    }
    else {
      fetch('http://192.168.1.18/account_management/signup.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          mobile: mobile,
          email: email,
          password: password,
          confirm_password: conf_password,
          device_key: ''

        })
      }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error == false) {
           alert(responseJson.message);
            Actions.login({ type: "reset" });
          }
          else {
            alert(responseJson.message);
          }
        }).catch((error) => {
          console.error(error);
        });

    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.formText}>

            <TextInput
              style={styles.nameText}
              placeholder="Name"
              placeholderTextColor="#ffffff"
              onChangeText={name =>
                this.setState({
                  name
                })
              }
            />
            <TextInput
              style={styles.phoneText}
              placeholder="Mobile No"
              placeholderTextColor="#ffffff"
              keyboardType={"numeric"}
              onChangeText={mobile =>
                this.setState({
                  mobile
                })
              }
            />
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder="Email"
              placeholderTextColor="#ffffff"
              selectionColor="#fff"
              keyboardType="email-address"
              autoCapitalize="none"
              onSubmitEditing={() => this.password.focus()}
              onChangeText={email =>
                this.setState({
                  email
                })
              }
            />
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <TextInput
                style={styles.inputBox}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder="Password"
                secureTextEntry={this.state.hidePassword}
                placeholderTextColor="#ffffff"
                ref={input => (this.password = input)}
                onChangeText={password =>
                  this.setState({
                    password
                  })
                }
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
            <TextInput
              style={styles.inputBox}
              underlineColorAndroid="rgba(0,0,0,0)"
              placeholder=" Confirm Password"
              secureTextEntry={this.state.hidePassword}
              placeholderTextColor="#ffffff"
              ref={input => (this.conf_password = input)}
              onChangeText={conf_password =>
                this.setState({
                  conf_password
                })
              }
            />
            <Text
              style={{
                color: "yellow",
                fontSize: 20
              }}
            >
              {this.state.msg}
            </Text>
            <TouchableOpacity
              style={styles.submitTextButton}
              onPress={this.login}
            >
              <Text style={styles.submitText}> Submit </Text>
            </TouchableOpacity>
            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}> Already have an account </Text>
              <TouchableOpacity onPress={this.goBack}>
                <Text style={styles.signupButton}> Sign in </Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#455a64"
  },
  formText: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
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

  signupText: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16
  },
  signupButton: {
    color: "#FFBD62",
    fontSize: 16,
    fontWeight: "500"
  },
  nameText: {
    width: 300,
    backgroundColor: "rgba(255, 255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#ffffff",
    marginVertical: 10,
    marginTop: 300
  },
  phoneText: {
    width: 300,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10
  },
  submitTextButton: {
    backgroundColor: "#1c313a",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 47,
    margin: 15
  },
  submitText: {
    fontSize: 16,
    color: "#ffffff"
  },
  signupTextCont: {
    flexDirection: "row",
    marginBottom: 370
  },
  visibilityBtn: {
    position: "absolute",
    right: 10,
    height: 50,
    width: 35,
    padding: 2,
    bottom: 9
  },
  btnImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  }
});
