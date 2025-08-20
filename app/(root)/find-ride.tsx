import RideLayout from "@/components/RideLayout";
import { useLocationStore } from "@/store";
import { Text, View } from "react-native";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationAddress,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout>
      <Text className="text-2xl">You are here: {userAddress}</Text>
        <Text className="text-2xl">You are going to: {destinationAddress}</Text>
    </RideLayout>
  );
};
export default FindRide;
