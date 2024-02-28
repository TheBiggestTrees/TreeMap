import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Login from './Login';


export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
