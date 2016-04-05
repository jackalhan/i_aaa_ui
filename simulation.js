var React = require('react-native');
var dimensions = require('Dimensions');


var {
  ToastAndroid,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Switch,
  TouchableHighlight,
  Alert
} = React;

//UNCOMMENT FOR LOCAL SERVER
//var SERVER_URI = 'http://192.168.56.1:8080';

//UNCOMMENT FOR PROD SERVER AT UALR
var SERVER_URI = 'http://bvm-u1-p.host.ualr.edu:8080';

var I_AAA_SERVICE_LINK = SERVER_URI + '/anyAccidentOverHere?lat=#lat#&lon=#lon#&speedOfVehicle=#speed#';
var simulation = React.createClass({


  //watchID: (null: ?number),
  constructor(super) {
    super(props);
    this.state = {
      position : {
          coords:{}
      }
    };
  }

  getInitialState: function() {
    return {
      isAutoProcess : true,
      executeBackgroundProcess:false,
      inputDefaultValue: 'Please enter a value',
      longitude : 'Please enter a value',
      latitude : 'Please enter a value',
      speed:'Please enter a value',
      initialPosition: '',
      lastPosition: '',
      initialPositionLat:'',
      initialPositionLon:'',
      lastPositionLat:'',
      lastPositionLon:'',
      propTypes: {
      onGetCoords: React.PropTypes.func.isRequired
      },
      annotations:[{}]
    };
  },

  componentDidMount: function() {
      // navigator.geolocation.getCurrentPosition(
      //   (initialPosition) => {
      //     //var initialPosition = JSON.stringify(position);
      //     //this.setState({initialPosition});
      //     this.props.onGetCoords(initialPosition.coords.latitude, initialPosition.coords.longitude);
      //   },
      //
      //   (error) => Alert.alert(error + error.message),
      //   //{distanceFilter:1000,timeout: 20000, maximumAge: 1000}
      //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      // );
      // this.watchID = navigator.geolocation.watchPosition((position) => {
      //   var lastPosition = JSON.stringify(position);
      //   this.setState({lastPosition});
      // });

//       navigator.geolocation.getCurrentPosition(
//   (initialPosition) => {
//     this.props.onGetCoords(initialPosition.coords.latitude,
//       initialPosition.coords.longitude);
//   },
//   (error) => {alert(error.message)},
//   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
// );
      navigator.geolocation.getCurrentPosition(
  (position) => this.setState({position}),
  (error) => alert(error.message),
  {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
);
navigator.geolocation.watchPosition((position) => { this.setState({position}) });

    },



  //   componentWillUnmount: function() {
  // navigator.geolocation.clearWatch(this.watchID);
  // },

  _onPressExecuteBackgroundProcess:function(){
    if (this.state.executeBackgroundProcess === true)
    {
      this.setState({executeBackgroundProcess: false});
    }
    else {
      this.setState({executeBackgroundProcess: true});
    }
  },

  _onPressQueryAccident:function(){
    //Alert.alert(this.state.longitude.replace('2', 'TTTTT') + '---- ' + this.state.latitude + '------' + this.state.speed);
    var I_AAA_REPLACE_URI = I_AAA_SERVICE_LINK.replace('#lat#',this.state.latitude).replace('#lon#',this.state.longitude).replace('#speed#', this.state.speed);
    Alert.alert(I_AAA_REPLACE_URI);
    console.log("I_AAA API is calling via " + I_AAA_REPLACE_URI);
    fetch(I_AAA_REPLACE_URI).
    then((response) => response.json()).
    then((responseJSON) => {
      console.log(responseJSON);
      console.log(responseJSON.text);
      Alert.alert(responseJSON.text);
        //ToastAndroid.show(responseJSON.id + ' ' + responseJSON.text, ToastAndroid.SHORT);
      this.setState({
        longitude : 'Please enter a value',
        latitude : 'Please enter a value',
        speed:'Please enter a value'
      });
    }
  )
  .catch((error) => {
    console.warn(error);
  });
},
clearTextLon:function(){
  this._textInputLon.setNativeProps({text:''});
},

clearTextLat:function(){
  this._textInputLat.setNativeProps({text:''});
},

clearTextSpeed:function(){
  this._textInputSpeed.setNativeProps({text:''});
},

render: function() {
  var buttonTextForBackgroundProcess = null;
  var contentManualProcess, contentAutoProcess = null;
  var contentBackgroundProcessInitialLabel,contentBackgroundProcessInitialValue = null;
  var contentBackgroundProcessLastLabel,contentBackgroundProcessLastValue = null;
  if (this.state.executeBackgroundProcess === false)
  {
    buttonTextForBackgroundProcess = 'Start Background Process';
    contentBackgroundProcessInitialLabel,contentBackgroundProcessInitialValue = null;
    contentBackgroundProcessLastLabel,contentBackgroundProcessLastValue = null;
  }
  //
  if (this.state.executeBackgroundProcess === true)
  {
    buttonTextForBackgroundProcess = 'Stop Background Process';
    Alert.alert(this.state.initialPosition);
    if (this.state.initialPosition !== '')
    {
      contentBackgroundProcessInitialLabel = 'Initial position (Lat, Lon)';
      contentBackgroundProcessInitialValue =  this.state.position.coords.latitude + ',' this.state.position.coords.longitude; //this.state.initialPosition ;// + ',' + initialPosition.coords.longitude;
      Alert.alert(contentBackgroundProcessInitialValue.coords);
    }
    if (this.state.lastPosition !== '')
    {
      contentBackgroundProcessLastLabel = 'Last position (Lat, Lon)';
      contentBackgroundProcessLastValue = this.state.lastPosition; //coords.latitude + ',' + lastPosition.coords.longitude;
      Alert.alert(this.props.onGetCoords);
    }

  }

  if (this.state.isAutoProcess === true)
  {
    contentManualProcess = null;
    ToastAndroid.show('It will be executing via background process ! ', ToastAndroid.SHORT)
    contentAutoProcess =
    <View style={styles.view_form}>
      <Text style={styles.text_general}>
        Longitude
      </Text>
      <TextInput
        ref={component=> this._textInputLon=component}
        style={styles.input_general}
        keyboardType='numeric'
        defaultValue={this.state.inputDefaultValue}
        onFocus = {this.clearTextLon}
        onChangeText={(longitude) => this.setState({longitude})}
        value={this.state.longitude}
        />

      <View style={styles.view_brform}/>
      <View style={styles.view_brform}/>


      <Text style={styles.text_general}>
        Latitude
      </Text>
      <View style={styles.view_brform}/>
      <TextInput
        ref={component=> this._textInputLat=component}
        style={styles.input_general}
        keyboardType='numeric'
        defaultValue={this.state.inputDefaultValue}
        onFocus = {this.clearTextLat}
        onChangeText={(latitude) => this.setState({latitude})}
        value={this.state.latitude}/>

      <View style={styles.view_brform}/>
      <View style={styles.view_brform}/>

      <Text style={styles.text_general}>
        Vehicle Speed (mile)
      </Text>
      <View style={styles.view_brform}/>
      <TextInput
        ref={component=> this._textInputSpeed=component}
        style={styles.input_general}
        keyboardType='numeric'
        defaultValue={this.state.inputDefaultValue}
        onFocus = {this.clearTextSpeed}
        onChangeText={(speed) => this.setState({speed})}
        value={this.state.speed}/>

      <View style={styles.view_brform}/>
      <View style={styles.view_brform}/>
      <View style={styles.view_brform}/>
      <View>
        <TouchableHighlight
          style={styles.button_general}
          onPress={this._onPressQueryAccident}>
          <View style={styles.button}>
            <Text style={styles.button_text_general}>
              Query Accident
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
    ;

  }
  if (this.state.isAutoProcess === false) {
    contentAutoProcess = null;
    ToastAndroid.show('It will be executing via simulation form ! ', ToastAndroid.SHORT);
    contentManualProcess =
    <View style={styles.view_form}>
      <TouchableHighlight
        style={styles.button_general}
        onPress={this._onPressExecuteBackgroundProcess}>
        <View style={styles.button}>
          <Text style={styles.button_text_general}>
            {buttonTextForBackgroundProcess}
          </Text>
        </View>
      </TouchableHighlight>
    </View>
    ;
  }
  return (
    <View style={styles.view_mainscreen}>

      <Image
        style={styles.image_banner}
        onLoadStart={(e) => this.setState({loading: true})}
        source={{uri:'https://raw.githubusercontent.com/jackalhan/i_aaa_ui/master/image/banner.jpg'}}
        onProgress={(e) => this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)})}
        onLoad={() => this.setState({loading: false, error: false})} />
      <View style={styles.view_form}>
        <View style={styles.view_subform_setting}>
          <Text style={styles.text_general}>
            Auto Process
          </Text>
          <Switch
            onValueChange={(value) => this.setState({isAutoProcess: value})}
            style={styles.switch_general}
            value={this.state.isAutoProcess}
            />
          <Text style={styles.text_general}>
            Manual Process
          </Text>
        </View>
        {contentManualProcess}
        <View style={styles.view_brform}/>
        <View style={styles.view_brform}/>
        <View style={styles.view_brform}/>
        {contentAutoProcess}
        <View style={styles.view_form}>
        <Text style={styles.text_general}>{contentBackgroundProcessInitialLabel}</Text>
        <Text style={styles.text_general_custom}>{contentBackgroundProcessInitialValue}</Text>
        <View style={styles.view_form}></View>
        <Text style={styles.text_general}>{contentBackgroundProcessLastLabel}</Text>
        <Text style={styles.text_general_custom}>{contentBackgroundProcessLastValue}</Text>
        </View>
      </View>
    </View>
  );
}
});

