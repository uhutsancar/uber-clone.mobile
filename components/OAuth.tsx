import { useOAuth, useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";
import { useEffect } from "react";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { isSignedIn } = useAuth(); // Clerk session state

  // 🔑 Eğer kullanıcı giriş yaptıysa otomatik olarak home’a yönlendir
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(root)/(tabs)/home");
    }
  }, [isSignedIn]);

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.success) {
      Alert.alert("Success", "Login successful! Redirecting...");
      return; // yönlendirme useEffect ile yapılacak
    }

    if (result.code === "session_exists") {
      Alert.alert("Success", "Session exists. Redirecting...");
      return; // yönlendirme yine useEffect ile yapılacak
    }

    Alert.alert("Error", result.message);
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
