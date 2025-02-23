import { Link } from "expo-router";
import { SafeAreaView, Text, Image, View } from "react-native";

const LogoImg = require("../assets/images/DALL·E-Photoroom.png");

export default function Index() {
  return (
    <SafeAreaView
      className="bg-slate-800"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Image source={LogoImg} className="w-48 h-48 mb-8" />

      {/* Başlık */}
      <Text className="font-bold text-5xl text-white text-center mb-8">
        Welcome to StudyBuddy
      </Text>

      {/* Bağlantılar */}
      <View className="space-y-4">
        <Link
          className="bg-blue-500 font-bold px-6 py-3 rounded-lg w-48 text-center text-white m-5"
          href="/register"
        >
          Register
        </Link>

        <Link
          className="bg-green-500 font-bold px-6 py-3 rounded-lg w-48 text-center text-white m-5"
          href="/login"
        >
          Login
        </Link>

        <Link
          className="bg-purple-500 font-bold px-6 py-3 rounded-lg w-48 text-center text-white m-5"
          href="/summary"
        >
          Summary
        </Link>
        <Link 
          className="bg-red-400 font-bold px-6 py-3 rounded-lg w-48 text-center text-white m-5"
          href="/MainMenu"
        >
          Main Menu
        </Link>
      </View>
    </SafeAreaView>
  );
}
