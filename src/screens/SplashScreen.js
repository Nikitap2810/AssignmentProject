import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        navigation.reset({
          routes: [
            {
              name: 'BottomTab',
            },
          ],
        });
      }, 1500);
    };
    fetchData();
  }, []);

  return (
    <ImageBackground
      source={{uri: 'https://source.unsplash.com/random/800x600'}}
      style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: 'https://blog.logrocket.com/wp-content/uploads/2023/07/best-react-native-splash-screen-libraries.png',
              }}
              style={styles.logo}
            />
          </View>
          <Text style={styles.text}>Splash Screen</Text>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background
    borderRadius: 100,
    padding: 10,
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  text: {
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 10,
  },
});
