import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Row } from 'native-base';
import { Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
export default class DetailOfExpension extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    //this.formEdit = this.formEdit.bind(this);
    // alert(JSON.stringify(props.expenseData));
  }


  _renderItem({ item }) {

    return (
      
        <View style={styles.edit_View_Alignment}>
          <View style={styles.border_color}>
            <Text style={styles.Category_item }>Category : </Text>
            <Text style={ styles.Category_item}>Title : </Text>
            <Text style={styles.Category_item}>Amount : </Text>
            <Text style={styles.Category_item}>Date : </Text>
            <Text style={styles.Category_item}>Extra Expanse : </Text>
          </View>
          <View style={styles.border_color}>
            <Text style={styles.Get_item_data}>{item.category}</Text>
            <Text style={styles.Get_item_data}>{item.title}</Text>
            <Text style={styles.Get_item_data}>₹ {item.amount}</Text>
            <Text style={styles.Get_item_data}>{item.date}</Text>
            <Text style={styles.Get_item_data}> {item.extra_expanse == 0 ? 'No':'Yes'}</Text>
          </View>
          <View style={{
            position: 'relative',
            top: 35,
            left: 85,
            right: 35,
            bottom: 35,
            marginRight: 10,
          }}>
            <TouchableOpacity onPress={() => Actions.editViewForm({ detail_edit:item })}>
              <Icon size={24} color="#808080" name="edit" />
            </TouchableOpacity>

          </View>
        </View>
    
    )
  }
  render() {
    return (


      <View style={styles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <SafeAreaView style={styles.safeAreaStyle}>
            <Text style={styles.headerTitle}>Details of Expense</Text>
          </SafeAreaView>
          <View style={{ flexDirection: 'row' }}>

            <ScrollView>
              <FlatList
                data={this.props.expenseData}
                renderItem={this._renderItem}
              />

            </ScrollView>
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#2F4F4F'

  },
  safeAreaStyle: {
    alignItems: 'center',
    backgroundColor: '#455a64',

  },
  editButtons: {
    position: 'relative',
    top: 25,
    left: 90,
    right: 0,
    bottom: 0,
    marginRight: 10
  },
  edit_View_Alignment: {
    flexDirection: 'row',
    borderColor: '#696969',
    marginTop: 15,
    marginLeft:15,
    marginRight:15,
    // borderBottomWidth:2,
    borderBottomWidth: 0.8,
    borderTopWidth: 0.8,
    backgroundColor: "#ffffff"
    // flex:1,
    // justifyContent: 'space-between',
    // marginTop: 15,
    // marginLeft: 10
  },
  headerTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 16,
    backgroundColor: '#1c313a',
    paddingHorizontal: 120,
    height: 40,
    width: '100%',
    paddingTop: 8

  },
  Category_item:{
    fontSize: 15,
     fontFamily: "sans-serif-light",
      color: '#696969', 
      paddingLeft: 20
  },
  Get_item_data:{
    fontSize: 15, 
    fontFamily: "sans-serif-light",
     color: '#808080',
      paddingLeft: 8
  },
  border_color: {
    paddingBottom: 5
  }
});