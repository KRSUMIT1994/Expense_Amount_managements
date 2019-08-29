import React, { Component } from 'react';
import {
    Text,
    View, 
    FlatList, 
    TouchableOpacity,
    Image, 
    SafeAreaView,
    ActivityIndicator, AsyncStorage
} from 'react-native';
import ic_menu from '../logos/list.png'
import Drawer from 'react-native-drawer'

import { Actions } from 'react-native-router-flux';
import { ScrollView } from 'react-native-gesture-handler';
console.disableYellowBox = true;

const menu = [
    { 'key': 'addmyexpenses', 'title': 'Add  Expense' },
    { 'key': 'viewmyexpenses', 'title': 'View Expense' },
//{ 'key': 'aboutus', 'title': 'About Us' },
    // {'key':'shareit','title':'Share'},
    { 'key': 'login', 'title': 'Log out' },

]

export default class HomeScreen extends Component {

    homeManagement = (key) => {
        switch (key) {
            case 'addmyexpenses':
                Actions.addmyexpenses();
                break;
            case 'viewmyexpenses':
                Actions.viewmyexpenses();
                break;
            case 'login':
              
               AsyncStorage.clear( Actions.login({ type: "reset"}),

               alert("Log Out Successfully")); 
        }}  

 
    constructor(props) {
        
        super(props);
        this.state={
            Userid:'',
            expenseData: [],
            email:'',
            password:'',
            // isLoading:true
        }
        
    }


    componentDidMount() {
        AsyncStorage.getItem("Userid").then((value) => {
           this.setState({ "Userid":value}
           ,
           ()=>{this.getExpenseDate()
           })
          
}
).done();
     }
     

     getExpenseDate = () => {
        fetch('http://192.168.1.18/account_management/show_expanses_on_dashboard.php', {
            method: 'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
             }, body: JSON.stringify({
              user_id: this.state.Userid,
              password:this.state.password,
              email:this.state.email
             })
          }).then((response) => response.json())
             .then((responseJson) => {
                //(JSON.stringify(responseJson));
                this.setState({ expenseData: responseJson})
              //  Actions.homepage({ type: "reset" });
             }).catch((error) => {
                console.error(error);
             });
           
     }
        
    renderDrawer() {
        //SlideMenu
        return (
            
            <View style={styles.menuContainer}>
                <FlatList
                    style={{ flex: 1.0 }}
                    data={menu}
                    extraData={this.state}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.menuTitleContainer}
                                onPress={() => this.homeManagement(item.key)}
                            >
                                <Text style={styles.menuTitle}
                                    key={index}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        )
                    }} />

            </View>
        )
    }
   
    openDrawer() {
        this.drawer.open()
     
    }

    closeDrawer() {
        this.drawer.close()
    }
  
  
    render() {
        // if (this.state.isLoading) {
        //     return(
        //       <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        //         <ActivityIndicator size="large"  />
        //       </View>
        //     )
        //   }
        return (
        

            <SafeAreaView style={styles.safeAreaStyle}>
                <View style={styles.mainContainer}>
                    <Drawer
                        ref={(ref) => this.drawer = ref}
                        content={this.renderDrawer()}
                        type='static'
                        tapToClose={true}
                        openDrawerOffset={0.50}
                        panCloseMask={0.2}
                        negotiatePan={true}
                        styles={drawerStyles}>
                        {/* //Main View */}
                        <View style={styles.headerContainer}>
                            <View style={styles.menuButton}>
                                <TouchableOpacity
                                    onPress={this.openDrawer.bind(this)}>
                                    <Image style={{ tintColor: 'white' }} source={ic_menu} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.headerTitle}>Dashboard</Text>
                            <View style={styles.menuButton} />
                        </View>
                        <ScrollView>
                        <Text style={styles.expense_report_Text}>Your Expense Report</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.total_expense_View}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 60
                                }}>
                                    <Text style={styles.expense_text}>
                                        1 Week Expense
                                    </Text>
                                    <Text style={styles.total_amount_text
                                    }>{`₹ ${this.state.expenseData.one_week_expanse}`}</Text>
                                </View>
                            </View>
                            <View style={styles.total_expense_View}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 60
                                }}>
                                    <Text style={styles.expense_text}>
                                        15 Days Expense</Text>
                                    <Text style={styles.total_amount_text
                                    }>{`₹ ${this.state.expenseData.fifteen_days_expanse}`}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.total_expense_View}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 60
                                }}>
                                    <Text style={styles.expense_text}>
                                        1 Month Expense:
                                    </Text>
                                    <Text style={styles.total_amount_text
                                    }>{`₹ ${this.state.expenseData.one_month_expanse}`}</Text>
                                </View>
                            </View>
                            <View style={styles.total_expense_View}>
                            <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 60
                                }}>
                                    <Text style={styles.expense_text}>
                                        6 Month  Expense:
                                    </Text>
                                    <Text style={styles.total_amount_text
                                    }>{`₹ ${this.state.expenseData.six_month_expanse}`}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.total_expense_View}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 60
                                }}>
                                    <Text style={styles.expense_text}>
                                       1 
                                       year Expense:
                                    </Text>
                                    <Text style={styles.total_amount_text
                                    }>{`₹ ${this.state.expenseData.yearly_expanse}`}</Text>
                                </View>
                            </View>
                           
                        </View>
                       
                       
                        </ScrollView>
                    </Drawer>
                </View>

            </SafeAreaView>
        );
    }
}

const drawerStyles = {


    drawer: {
        flex: 1.0,
        backgroundColor: '#455a64',
    },
    main: {
        flex: 1.0,
        backgroundColor: '#455a64',
    }
}


const styles = {
    Text,
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
    
      },
    mainContainer: {
        Text,
        flex: 1.0, Text,
        backgroundColor: '#455a64', Text,
    },
    safeAreaStyle: {
        flex: 1.0,
        backgroundColor: '#455a64',

    },
    headerContainer: {
        height: 44,
        flexDirection: 'row',
        justifyContect: 'center',
        backgroundColor: '#1c313a',

    },
    headerTitle: {
        flex: 1.0,
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 16
    },
    menuButton: {
        marginLeft: 8,
        marginRight: 8,
        alignSelf: 'center',
        tintColor: 'white'
    },
    menuContainer: {
        flex: 1.0,
        backgroundColor: '#1c313a',
        paddingVertical: 25
    },
    menuTitleContainer: {
        alignItem: 'center',
        height: 60,
        width: '100%',
        flexDirection: 'row',

    },
    menuTitle: {
        width: '100%',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        alignSelf: 'center',


    },
    total_expense_View: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: '90%',
        width: '45%',
        marginTop:10,
        justifyContect: 'center',
        // borderRadius: 200,
        marginLeft: 10, marginRight: 10
    },
    total_expense_View1: {
        backgroundColor: '#4000ff',
        height: '25%',
        width: '45%',
        marginTop:10,
        justifyContect: 'center',
        borderRadius: 200,
        marginLeft: 10, marginRight: 10
    },
    expense_text:{
        fontSize: 15,
        color:'#ffffff' ,
        fontFamily: "sans-serif-light",
    },
    total_amount_text:{
        fontSize: 17,
        color:'#ffffff' ,
        fontFamily: "sans-serif-light",
    },
    expense_report_Text:{
        color:'#fff',
        fontSize:20,
        paddingLeft:90,
        fontFamily: "sans-serif-light",
    }
}