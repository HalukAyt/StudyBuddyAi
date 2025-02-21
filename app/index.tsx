import { Link } from "expo-router";
import { Text, View } from "react-native";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold text-lg my-10">Welcome to StudyBuddy</Text>
      <Link  href="/signIn">Sign In</Link>
      <Link  href="/profile">Profile</Link>
      <Link  href="/summary">Summary</Link>
      <Link  href="/property/1">Property</Link>
    </View>
  );
}
