import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export default function SignUp() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const onSignUpPress = async () => {
        if (!isLoaded) return;

        try {
            await signUp.create({ emailAddress, password });
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setPendingVerification(true);
        } catch (err) {
            console.error("❌ Sign-Up Error:", err);
            Alert.alert("Error", "Sign-up failed. Try again.");
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded || loading) return;
        setLoading(true);
        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace("/(tabs)/home");
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
                setLoading(false);
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
            Alert.alert("Error", "Verification Failed");
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-gray-100">
            {pendingVerification ? (
                <View className="w-80 p-6 bg-white rounded-2xl shadow-md">
                    <Text className="text-2xl font-semibold mb-4 text-center">Verify your email</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mb-4"
                        value={code}
                        placeholder="Enter your verification code"
                        onChangeText={setCode}
                    />
                    <TouchableOpacity
                        onPress={onVerifyPress}
                        disabled={loading}
                        className="bg-blue-500 py-3 rounded-2xl items-center"
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text className="text-white font-semibold text-lg">Verify</Text>
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="w-80 p-6 bg-white rounded-2xl shadow-md">
                    <Text className="text-1xl font-light mb-4 text-center">Don't have an Account ?</Text>
                    <Text className="text-2xl font-semibold mb-4 text-center">Sign up</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mb-2"
                        value={emailAddress}
                        placeholder="Enter email"
                        onChangeText={setEmailAddress}
                    />
                    <TextInput
                        className="border border-gray-300 rounded-md p-3 mb-4"
                        value={password}
                        placeholder="Enter password"
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity
                        onPress={onSignUpPress}
                        className="bg-black py-3 rounded-2xl items-center"
                    >
                        <Text className="text-white font-semibold text-lg">Continue</Text>
                    </TouchableOpacity>
                    <View className="flex-row gap-2 mt-4 justify-center">
                        <Text>Have an account?</Text>
                        <TouchableOpacity onPress={() => router.push('/login')}>
                            <Text className="text-blue-500">Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}