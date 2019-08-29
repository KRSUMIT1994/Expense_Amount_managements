import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Picker,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Switch ,

} from "react-native";
import { Tooltip ,} from 'react-native-elements';
import DatePicker from "react-native-datepicker";
import { Actions } from "react-native-router-flux";

export default class ViewMyExpension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryValue: "",
      switchValue: false ,
      from_date_value: "",
      to_date_value: "",
      selected_month_list: "",
      Userid: '',
      pvalue:true,
      to_date_disabled:false

    };
  }
  updateUser = categoryValue => {
    this.setState({ categoryValue: categoryValue });
    // alert(user);
    // this.setState({to_date_disabled:true})
  
  };
  state = { selected_month_list: "" };
  updateUser1 = selected_month_list => {
    this.setState({ selected_month_list: selected_month_list });
   if(selected_month_list==''){
    this.setState({to_date_disabled:false});
   }else{
    this.setState({to_date_disabled:true});
   }
  };
  state = { selectuserVlaue: "" };
  updateValue = selectuserVlaue => {
    this.setState({ selectuserVlaue: selectuserVlaue });
    //  this.setState({date_value_Disabble:false});
  };
    state = { selectuserVlaue1: "" };
    updateValue = selectuserVlaue1 => {
    this.setState({ selectuserVlaue1: selectuserVlaue1 });
   // this.setState({date_value_Disabble:false});
  };
  componentDidMount() {
    AsyncStorage.getItem("Userid").then((value) => {
      this.setState({ "Userid": value })
    }).done();
  }
  clickme = () => {
    const{from_date_value,to_date_value,selected_month_list,switchValue,categoryValue}=this.state;
    // var categoryValue = this.state.categoryValue;
    // var data1 = this.state.selectuserVlaue1;
    // var categoryValue = this.state.selectuserVlaue;

    if(categoryValue==''){
      this.setState({msg:'please select category'});
    }
    else if(from_date_value=="" &&to_date_value==""&& selected_month_list==""){
      this.setState({msg:"please select date duration"});
    }
   else if (categoryValue == "" && selected_month_list == "") {
      alert("Please Select a option");
    } 
    
    else {
      fetch("http://192.168.1.18/account_management/list_expanses.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category: categoryValue,
          extra_expanse: switchValue,
          from_date: from_date_value,
          to_date: to_date_value,
          days_count: selected_month_list,
          user_id: this.state.Userid,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          // alert(JSON.stringify(responseJson))
          if(responseJson.message!=''){
            alert(responseJson.message);
          }else{
          Actions.detailOfExpense({ expenseData: responseJson.row });
        }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  _onpress() {
    const newState = !this.state.ExtraExpense_View;
    if (newState == true) {
      var extra_expense_yes = 1;
      this.setState({ ExtraExpense_View: extra_expense_yes });
    } else if (newState == false) {
      var extra_expense_no = 0;
      this.setState({ ExtraExpense_View: extra_expense_no });
    }
    this.setState({ ExtraExpense_View: newState });
  }
  render() {
    const { ExtraExpense_View } = this.state;

    const textValue = ExtraExpense_View ? "No" : "Yes";
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeAreaStyle}>
          <Text style={styles.headerTitle}>View Expense</Text>
        </SafeAreaView>
        <ScrollView>
          <View style={styles.categoryArrangmt}>
            <Text style={styles.categoryText}>Category</Text>
            <View style={styles.pickerBorder}>
              <Picker
                style={styles.pickerItem}
                selectedValue={this.state.categoryValue}
                onValueChange={this.updateUser}
                textStyle={{fontFamily: "sans-serif-light",color:'yellow'}}
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
          <View style={styles.extraExpensionView}>
            <Text style={styles.extraexpensionText}>Extra Expense</Text>
            <Switch  
                    value={this.state.switchValue}  
                    onValueChange ={(switchValue)=>this.setState({switchValue})}
                    style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],marginRight:20 }}
                    />  
               
          </View>
          <View style={{ flexDirection: "row", marginTop: 22 }}>
            <Text style={styles.fromDateTaxt}> From </Text>
            <View style={styles.datePickers}>
              <DatePicker
                style={{ width: "90%" }}
                date={this.state.from_date_value}
                disabled={this.state.to_date_disabled}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2000-01-01"
                maxDate="2030-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    right: 5,
                    top: 4
                  },
                  dateInput: {
                    backgroundColor: "rgba(255,255,255,0.2)",
                    height: 45,
                    borderRadius: 25,
                    paddingLeft: 5,
                    alignItems: "flex-start"
                  },
                  dateText: {
                    justifyContent: "center",

                    fontSize: 14,
                    color: "white"
                  },
                  placeholderText: {
                    fontSize: 16,
                    color: "#ffffff",
                    paddingLeft: 10,
                    fontFamily: "sans-serif-light",
                  }
                }}
                onDateChange={from_date_value => {
                  this.setState({ from_date_value: from_date_value });
                  this.setState({pvalue:false});
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 22 }}>
            <Text style={styles.fromDateTaxt}> To </Text>
            <View
              style={{ alignItems: "flex-start", width: "75%", marginLeft: 66 }}
            >  
              <DatePicker
                style={{ width: "90%" }}
                date={this.state.to_date_value}
                disabled={this.state.to_date_disabled}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2000-01-01"
                maxDate={new Date()}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    right: 5,
                    top: 4
                  },
                  dateInput: {
                    // marginLeft: 30,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    height: 45,
                    borderRadius: 25,
                    // paddingRight: 163
                    paddingLeft: 5,
                    alignItems: "flex-start"
                  },
                  dateText: {
                    justifyContent: "center",

                    fontSize: 14,
                    color: "white"
                    //paddingLeft:20
                  },
                  placeholderText: {
                    fontSize: 16,
                    color: "#ffffff",
                    paddingLeft: 10,
                    fontFamily: "sans-serif-light",
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={to_date_value => {
                  this.setState({ to_date_value: to_date_value });
                  this.setState({pvalue:false});
                 
                }}
              />
            </View>
          </View>

          <View style={styles.categoryArrangmt}>
            <Text style={styles.categoryText}>Select</Text>
            <View style={styles.pickerBorderDurationMonth}>
          
              <Picker
                style={styles.pickerItemDurationMonth}
                textStyle={{fontFamily: "sans-serif-light",color:'yellow'}}
                selectedValue={this.state.selected_month_list}
                onValueChange={this.updateUser1}
                enabled={this.state.pvalue} >
                <Picker.Item label="Select Duration" value="" />
                <Picker.Item label="1 week" value="7" />
                <Picker.Item label="3 Week" value="21" />
                <Picker.Item label="1 Month" value="30" />
                <Picker.Item label="3 Month" value="91" />
                <Picker.Item label="6 Month" value="180" />
                <Picker.Item label="1 Year" value="365" />
                <Picker.Item label="2 Year" value="730" />
                <Picker.Item label="3 Year" value="1095" />
                <Picker.Item label="4 Year" value="1460" />
                <Picker.Item label="5 Year" value="1820" />
              
            </Picker> 
            </View>
          </View>
          <Text style={{color:"red" ,paddingLeft:200,fontSize:15, fontFamily: "sans-serif-light",}}>Hint:"YYYY-MM-DD"</Text>
          <Text style={styles.message}>{this.state.msg}</Text>
          <TouchableOpacity onPress={this.clickme} style={styles.submitButton}>
            <Text
              style={{ textAlign: "center", fontSize: 17, color: "#ffffff", fontFamily: "sans-serif-light", }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#455a64"
  },
  message:{
    fontSize:20,
    marginLeft:90,
    color:'yellow',
   marginTop:10   ,
   fontFamily: "sans-serif-light",
   },
  safeAreaStyle: {
    alignItems: "center",
    backgroundColor: "#455a64",
    fontFamily: "sans-serif-light",
  },
  headerTitle: {
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: 16,
    backgroundColor: "#1c313a",
    paddingHorizontal: 120,
    height: 40,
    width: "100%",
    fontFamily: "sans-serif-light",
  },
  categoryArrangmt: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    fontFamily: "sans-serif-light",
  },
  categoryText: {
    fontSize: 17,
    paddingHorizontal: 10,
    color: "#ffffff",
    marginTop: 12,
    marginRight: 15,
    fontFamily: "sans-serif-light",
  },
  pickerBorder: {
    borderWidth: 0.2,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    marginRight: 26,
    width: "68%",
    marginRight: 30,
    fontFamily: "sans-serif-light",
  },
  pickerItem: {
    width: "100%",
    height: 45,
    color: "#ffffff",
    fontFamily: "sans-serif-light",
  },
  extraexpensionText: {
    fontSize: 17,
    color: "#ffffff",
    paddingHorizontal: 9,
    marginTop: 8,
    fontFamily: "sans-serif-light",
  },
  extraExpensionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    fontFamily: "sans-serif-light",
  },
  toggleButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
    width: "30%",
    borderRadius: 25,
    marginRight: 16,
    fontFamily: "sans-serif-light",
  },
  submitButton: {
    marginTop: 45,
    backgroundColor: "#1c313a",
    height: 45,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 30,
    fontFamily: "sans-serif-light",
  },
  fromDateTaxt: {
    color: "#ffffff",
    fontSize: 17,
    marginTop: 10,
    marginLeft: 7,
    fontFamily: "sans-serif-light",
  },
  pickerItemDurationMonth: {
    width: "100%",
    height: 45,
    color: "#ffffff",
    fontFamily: "sans-serif-light",
  },
  pickerBorderDurationMonth: {
    borderWidth: 0.2,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 25,
    marginRight: 26,
    width: "68%",
    marginRight: 15,
    fontFamily: "sans-serif-light",
  },
  datePickers: {
    alignItems: "flex-start",
    width: "75%",
    marginLeft: 48,
    fontFamily: "sans-serif-light",

  }
});
