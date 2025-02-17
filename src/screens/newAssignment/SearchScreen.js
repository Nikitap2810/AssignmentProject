import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loaing, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getHomeList = async () => {
    Keyboard.dismiss();
    const res = await axios.post(
      `http://www.omdbapi.com/?s=${searchTerm}&apikey=4528ff26`,
    );

    if (res?.data?.Response == 'True') {
      setData(res.data?.Search);
    } else {
      showMessage({
        message: res?.data?.Error,
        type: 'danger',
        icon: 'danger',
      });
    }
    setLoading(false);
  };

  const renderItem = useCallback(({item, index}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('MovieDetail', {movieId: item?.imdbID})
        }
        key={index}
        style={{...styles.container}}>
        <Image
          style={{
            ...styles.poster,
          }}
          source={{uri: item?.Poster}}
        />

        <View style={{margin: 10, flex: 1}}>
          <Text style={styles.emptyListText}>Title: {item?.Title}</Text>
          <Text style={styles.emptyListText}>
            Year of Release: {item?.Year}
          </Text>
        </View>
      </Pressable>
    );
  });
  return (
    <LinearGradient colors={['#FF7E5F', '#FFB64C']} style={styles.screen}>
      <TextInput
        placeholder="Search movies..."
        placeholderTextColor={'#111'}
        style={styles.input}
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        onSubmitEditing={getHomeList}
      />

      <View style={{flex: 1}}>
        {data?.length > 0 ? (
          <FlatList
            data={data}
            contentContainerStyle={{paddingBottom: 50, padding: 5}}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No Data Found</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingLeft: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    color: '#000',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  poster: {
    height: 120,
    width: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screen: {
    flex: 1,
    padding: 10,
  },
});
