import ErrorMessage from "app/components/ErrorMessage";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  View
} from "react-native";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import {
  normalizeHeight
} from "../../../../components/scaleFontSize";
import {
  GRAY_LIGHT_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  RED_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";


const CatalogueContent = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();

  const {array, base_url} = route?.params || [];

  const [mediaArr, setMediaArr] = useState<any>([]);

  const dispatch: any = useDispatch()
  const handleBackPress = () => {
    navigation.goBack();
  };

  const OpenDoc = async (url: any) => {
    function getUrlExtension(url: any) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }
    const extension = getUrlExtension(url);

    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then((e) => {
        console.log('e', e)
        // success
      })
      .catch((error) => {
        // error
        ErrorMessage({
          msg: error?.message,
          backgroundColor: RED_COLOR
        })
      });
  };

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: PRIMARY_THEME_COLOR_DARK,
          height: insets.top,
        }}
      />
      <StatusBar barStyle={"light-content"} />
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.cataloguecontentHeader}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
      />
      <View style={{flex: 1}}>
        <FlatList
          data={array}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            {
              /*  justifyContent: 'center',
          alignItems: 'center' */
            }
          }
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                borderColor: GRAY_LIGHT_COLOR,
                borderWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => OpenDoc(`${base_url}${item?.document}`)}
              >
                <Image
                  //source={item.image}
                  source={images.pdfIcone}
                  style={{
                    width: "100%",
                    height: normalizeHeight(300),
                    //margin: normalizeSpacing(5),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ height: normalizeHeight(100) }} />
          )}
        />
      </View>
      {/* <View style={{ marginBottom: normalizeSpacing(10) }}>
        <Button
          width={135}
          handleBtnPress={() => onPressShare(array)}
          buttonText={strings.shareFiles}
        />
      </View> */}
    </View>
  );
};

export default CatalogueContent;
