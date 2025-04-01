import { useState, useRef, useEffect } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import ViewShot from "react-native-view-shot";
import ReceiptView from "@/components/ReceiptView";

export default function QRScan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [scannedData, setScannedData] = useState<{ companyName: string; receiptContents: string } | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const captureRef = useRef<ViewShot | null>(null);
  const saveReceipt = useMutation(api.receiptDetails.createReceiptDetails);
  const [viewShotReady, setViewShotReady] = useState(false);
  const [viewShotInstance, setViewShotInstance] = useState<ViewShot | null>(null);

  useEffect(() => {
    setViewShotReady(!!scannedData);
  }, [scannedData]);

  if (!permission) return <View />;
  if (!permission.granted)
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );

  const handleScan = async ({ data }: { data: string }) => {
    try {
      const parsedData = JSON.parse(data); // Ensure POS QR code outputs JSON
      if (!parsedData.companyName || !parsedData.receiptContents) throw new Error("Invalid QR data");

      setScannedData(parsedData);

      // Save to Convex
      await saveReceipt({
        userId: "user-id-placeholder", // Replace with actual logged-in user ID
        companyName: parsedData.companyName,
        receiptContents: parsedData.receiptContents,
      });

      Alert.alert("Success", "Receipt saved successfully!");
    } catch (error) {
      console.error("QR Scan Error:", error);
      Alert.alert("Error", "Invalid QR code format.");
    }
  };

  const captureReceipt = async () => {
    try {
      if (!viewShotInstance) {
        console.warn("ViewShot instance is not initialized yet.");
        return;
      }

      if (captureRef.current) {
        Alert.alert("Receipt Image Saved!", `Image saved at:`);
        console.log("Receipt saved at:");
      } else {
        console.warn("ViewShot ref is not initialized yet.");
      }

      Alert.alert("Receipt Image Saved!", `Image saved at:`);
      console.log("Receipt saved at:");
    } catch (error) {
      console.error("Error capturing receipt:", error);
      Alert.alert("Error", "Failed to save receipt image.");
    }
  };

  return (
    <View style={styles.container}>
      {!scannedData ? (
        <CameraView style={styles.camera} facing={facing} onBarcodeScanned={handleScan}>
          <TouchableOpacity style={styles.button} onPress={() => setFacing(facing === "back" ? "front" : "back")}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </CameraView>
      ) : (
        <View>
            <ViewShot ref={captureRef} style={styles.receiptContainer}>
              <ReceiptView companyName={scannedData.companyName} receiptContents={scannedData.receiptContents} />
            </ViewShot>
            <Button title="Save as Image" onPress={captureReceipt} disabled={!viewShotReady}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  message: { textAlign: "center", paddingBottom: 10 },
  camera: { flex: 1 },
  button: { alignSelf: "center", backgroundColor: "black", padding: 10, margin: 10 },
  text: { color: "white", fontSize: 16 },
  receiptContainer: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
});