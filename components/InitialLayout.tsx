import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments, Slot } from "expo-router";
import { useEffect } from "react";

export default function InitialLayout() {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {

        if (!isLoaded) return;

        const inAuthScreen = segments[0] === "(auth)";

        if ( !isSignedIn && !inAuthScreen) router.replace("/(auth)");
        else if (isSignedIn && inAuthScreen) router.replace("/(tabs)/home");

    }, [isLoaded, isSignedIn, segments]);

    return <Stack screenOptions={{ headerShown: false }}/>;
}