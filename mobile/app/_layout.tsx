import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="login" options={{ title: "Login" }} />

        <Stack.Screen name="register" options={{ title: "Register" }} />
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}
