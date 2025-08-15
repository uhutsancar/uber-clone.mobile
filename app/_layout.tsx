import { Stack } from "expo-router";
import { ScrollViewStyleReset } from "expo-router/html";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { useEffect } from "react";

import { LogBox } from "react-native";

import { Slot } from "expo-router";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@/lib/auth";

export default function RootLayout() {
  // Prevent the splash screen from auto-hiding before asset loading is complete.
  SplashScreen.preventAutoHideAsync();

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  LogBox.ignoreLogs(["Clerk:"]);

  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(root)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;

// import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
// import { useFonts } from "expo-font";
// import { Stack, Head } from "expo-router";
// import { ScrollViewStyleReset } from "expo-router/html";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";
// import { LogBox, Platform } from "react-native";
// import "react-native-reanimated";

// import { tokenCache } from "@/lib/auth";

// // Splash screen otomatik kapanmasın (fontlar yüklenene kadar)
// SplashScreen.preventAutoHideAsync();

// // Clerk publishable key
// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
// if (!publishableKey) {
//   throw new Error(
//     "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
//   );
// }

// // Clerk ile ilgili logları sustur
// LogBox.ignoreLogs(["Clerk:"]);

// export default function RootLayout() {
//   const [loaded] = useFonts({
//     "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
//     "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
//     "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
//     "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
//     "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
//     Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
//     "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <>
//       {/* Web <head> içeriği */}
//       <Head>
//         <meta charSet="utf-8" />
//         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1, shrink-to-fit=no"
//         />
//         <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
//       </Head>

//       {/* ScrollView reset sadece web’de çalışır */}
//       {Platform.OS === "web" && <ScrollViewStyleReset />}

//       {/* Clerk & Navigation */}
//       <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//         <ClerkLoaded>
//           <Stack>
//             <Stack.Screen name="index" options={{ headerShown: false }} />
//             <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//             <Stack.Screen name="(root)" options={{ headerShown: false }} />
//             <Stack.Screen name="+not-found" />
//           </Stack>
//         </ClerkLoaded>
//       </ClerkProvider>
//     </>
//   );
// }

// const responsiveBackground = `
// body {
//   background-color: #fff;
// }
// @media (prefers-color-scheme: dark) {
//   body {
//     background-color: #000;
//   }
// }`;
