import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoidGlpcm5ha28iLCJhIjoiY2xzb2JiZXI4MGRiODJrb3c5NnlmZnRjYyJ9.Fv2ex2k4_1efbXdhZjMl1Q');

const App = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text>Hello Maps</Text>
        <Mapbox.MapView style={styles.map} />
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  }
});