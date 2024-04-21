import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {formData} from '../config/formdata';
import {useDispatch, useSelector} from 'react-redux';
import {setAddressList} from '../redux/reducer/address';

const SecondScreen = ({navigation, route}) => {
  const {addressList} = useSelector(state => state.address);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, handleFormValueChange, setFormValues] = formData({
    addressType: '',
    plotNumber: '',
    address: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    async function fetchData() {
      if (route?.params?.index != undefined) {
        setFormValues(prev => ({
          ...prev,
          addressType: addressList[route?.params?.index].addressType,
          plotNumber: addressList[route?.params?.index].plotNumber,
          address: addressList[route?.params?.index].address,
          landmark: addressList[route?.params?.index].landmark,
          pincode: addressList[route?.params?.index].pincode,
          city: addressList[route?.params?.index].city,
          state: addressList[route?.params?.index].state,
          country: addressList[route?.params?.index].country,
        }));
      }
    }
    fetchData();
  }, [route?.params?.index]);

  const handleSubmit = () => {
    setIsLoading(true);
    // Validation
    if (
      !formValues.addressType ||
      !formValues.plotNumber ||
      !formValues.address ||
      !formValues.pincode ||
      !formValues.city ||
      !formValues.state ||
      !formValues.country
    ) {
      setIsLoading(false);
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (formValues.pincode.length !== 6 || !/^\d+$/.test(formValues.pincode)) {
      setIsLoading(false);
      Alert.alert('Error', 'Pincode should be 6 digits');
      return;
    }

    // Submit
    if (route?.params?.index == undefined) {
      let newAddress = [...addressList];
      newAddress.push(formValues);

      dispatch(setAddressList(newAddress));
      navigation.navigate('ThirdPage');
    } else {
      let newAddress = [...addressList];
      newAddress[route?.params?.index] = formValues;

      dispatch(setAddressList(newAddress));
      navigation.navigate('ThirdPage');
    }

    // Clear form
    setFormValues({
      addressType: '',
      plotNumber: '',
      address: '',
      landmark: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
    });

    setIsLoading(false);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={{...styles.header}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            padding: 5,
            borderWidth: 1,
            marginLeft: 15,
            borderRadius: 100,
            borderColor: '#FfFfff',
          }}>
          <MaterialCommunityIcons
            size={25}
            color={'#FFFFFF'}
            name={'arrow-left'}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: '#ffffff',
            marginLeft: 25,
            fontSize: 16,
            fontWeight: '700',
          }}>
          Address Form
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 15, paddingBottom: 50}}>
        <Text style={styles.label}>Address Type:</Text>
        <TextInput
          style={styles.input}
          value={formValues.addressType}
          onChangeText={text => handleFormValueChange('addressType', text)}
          placeholder="Home/Work/Other"
        />

        <Text style={styles.label}>PlotNumber:</Text>
        <TextInput
          style={styles.input}
          value={formValues.plotNumber}
          onChangeText={text => handleFormValueChange('plotNumber', text)}
          placeholder="PlotNumber"
        />

        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={formValues.address}
          onChangeText={text => handleFormValueChange('address', text)}
          placeholder="Address"
        />

        <Text style={styles.label}>Landmark:</Text>
        <TextInput
          style={styles.input}
          value={formValues.landmark}
          onChangeText={text => handleFormValueChange('landmark', text)}
          placeholder="Landmark"
        />

        <Text style={styles.label}>Pincode:</Text>
        <TextInput
          style={styles.input}
          value={formValues.pincode}
          onChangeText={text => handleFormValueChange('pincode', text)}
          placeholder="Pincode"
        />

        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          value={formValues.city}
          onChangeText={text => handleFormValueChange('city', text)}
          placeholder="City"
        />

        <Text style={styles.label}>State:</Text>
        <TextInput
          style={styles.input}
          value={formValues.state}
          onChangeText={text => handleFormValueChange('state', text)}
          placeholder="State"
        />

        <Text style={styles.label}>Country:</Text>
        <TextInput
          style={styles.input}
          value={formValues.country}
          onChangeText={text => handleFormValueChange('country', text)}
          placeholder="Country"
        />

        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit}
          activeOpacity={0.8}
          style={styles.button}>
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" style={styles.buttonIcon} />
          ) : null}
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#DADADA',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  header: {
    backgroundColor: '#00A9E0',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00A9E0',
    borderRadius: 5,
    marginTop: 15,
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
