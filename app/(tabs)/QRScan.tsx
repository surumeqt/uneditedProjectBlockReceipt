import { useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function QRScan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.overlay}>
          <View style={styles.scanBox} />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setFacing(facing === "back" ? "front" : "back")}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scanBox: {
    width: 250,
    height: 250,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "white",
    borderWidth: 2,
  },
  button: { alignSelf: "center", backgroundColor: "black", padding: 10, margin: 10 },
  text: { color: "white", fontSize: 16 },
});