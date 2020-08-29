import React, { useEffect } from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import {
  AdMobInterstitial,
  AdMobBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import Container from "../components/Container";

export default function Test() {
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
      // await AdMobRewarded.setAdUnitID(rewardAdId);
      // await AdMobRewarded.requestAdAsync();
      // await AdMobRewarded.showAdAsync();
    }
    AD();
  }, []);

  return (
    <Container style={styles.container}>
      <View style={styles.adBannerContainer}>
        <AdMobBanner
          bannerSize="banner"
          adUnitID={"ca-app-pub-2526265253172070/8718248686"}
          servePersonalizedAds={false}
          style={styles.adBanner}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  adBannerContainer: {
    alignItems: "center",
  },
  adBanner: {},
});
