var React = require('react-native');

var dimensions = require('Dimensions');

var {
  ToastAndroid,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Switch
} = React;


var simulation = React.createClass({
  getInitialState: function() {
    return {
      switchIsOn : false,


    };
  },
  render: function() {
     if (this.state.switchIsOn === true)
     {
       ToastAndroid.show('It will be executing via simulation form ! ', ToastAndroid.LONG)
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
            <Text style={styles.settingText}>
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
        </View>
      </View>
    );
  }
});

var baseFontSize = 15;
var windowSize = dimensions.get('window');
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#343e4b',
    // borderColor: '#eeeff0',
    // borderWidth: 0
  },
  banner: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'black',
    // borderColor: '#eeeff0',
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
  settingText:{
    flex:3,
    color: '#eeeff0',
    fontSize: baseFontSize

  }

});

module.exports = simulation;
