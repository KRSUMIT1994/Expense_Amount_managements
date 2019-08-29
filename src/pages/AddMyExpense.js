import React, { Component } from "react";
import {
   StyleSheet,
   Text,
   View,
   Picker,
   TouchableOpacity,
   TextInput, SafeAreaView,
   ScrollView,
   Alert,
   Switch,
   AsyncStorage
} from "react-native";

import DatePicker from 'react-native-datepicker'
import { Actions } from "react-native-router-flux";
export default class AddMyExpense extends Component {
   constructor(props) {
      super(props);
      this.state = {
         category: '',
         tittle: '',
         amount: '',
         date: '',

         Userid: '',
         switchValue: false

      };
   }

   updateUser = (category) => {
      // alert(JSON.stringify(user))
      this.setState({ category })
   }
   state = { selectuserVlaue: '' }
   updateValue = (selectuserVlaue) => {
      this.setState({ selectuserVlaue: selectuserVlaue })
   }

   componentDidMount() {
      AsyncStorage.getItem("Userid").then((value) => {
         this.setState({ "Userid": value })
      }).done();
   }

   clickme = () => {
      const { tittle, amount, switchValue, date, category } = this.state;
      //var data = this.state.category;
      var data = this.state.selectuserVlaue;
      if (tittle == '') {
         this.setState({ msg: "please enter title" })
      }
      else if (amount == '') {
         this.setState({ msg: "please enter amount" })
      }
      else if (date == '') {
         this.setState({ msg: "please enter date" })
      }

      else if (category == "") {
         alert("Please Select a Option");
      } else {

         fetch('http://192.168.1.18/account_management/add_expanse.php', {
            method: 'POST',
            headers:
            {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               category: category,
               title: tittle,
               amount: amount,
               extra_expanse: switchValue,
               date: date,
               user_id: this.state.Userid
            })
         }).then((response) => response.json())
            .then((responseJson) => {
               alert(responseJson.message);
               Actions.homepage({ type: "reset" });
            }).catch((error) => {
               console.error(error);
            });
      };
   }

   render() {
      const { extra_expense } = this.state;

      const textValue = extra_expense ? "Yes" : "No";
      return (
         <View style={styles.container}>

            <SafeAreaView style={styles.safeAreaStyle}>
               <Text style={styles.headerTitle}>Add Expense</Text>
            </SafeAreaView>
            <ScrollView>
               <View style={styles.categoryArrangmt}>
                  <Text style={styles.categoryText}>Category</Text>
                  <View style={styles.pickerBorder}>
                     <Picker style={styles.pickerItem} selectedValue={this.state.category}

                        onValueChange={(this.updateUser)}


                     >
                        <Picker.Item label="Select" value="" />
                        <Picker.Item label="Shopping" value="1" />
                        <Picker.Item label="Travelling" value="2" />
                        <Picker.Item label="Medical" value="3" />
                        <Picker.Item label="Personal Care" value="4" />
                        <Picker.Item label="Banking" value="5" />
                        <Picker.Item label="Rent" value="6" />
                        <Picker.Item label="Taxes" value="7" />
                        <Picker.Item label="Glossary" value="8" />
                        <Picker.Item label="Telephone Expension" value="9" />
                        <Picker.Item label="Internet Expension" value="10" />
                     </Picker>
                  </View>
               </View>
               <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between' }}>
                  <Text style={styles.TittleText}>Title</Text>
                  <TextInput style={styles.tittleBox}
                     placeholder="Title"
                     placeholderTextColor='#ffffff'
                     underlineColorAndroid="transparent"
                     placeholderStyle={{ color: 'red' }}
                     onChangeText={tittle => this.setState({ tittle })}
                  />
               </View>
               <View style={{ flexDirection: 'row', margin: 3, justifyContent: 'space-between' }}>
                  <Text style={styles.amountText}>Amount</Text>
                  <TextInput style={styles.amountBox}
                     placeholder="Amount"
                     placeholderTextColor='#ffffff'
                     underlineColorAndroid="transparent"
                     keyboardType={'numeric'}
                     placeholderStyle={{ color: 'red' }}
                     onChangeText={amount => this.setState({ amount })}
                  />
               </View>
               <View style={styles.extraExpensionView}>
                  <Text style={styles.extraexpensionText}>Extra Expense</Text>
                  <View style={{ backgroundColor: '#ffffff' }}>
                  </View>

                  <Switch
                     value={this.state.switchValue}
                     onValueChange={(switchValue) => this.setState({ switchValue })}
                     style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }], marginRight: 20 }}
                  />
               </View>


               <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                  <Text style={styles.dateText}>Date</Text>
                  <View style={styles.datePickers}>
                     <DatePicker
                        style={{ width: '100%' }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select"

                        format="DD-MM-YYYY"
                        minDate="1990-01-01"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                           dateIcon: {
                              position: 'absolute',
                              right: 5,
                              top: 4,


                           },
                           dateInput: {
                              // marginLeft: 30,
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              height: 45,
                              borderRadius: 25,
                              // paddingRight: 163
                              paddingLeft: 5,
                              alignItems: 'flex-start',

                           },
                           dateText: {
                              justifyContent: 'center',

                              fontSize: 14,
                              color: 'white',
                              //paddingLeft:20
                           },
                           placeholderText: {
                              fontSize: 16,
                              color: "#ffffff",
                              paddingLeft: 10

                           },
                           // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { this.setState({ date }) }}
                     />
                  </View>
               </View>
               <Text style={styles.message}>{this.state.msg}</Text>
               <TouchableOpacity onPress={this.clickme} style={styles.submitButton}>
                  <Text style={{ textAlign: 'center', fontSize: 17, color: '#ffffff' }}>
                     Submit</Text>
               </TouchableOpacity>
            </ScrollView>
         </View>
      )
   }
};


