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
  TouchableHighlight
} = React;



var simulation = React.createClass({
  getInitialState: function() {
    return {
      switchIsOn : false,
      pressing:false,
      toggled: false

    };
  },
//   _onPressIn: function() {
//
// this.setState({pressing: true});
//
// },
//
// _onPressOut: function() {
//
// this.setState({pressing: false});
//
// },
_onPress:function(){
if (this.state.pressing === true)
{
  this.setState({pressing: false});
}
else {
  this.setState({pressing: true});
}
},
  render: function() {
    var executeText = null;
     if (this.state.switchIsOn === true)
     {
       ToastAndroid.show('It will be executing via simulation form ! ', ToastAndroid.SHORT);
     }
    //  else {
    //    //ToastAndroid.show('It will be executing via background process ! ', ToastAndroid.SHORT)
     //
    //  }

     if (this.state.pressing === false)
     {
       executeText = 'Execute Process';
     }
     if (this.state.pressing === true)
     {
       executeText = 'Stop Process';
     }

    return (
      <View style={styles.container}>

        <Image
          style={styles.banner}
          onLoadStart={(e) => this.setState({loading: true})}
          source={{uri:'https://raw.githubusercontent.com/jackalhan/i_aaa_ui/master/image/banner.jpg'}}
          onProgress={(e) => this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)})}
          onLoad={() => this.setState({loading: false, error: false})} />
        <View style={styles.form}>
          <View style={styles.setting}>
            <Text style={styles.text}>
              Execute by filling simulation form?
            </Text>
            <Switch
              onValueChange={(value) => this.setState({switchIsOn: value})}
              style={styles.switch}
              value={this.state.switchIsOn}
              thumbTintColor="#ffffff"
              tintColor="#ffffff"
              onTintColor="#ffffff"
              />

          </View>
          <View style={styles.buttonLayer}>
            <TouchableHighlight style={styles.button}
                                onPress={this._onPress}>
                                <View style={styles.button}>
                <Text style={styles.buttonText}>
                {executeText}
                </Text>
                </View>
            </TouchableHighlight>
          </View>


          <View style={styles.formLayer}>
            <View style={styles.formFields}>
            <Text style={styles.text}>
            Latitude
            </Text>
            <TextInput style={styles.input} />

            <Text style={styles.text}>
            Longtitude
            </Text>
            <TextInput style={styles.input} />

            <Text style={styles.text}>
            Vehicle Speed (mile)
            </Text>
            <TextInput style={styles.input} />

            </View>
          </View>
        </View>
      </View>
    );
  }
});

var baseFontSize = 15;
var windowSize = dimensions.get('window');
var styles = StyleSheet.create({
  input: {
    borderRadius:10,
    backgroundColor:'white',
    height:20,
    width:120,
    color:'black'

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#343e4b'
  },
  banner: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems:'stretch'
  },
  form: {
    flex:5,
    borderColor: '#343e4b',
    borderWidth: 5,
    alignItems:'center'
  },
  setting:{
    flex:1,
    flexDirection:'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    paddingTop: 50
  },
  switch:{
    width:50,
    flex:2,
    marginLeft : 10

  },
  text:{
    flex:3,
    color: '#eeeff0',
    fontSize: baseFontSize

  },
  button:{
    borderRadius:10,
    backgroundColor:'white',
    height:20,
    width:120,
    alignItems:'center',

  },
  buttonLayer:{
    borderRadius:10,
    backgroundColor:'#eeeff0',

  },
  buttonText:{
    color: '#343e4b',
    fontSize: baseFontSize -2,
    fontWeight:'bold'
  },
  formLayer:{
    flex:5,
    flexWrap: 'nowrap',
  }
});

module.exports = simulation;
