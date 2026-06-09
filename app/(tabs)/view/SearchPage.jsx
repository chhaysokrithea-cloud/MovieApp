import {
  View, Text, StyleSheet, TextInput,
  FlatList, Image, TouchableOpacity, ScrollView
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';

// ✅ Added category to each movie!
const allMovies = [
  { id: 1, title: 'John Wick', category: 'Action', image: 'https://image.tmdb.org/t/p/original/wXqWR7dHncNRbxoEGybEy7QTe9h.jpg' },
  { id: 2, title: 'Ghost Doctor', category: 'Drama', image: 'https://cdn.displate.com/artwork/2026-01-17/df91b72b-83f2-4ba4-ba41-23f8a4c55767.jpg?speedsize=w_681' },
  { id: 3, title: 'Avengers Infinity War', category: 'Action', image: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg' },
  { id: 4, title: 'The Wonderful', category: 'Drama', image: 'https://i.pinimg.com/736x/ca/ad/c8/caadc8cd2a3d72522307279ac2f365b8.jpg' },
  { id: 5, title: 'Iron Man', category: 'Action', image: 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_.jpg' },
  { id: 6, title: 'The 6/45', category: 'Comedy', image: 'https://preview.redd.it/this-has-to-be-the-most-funniest-korean-movie-ever-made-v0-f56sdwit9u6e1.jpeg?auto=webp&s=8c81e80cce697f75a1b11ff5a7edd05f03ef5656' },
  { id: 7, title: 'Twinkling Watermelon', category: 'Drama', image: 'https://i.pinimg.com/736x/43/09/35/430935fa53c0a63db851fafac021e1de.jpg' },
  { id: 8, title: 'I Can Speak', category: 'Drama', image: 'https://m.media-amazon.com/images/M/MV5BODNhOWEzZDgtMmMyYi00NDNlLThmYWYtZGIyYjEyNTdkYzMxXkEyXkFqcGc@._V1_QL75_UX217.5_.jpg' },
  { id: 9, title: 'Save the Green Planet!', category: 'Sci-Fi', image: 'https://m.media-amazon.com/images/M/MV5BMTIyOTE3NDE0NV5BMl5BanBnXkFtZTcwMTM1NDAzMQ@@._V1_QL75_UX246_.jpg' },
  { id: 10, title: 'The Mummy', category: 'Action', image: 'https://m.media-amazon.com/images/M/MV5BYjFiZjQ4MWUtM2Y0NC00NGZkLTllMmUtODllZDI5YTljZmZhXkEyXkFqcGc@._V1_QL75_UX262.5_.jpg' },
  { id: 11, title: 'Scream 7', category: 'Horror', image: 'https://m.media-amazon.com/images/M/MV5BZDkzZTY5N2QtMmM3YS00ZmE2LWE5ZjgtZjliNWU3MDJlMzI4XkEyXkFqcGc@._V1_QL75_UX492_.jpg' },
  { id: 12, title: 'Colony', category: 'Sci-Fi', image: 'https://m.media-amazon.com/images/M/MV5BMWI3N2I1OWItMzZlZi00YjM0LTk4NGMtOWM4NjU5N2FlYTJhXkEyXkFqcGc@._V1_QL75_UX240_.jpg' },
  { id: 13, title: 'Weapons', category: 'Action', image: 'https://m.media-amazon.com/images/M/MV5BMjdlOTRhNGItMDE4Mi00MmVlLTk3MzctMDA5NjZhMzQ5ZjBmXkEyXkFqcGc@._V1_QL75_UX783_.jpg' },
  { id: 14, title: 'Psycho Killer', category: 'Horror', image: 'https://m.media-amazon.com/images/M/MV5BYjQwOTU1MzYtZDIyNS00MzU5LTlmMGMtOWIyYzNjMjZlYWVkXkEyXkFqcGc@._V1_QL75_UX232.5_.jpg' },
];

const categories = ['All', 'Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'];

export default function SearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ✅ Fixed filter — safe check for category!
  const filtered = allMovies.filter(movie => {
    const matchSearch = movie.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'All' || movie.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <View style={styles.main}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <AntDesign name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 34 }} />
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        style={{height:100}}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryBtn,
              selectedCategory === cat && styles.categoryBtnActive
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === cat && styles.categoryTextActive
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <Text style={styles.resultCount}>
        Found {filtered.length} Movies
      </Text>

      {/* Movie Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyIcon}>😕</Text>
            <Text style={styles.emptyText}>No movies found!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieCard}
            onPress={() => router.push({
              pathname: '/(tabs)/view/DetailPage',
              params: {
                id: item.id,
                title: item.title,
                category: item.category,
                image: item.image,
              }
            })}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.movieImage}
              resizeMode='cover'
            />
            <Text style={styles.movieTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.movieCategory}>{item.category}</Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 55,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 44,  
    height: 44,       
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  // Search
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },

  // Category
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 24,
    alignItems:"center",
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,     
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    height:38,
    borderColor: '#333',
  },
  categoryBtnActive: {
    backgroundColor: '#FF3B5C',
    borderColor: '#FF3B5C',
  },
  categoryText: {
    color: '#888',
    fontSize: 13,
    lineHeight:16   
  },
  categoryTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },

  // Results
  resultCount: {
    color: '#666',
    fontSize: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  // Grid
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  movieCard: {
    flex: 1,
    margin: 4,
    maxWidth: '31%',
  },
  movieImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  movieTitle: {
    color: 'white',
    fontSize: 11,
    marginTop: 5,
    textAlign: 'center',
  },
  movieCategory: {
    color: '#FF3B5C',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
    marginBottom: 8,
  },

  // Empty
  emptyBox: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
});