const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#455a64'
   },
   message: {
      fontSize: 20,
      marginLeft: 120,
      color: 'yellow',
      marginTop: 10
   },
   safeAreaStyle: {
      alignItems: 'center',
      backgroundColor: '#455a64',
      justifyContent:'center'
   },
   headerTitle: {
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: 16,
      backgroundColor: '#1c313a',
      paddingHorizontal: 130,
      height: 40,
      width: '100%',
      paddingTop:10
   },
   categoryArrangmt: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
   },
   categoryText: {
      // flex:1,
      fontSize: 17,
      paddingHorizontal: 10,
      color: '#ffffff',
      marginTop: 12,
      marginRight: 15
   },
   pickerBorder: {
      // borderWidth: 0.2,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 25,
      marginRight: 26
   },
   pickerItem: {

      width: 230,
      height: 45,
      color: '#ffffff',
      marginRight: 10
   },
   TittleText: {
      fontSize: 17,
      color: '#ffffff',
      paddingHorizontal: -3,
      marginTop: 8
   },
   amountText: {
      fontSize: 17,
      color: '#ffffff',
      paddingHorizontal: 7,
      marginTop: 8
   },
   tittleBox: {
      marginLeft: 50,
      width: "74%",
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 25,
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      color: '#ffffff'
   },
   amountBox: {
      marginRight: 13,
      width: '69%',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 25,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      color: '#ffffff'
   },
   extraexpensionText: {
      fontSize: 17,
      color: '#ffffff',
      paddingHorizontal: 9,
      marginTop: 8
   },
   extraExpensionView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15
   },
   toggleButton: {
      height: 39,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.5)',
      width: '25%',
      borderRadius: 25,
      marginRight: 15,
   },
   dateText: {
      fontSize: 17,
      color: '#ffffff',
      paddingHorizontal: 11,
      marginTop: 8
   },
   datePickers: {
      alignItems: 'flex-start',
      width: '66%',
      marginRight: 18,
   },
   submitButton: {
      marginTop: 45,
      backgroundColor: '#1c313a',
      height: 45,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      marginHorizontal: 40
   }

});