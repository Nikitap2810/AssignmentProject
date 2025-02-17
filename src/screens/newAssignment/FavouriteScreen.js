import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

const FavouriteScreen = ({navigation}) => {
  const {favouriteList} = useSelector(state => state.user);

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
      <View style={{flex: 1}}>
        {favouriteList?.length > 0 ? (
          <FlatList
            data={favouriteList}
            contentContainerStyle={styles.listContent}
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

export default FavouriteScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    paddingBottom: 50,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  yearText: {
    fontSize: 16,
    color: '#555',
  },
  poster: {
    height: 120,
    width: 80,
    borderRadius: 8,
  },
});
