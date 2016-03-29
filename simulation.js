var React = require('react-native');

var dimensions = require('Dimensions');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} = React;

var simulation = React.createClass({
  getInitialState: function() {
    return {
      zip: '',
      forecast: null
    };
  },
  render: function() {
    return (
      <View style={styles.container}>

        <Image style={styles.banner} source={{uri:'https://raw.githubusercontent.com/jackalhan/i_aaa_ui/master/android/app/src/main/res/drawable-xxhdpi/banner.png'}} />

        <Text style={styles.form}> FORM </Text>

      </View>
    );
  }
});

var baseFontSize = 15;
var windowSize = dimensions.get('window')

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#343e4b',
    borderColor: '#0099AA',
    borderWidth: 0
  },
  banner: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'black',
    borderColor: '#0099AA',
    borderWidth: 0,
    alignItems:'stretch'
  },
  form: {
    flex:5,
    borderColor: '#343e4b',
    borderWidth: 5,
    textAlign:'center',
    fontSize: 24
  }
});

module.exports = simulation;
