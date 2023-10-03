import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        // console.log('Is Skipped: ', isSkipped, 'Login Token: ', loginToken);
        navigation.reset({
          routes: [
            {
              name: 'FirstPage',
            },
          ],
        });
      }, 1500);
    };
    fetchData();
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{height: 200, width: 200}}>
        <Image
          source={{
            uri: 'https://blog.logrocket.com/wp-content/uploads/2023/07/best-react-native-splash-screen-libraries.png',
          }}
          style={{flex: 1, borderRadius: 50, marginBottom: 15}}
        />
      </View>
      <Text style={{color: '#000', fontSize: 22}}>Splash Screen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