var baseFontSize = 15;
var windowSize = dimensions.get('window');
var styles = StyleSheet.create({

  //*****************
  //----------VIEWS
  //*****************
  view_mainscreen: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#343e4b'
  },
  view_form: {
    flex:5,
    borderColor: '#343e4b',
    alignItems:'center',


  },
  view_subform_setting:{
    flex:1,
    flexDirection:'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    paddingTop: 50
  },
  view_brform:{
    paddingTop:5
  },




  //*****************
  //----------IMAGES
  //*****************
  image_banner: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems:'stretch'
  },





  //*****************
  //----------SWITCH
  //*****************

  switch_general:{
    width:50,
    flex:2,
    marginLeft : 10

  },




  //*****************
  //-------------TEXT
  //*****************
  text_general:{
    color: '#eeeff0',
    fontSize: baseFontSize
  },
  text_general_custom:{
    color: '#f0b431',
    fontSize: baseFontSize
  },




  //*****************
  //----------BUTTON
  //*****************
  button_general:{
    borderRadius:10,
    backgroundColor:'#f0b431',
    height:25,
    width:180,
  },
  button_text_general:{
    color: '#343e4b',
    fontSize: baseFontSize -2,
    fontWeight:'bold',
    textAlign:'center',
  },




  //*****************
  //----------INPUT
  //*****************
  input_general: {
    borderRadius:10,
    backgroundColor:'white',
    //height:20,
    width:120,
    color:'#343e4b',
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: baseFontSize - 5,
    fontWeight:'bold',
    textAlignVertical:'center',
  },
});

module.exports = simulation;
