import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {userSpecificDataApi, userSpecificUpdateApi} from '../api';
import {formData} from '../config/formdata';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {showMessage} from 'react-native-flash-message';

const ThirdScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formValues, handleFormValueChange, setFormValues] = formData({
    name1: '',
    address: '',
    age: '',
    company_name: '',
    designation: '',
    gender: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    };
    fetchData();
  }, []);

  const getUserData = async () => {
    setLoading(true);
    const response = await userSpecificDataApi({
      name1: route?.params?.name,
    });
    setFormValues(prev => ({
      ...prev,
      name1: response?.data?.message?.data?.specific_user[0]?.name1,
      address: response?.data?.message?.data?.specific_user[0]?.address,
      age: response?.data?.message?.data?.specific_user[0]?.age,
      company_name:
        response?.data?.message?.data?.specific_user[0]?.company_name,
      designation: response?.data?.message?.data?.specific_user[0]?.designation,
      gender: response?.data?.message?.data?.specific_user[0]?.gender,
    }));
    setLoading(false);
    // setData(response?.data?.message?.data);
  };

  const UpdateUser = async () => {
    setIsLoading(true);
    const response = await userSpecificUpdateApi({
      ...formValues,
    });
    console.log(response?.data);

    showMessage({
      message: 'Updated Successfully',
      type: 'success',
    });
    navigation.navigate('SecondPage');
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
          User Specific Screen
        </Text>
      </View>
      <View style={{flex: 1}}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={20} />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={{paddingBottom: 50}}
            showsVerticalScrollIndicator={false}
            style={{flex: 1, padding: 20}}>
            <View style={{marginVertical: 10}}>
              <Text style={{color: '#000', fontSize: 16}}>Name :</Text>
              <TextInput
                placeholder="Name"
                outlineColor={'blue'}
                value={formValues?.name1}
                placeholderTextColor={'#AAAAAA'}
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: '#DADADA',
                  borderRadius: 10,
                  color: '#000',
                }}
                onChange={event => {
                  handleFormValueChange('name1', event.nativeEvent.text);
                }}
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: '#000', fontSize: 16}}>Age :</Text>
              <TextInput
                placeholder="Age"
                value={formValues?.age.toString()}
                placeholderTextColor={'#AAAAAA'}
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: '#DADADA',
                  borderRadius: 10,
                  color: '#000',
                }}
                onChange={event =>
                  handleFormValueChange('age', event.nativeEvent.text)
                }
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: '#000', fontSize: 16}}>Gender :</Text>
              <TextInput
                placeholder="Gender"
                outlineColor={'blue'}
                value={formValues?.gender}
                placeholderTextColor={'#AAAAAA'}
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: '#DADADA',
                  borderRadius: 10,
                  color: '#000',
                }}
                onChange={event =>
                  handleFormValueChange('gender', event.nativeEvent.text)
                }
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: '#000', fontSize: 16}}>Company Name :</Text>
              <TextInput
                placeholder="Company Name"
                outlineColor={'blue'}
                value={formValues?.company_name}
                placeholderTextColor={'#DADADA'}
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: '#DADADA',
                  borderRadius: 10,
                  color: '#000',
                }}
                onChange={event =>
                  handleFormValueChange('company_name', event.nativeEvent.text)
                }
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: '#000', fontSize: 16}}>Designation :</Text>
              <TextInput
                placeholder="Designation"
                outlineColor={'blue'}
                value={formValues?.designation}
                placeholderTextColor={'#DADADA'}
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: '#DADADA',
                  borderRadius: 10,
                  color: '#000',
                }}
                onChange={event =>
                  handleFormValueChange('designation', event.nativeEvent.text)
                }
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text style={{color: '#000', fontSize: 16}}>Address :</Text>
              <TextInput
                placeholder="Address"
                outlineColor={'blue'}
                value={formValues?.address}
                placeholderTextColor={'#DADADA'}
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  borderColor: '#DADADA',
                  borderRadius: 10,
                  color: '#000',
                }}
                onChange={event =>
                  handleFormValueChange('address', event.nativeEvent.text)
                }
              />
            </View>

            <TouchableOpacity
              disabled={isLoading}
              onPress={() => {
                UpdateUser();
              }}
              activeOpacity={0.8}
              style={styles.button}>
              {isLoading ? <ActivityIndicator /> : null}
              <Text style={{color: '#FFFFFF'}}>Update</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default ThirdScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00A9E0',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#00A9E0',
    alignSelf: 'center',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    paddingVertical: 15,
    flexDirection: 'row',
  },
});
