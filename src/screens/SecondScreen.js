import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {userDataApi} from '../api';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SecondScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    };
    fetchData();
  }, []);

  const getUserData = async () => {
    const response = await userDataApi({});
    setData(response?.data?.message?.data);
  };

  const renderItem = useCallback(({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ThirdPage', {name: item?.name1})}
        activeOpacity={0.8}
        key={index}
        style={styles.container}>
        <Text style={{color: '#000'}}>Name: {item?.name1}</Text>
        <Text style={{color: '#000'}}>Age: {item?.age}</Text>
        <Text style={{color: '#000'}}>Company_name: {item?.company_name}</Text>
        <Text style={{color: '#000'}}>Designation: {item?.designation}</Text>
        <Text style={{color: '#000'}}>Gender: {item?.gender}</Text>
        <Text style={{color: '#000'}}>
          Address: {item?.address ? item?.address : '-'}
        </Text>
      </TouchableOpacity>
    );
  });
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
          Listing Screen
        </Text>
      </View>

      <View style={{flex: 1, padding: 15}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
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
});
