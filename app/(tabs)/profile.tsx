import { useState } from "react";
import { useRouter } from "expo-router";
import { View, TextInput, TouchableOpacity, Alert, Text, ActivityIndicator } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

export default function Profile() {
  const { signOut, isSignedIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut();
      if (!isSignedIn) {
        router.replace("/(auth)/login");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to log out. Try again.");
      console.error("❌ Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="w-80 p-6 bg-white rounded-2xl shadow-md">
        <TouchableOpacity
            onPress={handleLogout}
            className= "bg-red-500 py-3 rounded-2xl items-center mt-4">
            <Text className = "text-white font-semibold text-lg">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}