import FastImages from "app/components/FastImage";
import React from "react";
import { View, Text, Image, StatusBar } from "react-native";
import images from "../../../../assets/images";
import { PRIMARY_THEME_COLOR, WHITE_COLOR } from "../../../../components/utilities/constant";
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
