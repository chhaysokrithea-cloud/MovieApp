import {
  View, Text, Image, StyleSheet,
  TouchableOpacity, ScrollView, Linking, Share
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function DetailPage() {
  const router = useRouter();
  const { title, category, telegram } = useLocalSearchParams();

  // Share function
  async function handleShare() {
    try {
      await Share.share({
        message: `🎬 Check out this app: AhnaJak\nDownload now and enjoy movies!\n📱 Contact: t.me/@chhaysorithea`,
        title: 'AhnaJak App',
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.main}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        {/* Movie Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://i.pinimg.com/1200x/a6/c1/f2/a6c1f26974c9c0856f9664c613376aff.jpg" }}
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
            <Text style={styles.imageTitle}>{title || 'Jakaphub Rerng'}</Text>
            <Text style={styles.imageCategory}>អំពីកម្មវិធីនេះ</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>

          {/* Info Badges */}
          <View style={styles.infoRow}>
            <View style={styles.infoBadge}>
              <Ionicons name="film-outline" size={14} color="#FF3B5C" />
              <Text style={styles.infoText}>{category || 'App'}</Text>
            </View>
            <View style={styles.infoBadge}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.infoText}>4.8 Rating</Text>
            </View>
            <View style={styles.infoBadge}>
              <Ionicons name="phone-portrait-outline" size={14} color="#888" />
              <Text style={styles.infoText}>v1.0.0</Text>
            </View>
          </View>

          {/* About App */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>អំពីកម្មវិធី ចក្រភពរឿង</Text>
            <Text style={styles.description}>
              កម្មវិធីនេះបង្កើតឡើងគ្រាន់តែជាការសាកល្បង Test
              ដោយប្រើ FakeAPI និងភាសាដែលប្រើក្នុងកម្មវិធីនេះ
              React-Native, Javascript, TypeScript។
            </Text>
            <Text style={styles.description}>
              គោលបំណងរបស់កម្មវិធីនេះ គឺដើម្បីផ្តល់ភាពងាយស្រួល
              ក្នុងការស្វែងរក និងទស្សនារឿងភាគ និងភាពយន្តជាច្រើន
              ដែលអ្នកចូលចិត្ត។
            </Text>
          </View>

          {/* Tech Stack */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ភាសាក្នុងដែលប្រើក្នុងកម្មវិធីនេះរួមមាន : </Text>
            <View style={styles.techGrid}>
              <View style={styles.techBadge}>
                <Text style={styles.techText}> React Native</Text>
              </View>
              <View style={styles.techBadge}>
                <Text style={styles.techText}> JavaScript</Text>
              </View>
              <View style={styles.techBadge}>
                <Text style={styles.techText}> TypeScript</Text>
              </View>
              <View style={styles.techBadge}>
                <Text style={styles.techText}>Javascript xml</Text>
              </View>
              <View style={styles.techBadge}>
                <Text style={styles.techText}> Fake API</Text>
              </View>
              <View style={styles.techBadge}>
                <Text style={styles.techText}> CSS/StyleSheet</Text>
              </View>
            </View>
          </View>

          {/* Developer Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact here :</Text>
            <View style={styles.devCard}>
              <View style={styles.devAvatar}>
                <Text style={styles.devAvatarText}>C</Text>
              </View>
              <View style={styles.devInfo}>
                <Text style={styles.devName}>Chhay Sothearakrithea</Text>
                <Text style={styles.devRole}>React Native Developer</Text>
                <Text style={styles.devSchool}> Asia Euro University — Year 2</Text>
              </View>
            </View>
          </View>

          {/* Contact Section */}
          <Text style={styles.sectionTitle}>ទំនាក់ទំនង</Text>

          {/* Telegram */}
          <TouchableOpacity
            style={styles.telegramBtn}
            onPress={() => Linking.openURL('https://t.me/chhaysorithea')}
          >
            <View style={styles.btnContent}>
              <View style={[styles.btnIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="paper-plane" size={22} color="white" />
              </View>
              <View style={styles.btnTextBox}>
                <Text style={styles.btnTitle}>Telegram</Text>
                <Text style={styles.btnSub}>@chhaysorithea</Text>
              </View>
              <AntDesign name="right" size={16} color="rgba(255,255,255,0.5)" />
            </View>
          </TouchableOpacity>

          {/* Facebook */}
          <TouchableOpacity
            style={styles.facebookBtn}
            onPress={() => Linking.openURL('https://facebook.com')}
          >
            <View style={styles.btnContent}>
              <View style={[styles.btnIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="logo-facebook" size={22} color="white" />
              </View>
              <View style={styles.btnTextBox}>
                <Text style={styles.btnTitle}>Facebook</Text>
                <Text style={styles.btnSub}>Chhay Sorithea</Text>
              </View>
              <AntDesign name="right" size={16} color="rgba(255,255,255,0.5)" />
            </View>
          </TouchableOpacity>

          {/* YouTube */}
          <TouchableOpacity
            style={styles.youtubeBtn}
            onPress={() => Linking.openURL('https://youtube.com')}
          >
            <View style={styles.btnContent}>
              <View style={[styles.btnIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="logo-youtube" size={22} color="white" />
              </View>
              <View style={styles.btnTextBox}>
                <Text style={styles.btnTitle}>YouTube</Text>
                <Text style={styles.btnSub}>Chhay sothearithea</Text>
              </View>
              <AntDesign name="right" size={16} color="rgba(255,255,255,0.5)" />
            </View>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity
            style={styles.emailBtn}
            onPress={() => Linking.openURL('mailto:support@ahnajak.com')}
          >
            <View style={styles.btnContent}>
              <View style={[styles.btnIcon, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Ionicons name="mail" size={22} color="white" />
              </View>
              <View style={styles.btnTextBox}>
                <Text style={styles.btnTitle}>Email</Text>
                <Text style={styles.btnSub}>chhaysokrithea@gmail.com</Text>
              </View>
              <AntDesign name="right" size={16} color="rgba(255,255,255,0.5)" />
            </View>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="white" />
            <Text style={styles.shareBtnText}>ចែករំលែកកម្មវិធី</Text>
          </TouchableOpacity>

          {/* Legal */}
          <View style={styles.legalBox}>
            <TouchableOpacity style={styles.legalRow}>
              <MaterialIcons name="privacy-tip" size={16} color="#666" />
              <Text style={styles.legalText}>Privacy Policy</Text>
              <AntDesign name="right" size={12} color="#444" />
            </TouchableOpacity>
            <View style={styles.legalDivider} />
            <TouchableOpacity style={styles.legalRow}>
              <MaterialIcons name="description" size={16} color="#666" />
              <Text style={styles.legalText}>Terms of Service</Text>
              <AntDesign name="right" size={12} color="#444" />
            </TouchableOpacity>
          </View>

          {/* Copyright */}
          <View style={styles.copyrightBox}>
            <Text style={styles.copyrightIcon}>©</Text>
            <Text style={styles.copyright}>
              Copyright © 2026 Jakapub Rerng{'\n'}
              All Rights Reserved · Jakaphub Rerng App{'\n'}
              Made in Cambodia
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },

  // Image
  imageContainer: {
    height: 380,
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
    height: '40%',
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  backBtn: {
    position: 'absolute',
    top: 55,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 42,
    height: 42,
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
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  imageCategory: {
    fontSize: 15,
    color: '#FF3B5C',
    marginTop: 4,
    fontFamily: 'Siemreap',
  },

  // Content
  content: {
    padding: 20,
  },

  // Info Row
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: '#222',
  },
  infoText: {
    color: 'white',
    fontSize: 12,
  },

  // Section
  section: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    fontFamily: 'Siemreap',
  },
  description: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 22,
    marginBottom: 8,
    fontWeight:"bold",
    fontFamily: 'Siemreap',
  },

  // Tech Grid
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  techText: {
    color: '#aaa',
    fontSize: 12,
    fontFamily:"Montserrat-Bold"
  },

  // Developer Card
  devCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  devAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FF3B5C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  devAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  devInfo: {
    flex: 1,
  },
  devName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 3,
  },
  devRole: {
    fontSize: 13,
    color: '#FF3B5C',
    marginBottom: 3,
  },
  devSchool: {
    fontSize: 12,
    color: '#666',
  },

  // Buttons
  telegramBtn: {
    backgroundColor: '#0088cc',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  facebookBtn: {
    backgroundColor: '#1877F2',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  youtubeBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  emailBtn: {
    backgroundColor: '#FF3B5C',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  btnIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTextBox: {
    flex: 1,
    fontFamily:"Montserrat-Bold"
  },
  btnTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily:"Montserrat-Bold"
  },
  btnSub: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
    fontFamily: 'Montserrat-Bold',
  },

  // Share
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
    marginBottom: 20,
  },
  shareBtnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Siemreap',
  },

  // Legal
  legalBox: {
    backgroundColor: '#111',
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1a1a1a',
    overflow: 'hidden',
  },
  legalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  legalText: {
    flex: 1,
    color: '#aaa',
    fontSize: 14,
  },
  legalDivider: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginHorizontal: 14,
  },

  // Copyright
  copyrightBox: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  copyrightIcon: {
    fontSize: 28,
    color: '#333',
  },
  copyright: {
    color: '#444',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: 'Siemreap',
  },
});