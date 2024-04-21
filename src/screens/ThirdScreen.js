// Import necessary components and libraries
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setAddressList} from '../redux/reducer/address';

// Define the ThirdScreen component
const ThirdScreen = ({navigation}) => {
  const {addressList} = useSelector(state => state.address);
  const dispatch = useDispatch();

  // Function to handle address deletion
  const handleDelete = index => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: () => {
            let address = [...addressList];
            if (index > -1) {
              address.splice(index, 1);
            }
            dispatch(setAddressList(address));
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    // Use ImageBackground component with uri prop to set background image
    <ImageBackground
      style={styles.container}
      source={{uri: 'https://source.unsplash.com/random/800x600'}}>
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialCommunityIcons
              size={25}
              color={'#FFFFFF'}
              name={'arrow-left'}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Address List</Text>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SecondPage')}
            activeOpacity={0.8}
            style={styles.button}>
            <MaterialCommunityIcons size={25} color={'#FFF'} name={'plus'} />
            <Text style={styles.buttonText}>Add New Address</Text>
          </TouchableOpacity>
          {addressList?.length > 0 ? (
            <FlatList
              data={addressList}
              contentContainerStyle={{paddingBottom: 50}}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <View style={styles.addressItem}>
                  <Text
                    style={
                      styles.addressText
                    }>{`Address Type: ${item.addressType}`}</Text>
                  <Text
                    style={
                      styles.addressText
                    }>{`Plot Number: ${item.plotNumber}`}</Text>
                  <Text
                    style={
                      styles.addressText
                    }>{`Address: ${item.address}`}</Text>
                  <Text
                    style={
                      styles.addressText
                    }>{`Landmark: ${item.landmark}`}</Text>
                  <Text
                    style={
                      styles.addressText
                    }>{`Pincode: ${item.pincode}`}</Text>
                  <Text style={styles.addressText}>{`City: ${item.city}`}</Text>
                  <Text
                    style={styles.addressText}>{`State: ${item.state}`}</Text>
                  <Text
                    style={
                      styles.addressText
                    }>{`Country: ${item.country}`}</Text>

                  <TouchableOpacity
                    style={styles.editIcon}
                    onPress={() =>
                      navigation.navigate('SecondPage', {index: index})
                    }>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={24}
                      color="#00A9E0"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{...styles.deleteIcon}}
                    onPress={() => handleDelete(index)}>
                    <MaterialCommunityIcons
                      name="delete"
                      size={24}
                      color="#FF0000"
                    />
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={styles.emptyListContainer}>
              <Text style={styles.emptyListText}>No Address Found</Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

// Define component styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    backgroundColor: '#00A9E0',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
    borderWidth: 1,
    marginLeft: 15,
    borderRadius: 100,
    borderColor: '#FfFfff',
  },
  headerText: {
    color: '#ffffff',
    marginLeft: 25,
    fontSize: 16,
    fontWeight: '700',
  },
  addressItem: {
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#F0F0F0',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  addressText: {
    marginBottom: 5,
  },
  deleteIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  button: {
    borderColor: '#00A9E0',
    borderWidth: 1,
    // backgroundColor: '#FFF',
    borderRadius: 5,
    margin: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ThirdScreen;
