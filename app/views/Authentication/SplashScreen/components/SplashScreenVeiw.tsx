import React from "react";
import { Image, StatusBar, View } from "react-native";
import images from "../../../../assets/images";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import styles from "./styles";

const SplashScreenVeiw = () => {
  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle={"light-content"} backgroundColor={PRIMARY_THEME_COLOR} />
      <Image source={images.justoSplash} style={styles.justoImage} />
    </View>
  );
};

export default SplashScreenVeiw;
