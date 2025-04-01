import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {

    if (!isLoaded || loading) return;

    setLoading(true);

    try {

      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {

        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/home");

      } else {

        console.error(
          "⚠️ Additional steps required:",
          JSON.stringify(signInAttempt, null, 2)
        );

      }
    } catch (err) {
      console.error("❌ Login error:", err);
      Alert.alert("Error Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="w-80 p-6 bg-white rounded-2xl shadow-md">
        <Text className="text-2xl font-semibold mb-4 text-center">Login</Text>
        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-2"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#666666"
          onChangeText={setEmailAddress}
        />
        <TextInput
          className="border border-gray-300 rounded-md p-3 mb-4"
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#666666"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={onSignInPress}
          disabled={loading}
          className="bg-black py-3 rounded-2xl items-center"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">login</Text>
          )}
        </TouchableOpacity>
        <View className="flex-row gap-2 mt-4 justify-center">
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.replace("/signUp")}>
            <Text className="text-blue-500">Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}