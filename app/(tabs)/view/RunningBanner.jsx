import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';

const { width } = Dimensions.get('window');

export default function RunningBanner() {
  const scrollRef = useRef(null);
  const scrollX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollX.current += 1;  // ← move 1px every tick

      scrollRef.current?.scrollTo({
        x: scrollX.current,
        animated: false,
      });

      // Reset when too far
      if (scrollX.current > 800) {
        scrollX.current = 0;
      }
    }, 16);  // ← 60fps smooth!

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.banner}>
      <ScrollView
        ref={scrollRef}
        horizontal
        scrollEnabled={false}     // ← user cant touch it
        showsHorizontalScrollIndicator={false}
      >
        {/* Repeat text so it loops smoothly! */}
        <Text style={styles.bannerText} numberOfLines={1}>
          កម្មវិធីនេះគ្រាន់តែជាការសាកល្បងប៉ុណ្ណោះ មិនទាន់បើកដំណើរការទេ។ ដោយលោក ឆាយសុធិរឬទ្ធា{'     '}
          កម្មវិធីនេះគ្រាន់តែជាការសាកល្បងប៉ុណ្ណោះ មិនទាន់បើកដំណើរការទេ។ ដោយលោក ឆាយសុធិរឬទ្ធា{'     '}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#430a13',
    paddingVertical: 10,
    overflow: 'hidden',
  },
  bannerText: {
    color: 'white',
    fontSize: 14, 
    fontWeight: 'bold',
    paddingHorizontal: 16,
    fontFamily:"Siemreap"
  },
});