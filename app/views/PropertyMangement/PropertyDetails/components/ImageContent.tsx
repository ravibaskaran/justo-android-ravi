import { View, Text, StatusBar, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { BLACK_COLOR, PRIMARY_THEME_COLOR_DARK, WHITE_COLOR } from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Header from "../../../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { normalizeHeight, normalizeSpacing, normalizeWidth } from "../../../../components/scaleFontSize";
import Modal from "react-native-modal";
import FastImages from "app/components/FastImage";
import Button from "app/components/Button";
import { useDispatch } from "react-redux";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import RNFetchBlob from "rn-fetch-blob";
import Share from "react-native-share";



const ImageContent = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const { array, base_url } = route?.params || []
  const [isVisable, setIsVisable] = useState(false)
  const [onPressData, setOnPressData] = useState<any>({})
  const [mediaArr, setMediaArr] = useState<any>([]);

  const dispatch: any = useDispatch()

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onPressShare = async (data: any) => {
    dispatch({ type: START_LOADING });

    const fs = RNFetchBlob.fs;
    // const mediaUrls = data?.map((item: any) => {
    //   return `${base_url}${item?.document}`;
    // });
    const mediaUrls = [`${base_url}${data?.document}`]
    let newArr: any = [];

    const finalUrls = mediaUrls.map((url: any) => {
      let imagePath: any = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", url)
        .then((resp) => {
          imagePath = resp.path();
          return resp.readFile("base64");
        })
        .then(async (base64Data) => {
          await newArr.push(`data:image/png;base64,${base64Data}`);
          setMediaArr(newArr);
          // if (data?.length === newArr.length) {
            const options = {
              title: `${data?.title}`,
              urls: newArr,
            };
            const shareResponse = await Share.open(options).then((res: any) => {
            });
            setMediaArr(null)
            dispatch({ type: STOP_LOADING });
          // }
        }).catch(() => dispatch({ type: STOP_LOADING })
        );
    });
  };
  const onPressShareAll = async (data: any) => {
    dispatch({ type: START_LOADING });

    const fs = RNFetchBlob.fs;
    const mediaUrls = data?.map((item: any) => {
      return `${base_url}${item?.document}`;
    });
    let newArr: any = [];

    const finalUrls = mediaUrls.map((url: any) => {
      let imagePath: any = null;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", url)
        .then((resp) => {
          imagePath = resp.path();
          return resp.readFile("base64");
        })
        .then(async (base64Data) => {
          await newArr.push(`data:image/png;base64,${base64Data}`);
          setMediaArr(newArr);
          if (data?.length === newArr.length) {
            const options = {
              title: `${data?.title}`,
              urls: newArr,
            };
            const shareResponse = await Share.open(options).then((res: any) => {
            });
            setMediaArr(null)
            dispatch({ type: STOP_LOADING });
          }
        }).catch(() => dispatch({ type: STOP_LOADING })
        );
    });
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.imagecontentHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
      />
      <View style={{ flex: 1 }}>
        {typeof array === 'string' ?
          <View style={{ padding: normalizeSpacing(10) }}>

            <Image
              source={{ uri: array }}

              style={{
                width: '100%',
                height: normalizeHeight(300),
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />
          </View> :
          <FlatList data={array}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
            }}
            renderItem={({ item }) => (
              <View style={{ padding: normalizeSpacing(10) }}>
                <TouchableOpacity onPress={() => {
                  setIsVisable(true)
                  setOnPressData(item)
                }}>
                  <FastImages
                    source={{ uri: base_url + item.document }}
                    loaderColor={BLACK_COLOR}
                    style={{
                      width: '100%',
                      height: normalizeHeight(300),
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      onPressShare(item)
                    }}
                    style={styles.shareIconTouch}
                  >
                    <Image
                      source={images.shareIcon}
                      resizeMode={"contain"}
                      style={styles.shareImg}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={{ height: normalizeHeight(100) }} />
            )}
          />}
      </View>
      <View style={{ marginVertical: normalizeSpacing(10) }}>
        <Button
          width={135}
          buttonText={strings.shareFiles}
          handleBtnPress={() => onPressShareAll(array)}
        />
      </View>
      <Modal
        isVisible={isVisable}
        onBackdropPress={() => setIsVisable(false)}
        onBackButtonPress={() => setIsVisable(false)}
        backdropOpacity={0.9}
      >
        <View>
          <FastImages
            source={{ uri: base_url + onPressData?.document }}
            style={{
              width: '100%',
              height: normalizeHeight(300),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ImageContent;
