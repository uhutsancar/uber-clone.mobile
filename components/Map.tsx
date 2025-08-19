// import { Text, View } from "react-native";
// import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
// const Map = () => {
//   // const region = {}

//   return (
//     <MapView
//       provider={PROVIDER_DEFAULT}
//       className="w-full h-full rounded-2xl"
//       tintColor="black"
//       mapType="mutedStandard"
//       showsPointsOfInterest={false}
//       //  initialRegion={region}
//       showsUserLocation={true}
//       userInterfaceStyle="light"
//     >
//       <Text className="">Map</Text>
//     </MapView>
//   );
// };
// export default Map;

import { View, Platform } from "react-native";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  // const region = {
  //   latitude: 40.2194432,
  //   longitude: 28.9865728,
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01,
  // };

  return (
    <View className="flex-1">
      <MapView
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        className="w-full h-full"
        mapType={Platform.OS === "ios" ? "mutedStandard" : "standard"}
        showsPointsOfInterest={false}
        showsUserLocation={true}
        userInterfaceStyle="light"
        // initialRegion={region}
      />
    </View>
  );
};

export default Map;
