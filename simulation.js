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

        <Image style={styles.banner} source={{uri: 'http://www.keenthemes.com/preview/metronic/theme/assets/global/plugins/jcrop/demos/demo_files/image2.jpg'}} />

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
    backgroundColor: '#F5FCFF',
    borderColor: '#0099AA',
    borderWidth: 5
  },
  banner: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'black',
    borderColor: '#0099AA',
    borderWidth: 5,
    opacity:0.8,
    alignItems:'stretch'
  },
  form: {
    flex:4,
    borderColor: '#AA0099',
    borderWidth: 5,
    textAlign:'center',
    fontSize: 24
  }
});

module.exports = simulation;
