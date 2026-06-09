import {
  View, Text, Image, StyleSheet,
  FlatList, Dimensions, TouchableOpacity, ScrollView
} from 'react-native';
import { useState, useRef, useEffect, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import RunningBanner from './RunningBanner';
const { width } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

// ===== BANNER DATA =====
const bannerImages = [
  {
    id: 1,
    image: 'https://www.anajakhd.com/wp-content/uploads/2025/07/AJWebssite-PS-33.png',
    title: 'រឿង ភូមិបង្កប់វិញ្ញាណ',
  },
  {
    id: 2,
    image: 'https://angkordc.com/_next/image?url=%2Fuploads%2FWebsite_Poster_500x750px_a9f990c0d1.jpg&w=3840&q=75',
    title: 'រឿង ភូមិបុរាណ',
  },
  {
    id: 3,
    image: 'https://m.media-amazon.com/images/M/MV5BMDgwNzhmMjItMDhlYi00ODdlLWI1NjUtZDgxZGMzMGU5MmM4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    title: 'Colony',
  },
  {
    id: 4,
    image: 'https://m.media-amazon.com/images/M/MV5BMGQ5MzVlZjQtNDgyMS00NjM3LTk0MmMtZWY0NjU1ZmU1NTM2XkEyXkFqcGc@._V1_.jpg',
    title: 'The Mummy',
  },
    {
    id: 5,
    image: 'https://i.pinimg.com/736x/01/fc/a1/01fca1e77cbfbbd6df569c17297d2d4e.jpg',
    title: 'Squid Game SS3',
  },
];

// ===== DRAMA MOVIES =====
const dramaMovies = [
  { id: 1, title: 'Run On', image: 'https://korean-binge.com/wp-content/uploads/2022/04/runon-poster.jpg?w=708' },
  { id: 2, title: 'BloodHound', image: 'https://i.pinimg.com/474x/9e/ea/bb/9eeabb14bcd8302a482e659195b17e4e.jpg' },
  { id: 3, title: 'Destined With You', image: 'https://i.pinimg.com/236x/16/79/65/167965071ddeb1285dba6462098e4b06.jpg' },
  { id: 4, title: 'Family by choice', image: 'https://i.pinimg.com/736x/35/c0/ce/35c0cedb0cf2939163cfeeafc0622699.jpg' },
  { id: 5, title: 'Fifties Professionals', image: 'https://m.media-amazon.com/images/M/MV5BMWFiZDAyZDAtYTgyNC00NjljLTkxZjktMmVlODVkM2JjMTM3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg' },
];

// ===== ACTION MOVIES =====
const actionMovies = [
  { id: 1, title: 'Jonh Wick', image: 'https://image.tmdb.org/t/p/original/wXqWR7dHncNRbxoEGybEy7QTe9h.jpg' },
  { id: 2, title: 'Ghost Doctor', image: 'https://cdn.displate.com/artwork/2026-01-17/df91b72b-83f2-4ba4-ba41-23f8a4c55767.jpg?speedsize=w_681' },
  { id: 3, title: 'Avengers Infinity War', image: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg' },
  { id: 4, title: 'The Wonderful', image: 'https://i.pinimg.com/736x/ca/ad/c8/caadc8cd2a3d72522307279ac2f365b8.jpg' },
  { id: 5, title: 'Iron man Noway home', image: 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_.jpg' },
];

// ===== COMEDY MOVIES =====
const comedyMovies = [
  { id: 1, title: 'The 6/45', image: 'https://preview.redd.it/this-has-to-be-the-most-funniest-korean-movie-ever-made-v0-f56sdwit9u6e1.jpeg?auto=webp&s=8c81e80cce697f75a1b11ff5a7edd05f03ef5656' },
  { id: 2, title: 'Twinkling Watermelon', image: 'https://i.pinimg.com/736x/43/09/35/430935fa53c0a63db851fafac021e1de.jpg' },
  { id: 3, title: 'I Can Speak', image: 'https://m.media-amazon.com/images/M/MV5BODNhOWEzZDgtMmMyYi00NDNlLThmYWYtZGIyYjEyNTdkYzMxXkEyXkFqcGc@._V1_QL75_UX217.5_.jpg' },
  { id: 5, title: 'Save the Green Planet!', image: 'https://m.media-amazon.com/images/M/MV5BMTIyOTE3NDE0NV5BMl5BanBnXkFtZTcwMTM1NDAzMQ@@._V1_QL75_UX246_.jpg' },
];
const ghostMovies = [
  { id: 1, title: 'Lee Cronins The Mummy', image: 'https://m.media-amazon.com/images/M/MV5BYjFiZjQ4MWUtM2Y0NC00NGZkLTllMmUtODllZDI5YTljZmZhXkEyXkFqcGc@._V1_QL75_UX262.5_.jpg' },
  { id: 2, title: 'Scream 7', image: 'https://m.media-amazon.com/images/M/MV5BZDkzZTY5N2QtMmM3YS00ZmE2LWE5ZjgtZjliNWU3MDJlMzI4XkEyXkFqcGc@._V1_QL75_UX492_.jpg' },
  { id: 3, title: 'Colony', image: 'https://m.media-amazon.com/images/M/MV5BMWI3N2I1OWItMzZlZi00YjM0LTk4NGMtOWM4NjU5N2FlYTJhXkEyXkFqcGc@._V1_QL75_UX240_.jpg' },
  { id: 4, title: 'Weapons', image: 'https://m.media-amazon.com/images/M/MV5BMjdlOTRhNGItMDE4Mi00MmVlLTk3MzctMDA5NjZhMzQ5ZjBmXkEyXkFqcGc@._V1_QL75_UX783_.jpg' },
  { id: 5, title: 'Psycho Killer', image: 'https://m.media-amazon.com/images/M/MV5BYjQwOTU1MzYtZDIyNS00MzU5LTlmMGMtOWIyYzNjMjZlYWVkXkEyXkFqcGc@._V1_QL75_UX232.5_.jpg' },
];

// ===== POSTER COMPONENT =====
function MoviePoster({ item }) {
  return (
    <TouchableOpacity style={styles.posterCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.posterImage}
        resizeMode='cover'
      />
      <Text style={styles.posterTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}


// ===== MOVIE SECTION COMPONENT =====
function MovieSection({ title, data }) {

  return (
    <View style={styles.sectionContainer}>

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>មើលទាំងអស់ →</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Poster List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        renderItem={({ item }) => <MoviePoster item={item} />}
      />

    </View>
  );
}

// ===== MAIN APP =====
export function Appmovie() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const flatListRef = useRef(null);

  const [fontsLoaded] = useFonts({
    'Siemreap': require('../../../assets/font/Siemreap.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  function goToIndex(index) {
    flatListRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    setCurrentIndex(index);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % bannerImages.length;
      goToIndex(nextIndex);
    }, 3500);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.main} onLayout={onLayoutRootView}>

      {/* ===== SCROLLABLE CONTENT ===== */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }} // ← space for bottom bar!
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={{fontSize:20,color:"white",padding:40}}>Logo Company Here</Text>
          <Text style={styles.header}>Name Company Here</Text>
          <Text style={styles.subHeader}>Discover Trending Movies</Text>
        </View>
        <RunningBanner/>
        {/* Banner */}
        <FlatList
          ref={flatListRef}
          data={bannerImages}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode='cover'
              />
              <View style={styles.overlay} />
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          )}
        />

        {/* Dots */}
        <View style={styles.dotsContainer}>
          {bannerImages.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => goToIndex(index)}
            >
              <View style={[
                styles.dot,
                currentIndex === index && styles.dotActive
              ]} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Counter */}
        <Text style={styles.counter}>
          {currentIndex + 1} / {bannerImages.length}
        </Text>


        <MovieSection title=" រឿង កំពុងពេញនិយម" data={dramaMovies} />
        <MovieSection title=" រឿង បែបប្រយុទ្ធ" data={actionMovies} />
        <MovieSection title=" រឿង បែបកំប្លែង" data={comedyMovies} />
        <MovieSection title=" រឿង បែបរន្ធត់" data={ghostMovies} />
        
      </ScrollView>
      <View style={styles.bottomMenu}>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setActiveTab('home')}
        >
          <AntDesign
            name="home"
            size={24}
            color={activeTab === 'home' ? '#FF3B5C' : '#888'}
          />
          <Text style={[
            styles.menuLabel,
            activeTab === 'home' && styles.menuLabelActive
          ]}>ទំព័រដើម</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/view/SearchPage')}
        >
          <AntDesign
            name="search1"
            size={24}
            color={activeTab === 'search' ? '#FF3B5C' : '#888'}
          /> 
          <Text style={[
            styles.menuLabel,
            activeTab === 'search' && styles.menuLabelActive
          ]}>ស្វែងរក</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setActiveTab('library')}
        >
          <AntDesign
            name="book"
            size={24}
            color={activeTab === 'library' ? '#FF3B5C' : '#888'}
          />
          <Text style={[
            styles.menuLabel,
            activeTab === 'library' && styles.menuLabelActive
          ]}>បណ្ណាល័យ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setActiveTab('history')}
        >
          <AntDesign
            name="history"
            size={24}
            color={activeTab === 'history' ? '#FF3B5C' : '#888'}
          />
          <Text style={[
            styles.menuLabel,
            activeTab === 'history' && styles.menuLabelActive
          ]}>ប្រវត្តិ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
           onPress={() => router.push('/view/DetailPage')}
        >
          <AntDesign
            name="setting"
            size={24}
            color={activeTab === 'setting' ? '#FF3B5C' : '#888'}
          />
          <Text style={[
            styles.menuLabel,
            activeTab === 'setting' && styles.menuLabelActive
          ]}>ការកំណត់</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    bottom:50
  },

  // Header
  headerContainer: {
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    color: '#FFFFFF',
    fontFamily:"Montserrat-Bold",
  },
  subHeader: {
    fontSize: 12,
    color: '#AAAAAA',
    marginTop: 4,
    fontFamily:"Montserrat-Bold"
  },

  // Banner
  slide: {
    width: width,
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Siemreap',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },

  // Dots
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.77)',
  },
  dotActive: {
    width: 15,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B5C',
  },
  counter: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
    fontFamily: 'Montserrat-Bold',
  },

  // Movie Section
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Siemreap',
  },
  seeAll: {
    fontSize: 13,
    color: '#FF3B5C',
    fontFamily: 'Siemreap',
  },

  // Poster
  posterCard: {
    width: 120,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  posterImage: {
    width: 120,
    height: 170,
    borderRadius: 10,
  },
  posterTitle: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Siemreap',
    textAlign: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },

  // Bottom Menu
  bottomMenu: {
    position: 'absolute',   // ← always at bottom!
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderTopWidth: 1,
    borderTopColor: '#222',
    paddingVertical: 10,
    paddingBottom: 20,      // ← space for iPhone home bar!
  },
  menuItem: {
    alignItems: 'center',
    gap: 4,
  },
  menuLabel: {
    fontSize: 10,
    color: '#888',
    fontFamily: 'Siemreap',
  },
  menuLabelActive: {
    color: '#FF3B5C',
  },
});

export default Appmovie;
