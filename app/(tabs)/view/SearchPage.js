import {
  View, Text, StyleSheet, TextInput,
  FlatList, Image, TouchableOpacity, ScrollView
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';

// All movies data
const allMovies = [
  { id: 1, title: 'ប្រយុទ្ធ', category: 'Action', image: 'https://image.tmdb.org/t/p/original/wXqWR7dHncNRbxoEGybEy7QTe9h.jpg', telegram: 'https://t.me/your_channel' },
  { id: 2, title: 'មនោសញ្ជេតនា', category: 'Drama', image: 'https://korean-binge.com/wp-content/uploads/2022/04/runon-poster.jpg?w=708', telegram: 'https://t.me/your_channel' },
  { id: 3, title: 'កំប្លែង', category: 'Comedy', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwv2Vi7AISYCwUa8LG-adZ-52jc9uDFEG_VQ&s', telegram: 'https://t.me/your_channel' },
  { id: 4, title: 'បែបវិទ្យាសាស្រ្ត', category: 'Sci-Fi', image: 'https://cdn.displate.com/artwork/2026-01-17/df91b72b-83f2-4ba4-ba41-23f8a4c55767.jpg?speedsize=w_681', telegram: 'https://t.me/your_channel' },
  { id: 5, title: 'ស្នេហា', category: 'Drama', image: 'https://i.pinimg.com/474x/9e/ea/bb/9eeabb14bcd8302a482e659195b17e4e.jpg', telegram: 'https://t.me/your_channel' },
  { id: 6, title: 'វីរៈបុរស', category: 'Action', image: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg', telegram: 'https://t.me/your_channel' },
  { id: 7, title: 'សើចជាក់', category: 'Comedy', image: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Caddyshack_film_poster.jpg', telegram: 'https://t.me/your_channel' },
  { id: 8, title: 'ចម្បាំង', category: 'Action', image: 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_.jpg', telegram: 'https://t.me/your_channel' },
];

const categories = ['ទាំងអស់', 'Action', 'Drama', 'Comedy', 'Sci-Fi'];

export default function SearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ទាំងអស់');

  // Filter movies
  const filtered = allMovies.filter(movie => {
    const matchSearch = movie.title.toLowerCase().includes(search.toLowerCase()) ||
                        movie.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'ទាំងអស់' || movie.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <View style={styles.main}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <AntDesign name="arrow-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ស្វែងរករឿង</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="ស្វែងរកឈ្មោះរឿង..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <Text style={styles.resultCount}>
        រកឃើញ {filtered.length} រឿង
      </Text>

      {/* Movie Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}             // ← 3 columns grid!
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>😕 រករឿងមិនឃើញ!</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movieCard}
            onPress={() => router.push({
              pathname: '/(tabs)/view/Appmovie',
              params: {
                id: item.id,
                title: item.title,
                category: item.category,
                image: item.image,
                telegram: item.telegram,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 12,
  },
  categoryBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
  },
  categoryBtnActive: {
    backgroundColor: '#FF3B5C',
    borderColor: '#FF3B5C',
  },
  categoryText: {
    color: '#888',
    fontSize: 13,
  },
  categoryTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  resultCount: {
    color: '#888',
    fontSize: 13,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 30,
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
    marginTop: 6,
    textAlign: 'center',
  },
  movieCategory: {
    color: '#FF3B5C',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  emptyBox: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});