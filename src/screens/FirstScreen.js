import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  ImageBackground,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {setLoginToken} from '../redux/reducer/user';

const FirstScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState('');
  const [sum, setSum] = useState('');

  const calculateDigitSum = num => {
    return num.split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  };

  const handleLogin = () => {
    setIsLoading(true);
    const numDigits = number.length;
    const numSum = calculateDigitSum(number);

    if (numDigits !== 4 || sum === '' || numSum !== parseInt(sum)) {
      setIsLoading(false);
      Alert.alert(
        'Error',
        'Please enter a 4-digit number and its correct sum.',
      );
      return;
    }

    navigation.navigate('ThirdPage');
    showMessage({
      message: 'Login successful. Redirecting to My Address Book.',
      type: 'success',
    });
    setIsLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={{uri: 'https://source.unsplash.com/random/800x600'}}
        style={styles.backgroundImage}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome</Text>
            <Text style={styles.subHeaderText}>
              Please enter your credentials
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Enter 4-digit number"
              keyboardType="numeric"
              maxLength={4}
              onChangeText={text => setNumber(text)}
              value={number}
              style={styles.input}
            />
            <TextInput
              placeholder="Enter sum of digits"
              keyboardType="numeric"
              onChangeText={text => setSum(text)}
              value={sum}
              style={styles.input}
            />

            <TouchableOpacity
              disabled={isLoading}
              onPress={handleLogin}
              activeOpacity={0.8}
              style={styles.button}>
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" style={styles.buttonIcon} />
              ) : null}
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#FFF',
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#00A9E0',
    borderRadius: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginRight: 5,
  },
});
