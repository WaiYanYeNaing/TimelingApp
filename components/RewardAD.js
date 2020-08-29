import { Platform } from "react-native";
import { AdMobRewarded } from "expo-ads-admob";

export const RewardAD = async () => {
  const rewardAdId =
    Platform.OS === "ios"
      ? "ca-app-pub-1101099705395721/9761180690"
      : "ca-app-pub-1101099705395721/3578915720";

  await AdMobRewarded.setAdUnitID("ca-app-pub-8645062450812910/9916544626");
  await AdMobRewarded.requestAdAsync();
  await AdMobRewarded.showAdAsync();
};
