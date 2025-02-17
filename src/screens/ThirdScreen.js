import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setAddressList} from '../redux/reducer/address';
import LinearGradient from 'react-native-linear-gradient';

const ThirdScreen = ({navigation}) => {
  const {addressList} = useSelector(state => state.address);
  const dispatch = useDispatch();

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
    <LinearGradient colors={['#FF7E5F', '#FFB64C']} style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SecondPage')}
        activeOpacity={0.8}
        style={styles.button}>
        <MaterialCommunityIcons size={25} color={'#FF6F61'} name={'plus'} />
        <Text style={styles.buttonText}>Add New Address</Text>
      </TouchableOpacity>
      {addressList?.length > 0 ? (
        <FlatList
          data={addressList}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={styles.addressItem}>
              <View style={styles.addressDetails}>
                <Text
                  style={
                    styles.addressText
                  }>{`Address Type: ${item.addressType}`}</Text>
                <Text
                  style={
                    styles.addressText
                  }>{`Plot Number: ${item.plotNumber}`}</Text>
                <Text
                  style={styles.addressText}>{`Address: ${item.address}`}</Text>
                <Text
                  style={
                    styles.addressText
                  }>{`Landmark: ${item.landmark}`}</Text>
                <Text
                  style={styles.addressText}>{`Pincode: ${item.pincode}`}</Text>
                <Text style={styles.addressText}>{`City: ${item.city}`}</Text>
                <Text style={styles.addressText}>{`State: ${item.state}`}</Text>
                <Text
                  style={styles.addressText}>{`Country: ${item.country}`}</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() =>
                    navigation.navigate('SecondPage', {index: index})
                  }>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="#000"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleDelete(index)}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="#FF0000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>No Address Found</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  addressItem: {
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressDetails: {
    flex: 1,
  },
  addressText: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    justifyContent: 'center',
  },
  deleteIcon: {
    padding: 5,
  },
  editIcon: {
    padding: 5,
    marginBottom: 10,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#FF6F61',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listContent: {
    paddingBottom: 50,
  },
});

export default ThirdScreen;
