import { View, Text } from "react-native";
import ViewShot from "react-native-view-shot";

interface ReceiptViewProps {
  companyName: string;
  receiptContents: string;
}

export default function ReceiptView({ companyName, receiptContents }: ReceiptViewProps) {
  return (
    <ViewShot>
      <View style={{ backgroundColor: "white", padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{companyName}</Text>
        <Text>{receiptContents}</Text>
      </View>
    </ViewShot>
  );
}
