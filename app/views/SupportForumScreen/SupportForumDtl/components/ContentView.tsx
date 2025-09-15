import React, { useState } from "react";
import { Image, View } from "react-native";
import images from "../../../../assets/images";
import Loader from "../../../../components/CommonScreen/Loader";
import Header from "../../../../components/Header";
import CustomVideoPlayer from "../../../../components/VideoPlayer";
import strings from "../../../../components/utilities/Localization";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import styles from "./styles";
const ContentView = (props: any) => {
  const [playPause, setPlayPause] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      {props.Visible ? (
        <View style={styles.contentVw}>
          <Header
            leftImageSrc={images.backArrow}
            headerText={strings.supportforumDtlHeader}
            handleOnLeftIconPress={() => {
              props.setIsVisible(false);
              props.setContentData({});
            }}
            headerStyle={styles.headerStyle}
            RightSecondIconStyle={styles.RightFirstIconStyle}
            leftImageIconStyle={styles.RightFirstIconStyle}
            statusBarColor={PRIMARY_THEME_COLOR}
            barStyle={"light-content"}
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {loading ? <Loader /> : null}
            {props?.contentData?.content_type === "video" ? (
              <View style={{ width: "100%" }}>
                <CustomVideoPlayer
                  url={props?.url}
                  content={props?.contentData?.content}
                />
              </View>
            ) : (
              props?.contentData?.content && (
                <Image
                  source={{ uri: props?.url + props?.contentData?.content }}
                  style={styles.contentImgs}
                  resizeMode={"contain"}
                />
              )
            )}
          </View>
        </View>
      ) : null}
    </>
  );
};

export default ContentView;
