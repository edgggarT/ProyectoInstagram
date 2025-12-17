import { Text } from "react-native";
import { styles } from "./index.style";

export function TextLarge({ text }) {
  return <Text style={styles.text}>{text}</Text>;
}
export function TextMedium({ text }) {
  return <Text style={styles.text2}>{text}</Text>;
}

export function TextSmall({ text, onPress, style }) {
  return (
    <Text
      style={[styles.text3, style]}
      onPress={onPress}
    >
      {text}
    </Text>
  );
}

