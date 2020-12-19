import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  FlatList,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Constants from 'expo-constants';

 class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.removeitem = this.removeitem.bind(this);
    this.state = {
      input1: '',
      input2: '',
      amount_saved: '',
      disc_amount: '',
      history: [],
      modalview: false,
    };
  }

  input1handle = (value) => {
    if (parseFloat(value) >= 0 || parseFloat(value) <= 9) {
      this.setState({ input1: value });
    }
  };

  input2handle = (value) => {
    if (parseFloat(value) > 0 || parseFloat(value) <= 9) {
      this.setState({ input2: value });
    }
  };

  calculation() {
    const ogprice = this.state.input1;
    const discprice = this.state.input2;
    if (discprice <= 100 && ogprice >= 0) {
      this.setState({ amount_saved: (ogprice * discprice) / 100 });
      this.setState({ disc_amount: ogprice - (ogprice * discprice) / 100 });
    }
  }

  saving() {
    var dash = ' | ';
    var result =
      'Rs: ' +
      this.state.input1 +
      dash +
      this.state.input2 +
      '% ' +
      dash +
      'Rs: ' +
      this.state.disc_amount;

    this.setState({ history: [...this.state.history,{key:Math.random.toString(), data:result}]});

    this.setState({ input1: '' });
    this.setState({ input2: '' });
  }


removeitem=(key)=>{
const newlist = this.state.history.filter(item => item.key != key)
this.setState({history: newlist})
}


  render() {
    return (
      <View style={styles.container}>
      <Text style={{ 
   font: "Trebuchet MS",
   fontSize: 32.5,
   fontWeight:"bold",
   letterSpacing: 4,
   padding:5,
   marginTop:-15,
   marginBottom:12,
   color: "red",
   borderbottom: 2 ,
   textTransform: "uppercase"
   
   }}>DISCOUNT APP</Text>
        <View style={styles.input}>
          <TextInput
            keyboardType={'number-pad'}
            placeholder={'Original Price'}
            value={this.state.input1}
            onChangeText={this.input1handle}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            keyboardType={'number-pad'}
            placeholder={'Discount'}
            value={this.state.input2}
            onChangeText={this.input2handle}
          />
        </View>
        <View style={{ flexDirection: 'row', marginLeft: -3 }}>
          <TouchableOpacity
            onPress={() => this.calculation()}
            style={styles.calculate}>
            <Text style={{ fontSize: 18, color: 'white' }}>COMPUTE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.saving()} style={styles.save}>
            <Text style={{ fontSize: 18, color: 'white' }}>SAVE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.results}>
          <Text style={{ padding: 5, color: 'grey', fontSize: 15 }}>
            FINAL AMOUNT: {this.state.disc_amount}
          </Text>
          <Text style={{ padding: 5, color: 'grey', fontSize: 15 }}>
            AMOUNT SAVED: {this.state.amount_saved}
          </Text>
        </View>

        <View style={{ padding: 10 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('History', {input1: this.state.input1,
      input2: this.state.input2,
      amount_saved: this.state.amount_saved,
      disc_amount: this.state.disc_amount,
      history: this.state.history,
      removed:this.removeitem}
      )}
            style={styles.history}>
            <Text style={{ fontSize: 18, color: 'white' }}>HISTORY</Text>
          </TouchableOpacity>
        </View>

      </View>

    );
  }
}



 class HistoryScreen extends React.Component {
constructor(props) {
    super(props);
    this.state = {
    modalview:true
    }
}

  render() {
   
    return (

   <View>
<Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalview}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View>
            <View style={styles.mdisplay}>
              <Text style={styles.mhead}>Discount History</Text>
              <Text style={{ fontSize: 18 }}>
                Original Price | Discount% | Final Price
              </Text>

                <ScrollView>
                  
                  {this.props.route.params.history.map((item) => (
                    <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={styles.scrollstyle}>
                    <Text
                      >
                      {item.data}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                  onPress={()=>this.props.route.params.removed(this.props.route.params.history.key)}>
                  <Text style={{
                        fontSize: 25,
                        width:"45%",
                        color: 'red',
                        backgroundColor:"black",
                        borderRadius:"25%"
                        
                  }}> x </Text>
                  </TouchableOpacity>
                  
                  </View>
                  
                  ))}

                </ScrollView>

            <View>
              <TouchableOpacity
                style={styles.closebtn}
                onPress={() => {
                  this.setState({ modalview: false });
                }}>
                <Text
                  style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>

            </View>
          </View>
        </Modal>
</View>
 
    );
    }
 }


const Stack = createStackNavigator();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
   };
  }
render() {
    return (

    <NavigationContainer>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="Home" component={StartScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>


    );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:"center"
  },

scrollstyle:{
borderRadius:"15%",
padding:"10%",

},


  input: {
    height: 45,
    width: 270,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    marginTop:4,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 10,
  },

  calculate: {
    height: 50,
    width: 120,
    backgroundColor: '#FA8072',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 2,
    marginLeft: 10,
  },

  save: {
    height: 50,
    width: 120,
    backgroundColor: '#00FA9A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },

  history: {
    height: 50,
    width: 130,
    backgroundColor: '#708090',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  results: {
    padding: '3%',
    backgroundColor: '#AFEEEE',
    display: 'flex',
    width: '80%',
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    marginTop: '5%',
  },

  mdisplay: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    height: '95%',
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    width: 350,
  },

  mhead: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 10,
  },

  closebtn: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    width: 70,
    height: 40,
    marginTop:-100,
    textAlign: 'center',
    justifyContent: 'center',
  }
});
