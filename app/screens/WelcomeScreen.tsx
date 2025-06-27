import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  // add other screens here as needed
};

export default function WelcomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'WelcomeScreen'>>();

  const handleGetStarted = () => {
    navigation.navigate('LoginScreen'); // oder 'Main', je nachdem was dein Ziel ist
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/home.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.headline}>Find the perfect care for your furry friend</Text>
        <Text style={styles.subtext}>
          Connect with trusted pet sitters and walkers who will treat your pet like family.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '45%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  headline: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111',
  },
  subtext: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    color: '#555',
  },
  button: {
    backgroundColor: '#34c759',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
