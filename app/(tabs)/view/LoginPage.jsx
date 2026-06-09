import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient';
SplashScreen.preventAutoHideAsync();

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    'Siemreap': require('../../../assets/font/Siemreap.ttf'),
    'Montserrat-Bold': require('../../../assets/font/Montserrat-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  //Login with fakeapi------  User : emilys ------- Pass : emilyspass
 const handleLogin = async () => {
    setError('');
    // if field emtpy
    if (!email || !password) {
      setError('Please fill in all fields!');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password: password,
          expiresInMins: 30,
        }),
      });
      const data = await response.json();
      console.log('Status:', response.status);
      console.log('Data:', data);
      // DummyJSON returns 400 for wrong password
      if (response.status === 400) {
        throw new Error('Wrong username or password!');
      }
      if (response.status === 401) {
        throw new Error('Unauthorized! Invalid credentials!');
      }
      if (response.status === 404) {
        throw new Error('User not found!');
      }
      // Check if message exists in response (error from API)
      if (data.message) {
        throw new Error(data.message);
      }
      // Check if token exists
      if (!data.accessToken) {
        throw new Error('Login failed! Please try again!');
      }
      //sucess navigate to FoodApp!
      console.log('Login Success!');
      console.log('Token:', data.accessToken);
      console.log('User:', data.firstName, data.lastName);
      router.replace('/view/Appmovie');
    } catch (err) {
      setError(err.message);
      console.log(' Error:', err.message);
    } finally {
      setLoading(false);
    }
 
  }

  return (
    <View style={styles.main} onLayout={onLayoutRootView}>
      <LinearGradient 
      start={{x:3,y:0}}
      end={{x:-3,y:0}}
      colors={['#FFF4B8','#FFE02E']}
      >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* Logo */}
        <View style={styles.logoRow}>
          <Text style={styles.logoImage}>Logo Here</Text>
          <Text style={styles.logoText}>Name Company</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Title */}
          <Text style={styles.headerTitle}>Sign in to your account</Text>
          <Text style={styles.subtitle}>Enter your email and password to login</Text>

          {/* Error */}
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color="#FF4D4D" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={18} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="imnew@gmail.com"
              placeholderTextColor="rgba(0,0,0,0.3)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={18} color="#999" />
            <TextInput
              style={styles.input}
              placeholder="imnew2233@"
              placeholderTextColor="rgba(0,0,0,0.3)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={18}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Forget Password */}
          <TouchableOpacity style={styles.forgetBtn}>
            <Text style={styles.forgetText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginBtn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginBtnText}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons Row 1 */}
          <View style={styles.socialRow}>

            {/* Google */}
            <TouchableOpacity style={styles.socialBtn}>
          <Image
          source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/250px-Google_%22G%22_logo.svg.png"}}
          style={{width:20,height:20}}
          />
          <Text style={styles.socialText}>Goggle</Text>
            </TouchableOpacity>

            {/* Facebook */}
            <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#1877F2' }]}>
              <Ionicons name="logo-facebook" size={19} color="white" style={{left:5}} />
              <Text style={[styles.socialText, { color: 'white' }]}>Facebook</Text>
            </TouchableOpacity>

          </View>

          {/* Social Buttons Row 2 */}
          <View style={styles.socialRow}>

            {/* Apple */}
            <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#000' }]}>
              <Ionicons name="logo-apple" size={18} color="white" />
              <Text style={[styles.socialText, { color: 'white' }]}>Apple</Text>
            </TouchableOpacity>

            {/* TikTok */}
            <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#010101' }]}>
              <Ionicons name="logo-tiktok" size={18} color="white" />
              <Text style={[styles.socialText, { color: 'white' }]}>TikTok</Text>
            </TouchableOpacity>

          </View>

          {/* Register */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Dont have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/view/RegisterPage')}>
              <Text style={styles.registerLink}>Sign Up</Text>
            </TouchableOpacity>
        
          </View>

        </View>
        
      </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  // Logo
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
  },

  // Card
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    marginHorizontal: 16,
    padding: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  headerTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    color: '#111',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 10,
    color: '#999',
    marginBottom: 19,
    fontFamily: 'Montserrat-Bold',
  },

  // Error
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF4D4D',
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 13,
    flex: 1,
  },

  // Input
  label: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 10,
    color: '#333',
    paddingVertical: 12,
    fontFamily: 'Montserrat-Bold',
  },

  // Forget
  forgetBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgetText: {
    color: '#6C63FF',
    fontSize: 13,
    fontFamily: 'Montserrat-Bold',
  },

  // Login Button
  loginBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#0d00ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },

  // Divider
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE',
  },
  dividerText: {
    color: '#999',
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
  },

  // Social
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  socialIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EA4335',
  },
  socialText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
  },

  // Register
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  registerText: {
    color: '#999',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  registerLink: {
    color: '#6C63FF',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
});