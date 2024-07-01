import {
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import { PRIMARY_THEME_COLOR_DARK } from "../../../../components/utilities/constant";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import {
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import { DATA } from "../../../../components/utilities/DemoData";
import Videoplay from "./Videoplay";
import Button from "app/components/Button";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import RNFetchBlob from "rn-fetch-blob";
import { useDispatch } from "react-redux";
import Share from "react-native-share";

const VideoContent = ({ navigation, route }: any) => {
  const dispatch: any = useDispatch();

  const [playerVisible, setPlayerVisible] = useState(false);
  const [itemDetail, setItemDetail] = useState({});
  const [mediaArr, setMediaArr] = useState<any>([]);
  const { videoarray, base_url } = route?.params || [];

  const handleBackPress = () => {
    navigation.goBack();
  };
  const playvideo = (item: any) => {
    setItemDetail(item);
    setPlayerVisible(true);
  };

  const handleSharePress = async (data: any) => {
    dispatch({ type: START_LOADING });

    const fs = RNFetchBlob.fs;
    // const mediaUrls = data?.map((item: any) => {
    //   return `${base_url}${item?.document}`;
    // });
    const mediaUrls = [`${base_url}${data?.document}`];
    let newArr: any = [];

    mediaUrls.map((url: any) => {
      let imagePath: any = null;
      RNFetchBlob.config({
        fileCache: true,
        appendExt : 'mp4'
      })
        .fetch("GET", url)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          // the image path you can use it directly with Image component
          imagePath = resp.path();
          return resp.readFile("base64");
        })
        .then(async (base64Data) => {
          // here's base64 encoded image
          // mediaArr.push();
          // return JSON.stringify(base64Data);
          // remove the file from storage
          await newArr.push(`data:video/mp4;base64,${base64Data}`);
          setMediaArr(newArr);
          // return fs.unlink(imagePath);
          // if (data?.length === newArr.length) {
          const options = {
            title: `${data?.title}`,
            url: `data:video/mp4;base64,${base64Data}`,
            message: 'Check This video',
          };
          await Share.open(options).then((res: any) => {
          }).catch((e)=>{
            console.log('e====>' , e)
          });
          setMediaArr(null);
          dispatch({ type: STOP_LOADING });
          // }
        })
        .catch(() => dispatch({ type: STOP_LOADING }));
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.videocontentHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={videoarray}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            {
              /*  justifyContent: 'center',
          alignItems: 'center' */
            }
          }
          renderItem={({ item }) => (
            <View style={{ padding: 10 }}>
              <Image
                source={{ uri: `${base_url}${item?.video_thumbnail}` }}
                style={{
                  width: "100%",
                  height: normalizeHeight(300),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <View style={styles.playbtntch}>
                <Button
                  width={48}
                  handleBtnPress={() => playvideo(item)}
                  buttonText={strings.playVideo}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  handleSharePress(item);
                }}
                style={styles.shareIconTouch}
              >
                <Image
                  source={images.shareIcon}
                  resizeMode={"contain"}
                  style={styles.shareImg}
                />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ height: normalizeHeight(100) }} />
          )}
        />
      </View>
      {/* <View style={{ marginBottom: 10 }}>
        <Button
          width={135}
          buttonText={strings.shareFiles}
          handleBtnPress={() => handleSharePress(array)}
        />
      </View> */}
      <Videoplay
        Visible={playerVisible}
        setIsVisible={setPlayerVisible}
        itemDetail={itemDetail}
        base_url={base_url}
      />
    </View>
  );
};

export default VideoContent;
