import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient'; // Install this package if not already
import {useDispatch, useSelector} from 'react-redux';
import {setFavouriteList} from '../../redux/reducer/user';

const DetailMovieScreen = ({navigation, route}) => {
  const {favouriteList} = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [isFavorite, setIsFavorite] = useState(false); // State to manage favorite status

  useEffect(() => {
    getDetailList();
    // Check if movie is already a favorite when the component mounts
    checkIfFavorite();
  }, [route?.params?.movieId]);

  const getDetailList = async () => {
    try {
      const res = await axios.post(
        `http://www.omdbapi.com/?apikey=4528ff26&i=${route?.params?.movieId}`,
      );

      if (res?.data?.Response === 'True') {
        setData(res?.data);
      } else {
        showMessage({
          message: res?.data?.Error,
          type: 'danger',
          icon: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'An error occurred while fetching movie details.',
        type: 'danger',
        icon: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    // Replace with your logic to check if the movie is in favorites
    const favorites = [...favouriteList]; // Implement this function to get favorites
    const isFavorite = favorites.some(
      fav => fav.imdbID == route?.params?.movieId,
    );
    setIsFavorite(isFavorite);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      // Remove from favorites
      let favList = [...favouriteList];
      favList = favList.filter(item => item.imdbID !== route?.params?.movieId);
      console.log(favList);

      dispatch(setFavouriteList(favList)); // Implement this function to remove from favorites
      showMessage({
        message: 'Removed from favorites',
        type: 'success',
        icon: 'success',
      });
    } else {
      // Add to favorites
      let favList = [...favouriteList];
      favList.push(data);

      dispatch(setFavouriteList(favList)); // Implement this function to add to favorites
      showMessage({
        message: 'Added to favorites',
        type: 'success',
        icon: 'success',
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <LinearGradient
      colors={['#FF7E5F', '#FFB64C']}
      style={styles.gradientBackground}>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <View style={styles.detailsContainer}>
            <Image style={styles.poster} source={{uri: data?.Poster}} />
            <Text style={styles.title}>{data?.Title}</Text>
            <Text style={styles.subtitle}>Year of Release:</Text>
            <Text style={styles.text}>{data?.Year}</Text>
            <Text style={styles.subtitle}>Genre:</Text>
            <Text style={styles.text}>{data?.Genre}</Text>
            <Text style={styles.subtitle}>Director:</Text>
            <Text style={styles.text}>{data?.Director}</Text>
            <Text style={styles.subtitle}>Plot:</Text>
            <Text style={styles.text}>{data?.Plot}</Text>
            <Text style={styles.subtitle}>Actors:</Text>
            <Text style={styles.text}>{data?.Actors}</Text>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={toggleFavorite}>
              <Text style={styles.favoriteButtonText}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default DetailMovieScreen;

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    padding: 20,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: 'center',
  },
  poster: {
    height: 220,
    width: 150,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    shadowColor: '#000', // Adds shadow to the poster
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  favoriteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347', // Tomato color
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 200,
  },
  favoriteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
