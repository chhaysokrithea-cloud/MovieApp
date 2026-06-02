import {
  View, Text, Image, StyleSheet,
  TouchableOpacity, ScrollView, Linking
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, Ionicons } from '@expo/vector-icons';

export default function DetailPage() {
  const router = useRouter();
  const { title, category, telegram } = useLocalSearchParams();

  return (
    <View style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Movie Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri:"https://i.pinimg.com/1200x/a6/c1/f2/a6c1f26974c9c0856f9664c613376aff.jpg"}}
            style={styles.image}
            resizeMode='cover'
          />

          {/* Dark overlay */}
          <View style={styles.overlay} />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <AntDesign name="arrow-left" size={20} color="white" />
          </TouchableOpacity>

          {/* Title on image */}
          <View style={styles.imageTitleBox}>
            <Text style={styles.imageTitle}>{title}</Text>
            <Text style={styles.imageCategory}>អំពីកម្មវិធីនេះ</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>

          {/* Info Row */}
          <View style={styles.infoRow}>
            <View style={styles.infoBadge}>
              <Ionicons name="film-outline" size={20} color="#FF3B5C" />
              <Text style={styles.infoText}>{category}</Text>
            </View>
            <View style={styles.infoBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.infoText}>8.5</Text>
            </View>
            <View style={styles.infoBadge}>
              <Ionicons name="info" size={14} color="#888" />
              <Text style={styles.infoText}>Info of this app</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}> </Text>
          <Text style={styles.description}>
            កម្មវិធីនេះបង្កើតឡើងគ្រាន់តែជាការសាកល្បង Test ដោយប្រើ​ FakeAPI និង
          </Text>
          <Text style={styles.description}>ភាសារដែលប្រើក្នុងកម្មវិធីនេះ React-Native,Javascript,TypeScriptXML</Text>
<Text style={styles.description}>Created By Chhay sothearithea</Text>
<Text style={styles.description}>Design UI By Chhay sothearithea</Text>
<Text style={styles.description}>Ideas of the app By Chhay sothearithea</Text>
          {/* Watch Buttons */}
          <Text style={styles.sectionTitle}>ទំនាក់ទំនង :</Text>

          {/* Telegram Button */}
          <TouchableOpacity
            style={styles.telegramBtn}
            onPress={() => Linking.openURL(telegram || 'https://t.me/')}
          >
            <View style={styles.btnContent}>
              <Ionicons name="paper-plane" size={24} color="white" />
              <View style={styles.btnTextBox}>
                <Text style={styles.btnTitle}>Telegram</Text>
                <Text style={styles.btnSub}>មើលរឿងតាម Telegram</Text>
              </View>
              <AntDesign name="right" size={16} color="rgba(255,255,255,0.5)" />
            </View>
          </TouchableOpacity>

          {/* YouTube Button */}
          <TouchableOpacity
            style={styles.youtubeBtn}
            onPress={() => Linking.openURL('https://youtube.com')}
          >
            <View style={styles.btnContent}>
              <Ionicons name="logo-youtube" size={24} color="white" />
              <View style={styles.btnTextBox}>
                <Text style={styles.btnTitle}>YouTube</Text>
                <Text style={styles.btnSub}>មើលរឿងតាម YouTube</Text>
              </View>
              <AntDesign name="right" size={16} color="rgba(255,255,255,0.5)" />
            </View>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareBtn}>
            <Ionicons name="share-social-outline" size={20} color="white" />
            <Text style={styles.shareBtnText}>ចែករំលែករឿង</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },

  // Image
  imageContainer: {
    height: 400,
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
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  backBtn: {
    position: 'absolute',
    top: 55,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitleBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  imageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  imageCategory: {
    fontSize: 25,
    color: '#FF3B5C',
    marginTop: 4,
    fontFamily:"Siemreap"
  },

  // Content
  content: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  infoText: {
    color: 'white',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  description: {
    color: '#aaa',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },

  // Buttons
  telegramBtn: {
    backgroundColor: '#0088cc',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  youtubeBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  btnTextBox: {
    flex: 1,
  },
  btnTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 14,
    padding: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  shareBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});