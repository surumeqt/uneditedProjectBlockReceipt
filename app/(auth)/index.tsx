import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-4xl font-bold text-black">Welcome 👋</Text>
      
      <Text className="text-lg text-gray-600 mt-2 text-center">
        Discover a seamless experience with our app.
      </Text>

      <TouchableOpacity 
        onPress={() => router.push('/signUp')} 
        className="mt-6 bg-black px-6 py-3 rounded-2xl shadow-lg active:scale-95" >
          <Text className="text-white text-xl font-semibold">Get Started</Text> 
      </TouchableOpacity>
    </View>
  );
}
