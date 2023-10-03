import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {loginApi} from '../api';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import {setLoginToken} from '../redux/reducer/user';
import {formData} from '../config/formdata';

const FirstScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, handleFormValueChange, setFormValues] = formData({
    usr: '',
    pwd: '',
  });

  const loginUser = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    const response = await loginApi({
      ...formValues,
    });
    console.log(response?.data);
    if (response?.data?.message?.msg == 'success') {
      dispatch(setLoginToken(response.data.message.data?.access_token));
      showMessage({
        message: response?.data?.message?.msg,
        type: 'success',
      });
      navigation.navigate('SecondPage');
    } else {
      showMessage({
        message: response?.data?.message?.error,
        type: 'danger',
      });
    }
    setIsLoading(false);
  };

  return (
    <View style={{backgroundColor: '#00A9E0', flex: 1}}>
      <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: '#ffffff',
            marginBottom: 15,
            fontSize: 22,
            alignSelf: 'center',
          }}>
          Login
        </Text>

        <View style={{height: 100, width: 100}}>
          <Image
            source={{
              uri: 'https://e7.pngegg.com/pngimages/352/66/png-clipart-computer-icons-login-adityaram-properties-business-business-blue-people.png',
            }}
            style={{flex: 1, borderRadius: 200}}
          />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={{color: '#000', fontSize: 16, marginTop: 5}}>Email :</Text>
        <TextInput
          placeholder="Email Address"
          mode="outlined"
          keyboardType="email-address"
          value={formValues?.usr}
          outlineColor={'blue'}
          placeholderTextColor={'#000'}
          style={{
            marginVertical: 5,
            borderWidth: 1,
            borderColor: '#DADADA',
            borderRadius: 10,
            color: '#000',
          }}
          onChange={event =>
            handleFormValueChange('usr', event.nativeEvent.text)
          }
        />

        <Text style={{color: '#000', fontSize: 16, marginTop: 15}}>
          Password :
        </Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor={'#000'}
          outlineColor={'blue'}
          value={formValues?.pwd}
          style={{
            marginVertical: 10,
            borderWidth: 1,
            borderColor: '#DADADA',
            borderRadius: 10,
            color: '#000',
          }}
          onChange={event =>
            handleFormValueChange('pwd', event.nativeEvent.text)
          }
        />

        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            loginUser();
          }}
          activeOpacity={0.8}
          style={styles.button}>
          {isLoading ? <ActivityIndicator style={{marginRight: 5}} /> : null}
          <Text style={{color: '#FFFFFF', fontSize: 16}}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#00A9E0',
    alignSelf: 'center',
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#FFFFFF',

    flex: 1,
    padding: 20,
  },
});
