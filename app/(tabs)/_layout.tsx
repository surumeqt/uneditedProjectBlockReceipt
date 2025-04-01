import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function _layout() {
  return (
    <Tabs 
    screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      }}>
      <Tabs.Screen name="home" options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
      }} />
      <Tabs.Screen name="QRScan" options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="qr-code" color={color} size={size} />
      }} />
      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />
      }} />
    </Tabs>
  );
};