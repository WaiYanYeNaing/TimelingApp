import React, { useEffect } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import {
  AdMobInterstitial,
  AdMobBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";

export default function Banner() {
  const bannerAdId =
    Platform.OS === "ios"
      ? "ca-app-pub-1101099705395721/1962775244"
      : "ca-app-pub-1101099705395721/4042143673";
  const interstitialAdId =
    Platform.OS === "ios"
      ? "ca-app-pub-1101099705395721/8284447490"
      : "ca-app-pub-1101099705395721/6041427533";
  const rewardAdId =
    Platform.OS === "ios"
      ? "ca-app-pub-1101099705395721/9761180690"
      : "ca-app-pub-1101099705395721/3578915720";

  useEffect(() => {
    async function AD() {
      // await setTestDeviceIDAsync("EMULATOR");
      // await AdMobInterstitial.setAdUnitID(interstitialAdId);
      // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      // await AdMobInterstitial.showAdAsync();
    }
    AD();
  }, []);

  return (
    <View style={styles.adBannerContainer}>
      <AdMobBanner
        bannerSize="banner"
        adUnitID={"ca-app-pub-8645062450812910/3407401624"}
        servePersonalizedAds={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  adBannerContainer: {
    flex: 1,
    alignItems: "center",
  },
});
