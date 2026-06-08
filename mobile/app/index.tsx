import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SasyaVana</Text>

      <Link href="/login" style={styles.link}>
        Login
      </Link>

      <Text>{'\n'}</Text>

      <Link href="/register" style={styles.link}>
        Register
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
  },
  link: {
    color: 'blue',
    fontSize: 18,
  },
});