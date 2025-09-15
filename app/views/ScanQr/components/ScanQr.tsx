import React, { useRef } from "react";
import { View } from "react-native";
import { Camera } from "react-native-camera-kit";
import images from "../../../assets/images";
import Header from "../../../components/Header";
import { PRIMARY_THEME_COLOR } from "../../../components/utilities/constant";
import strings from "../../../components/utilities/Localization";
import styles from "./styels";

const ScanQrView = (props: any) => {
  const cameraRef = useRef(null);

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.scanQrCode}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        barStyle="light-content"
        statusBarColor={PRIMARY_THEME_COLOR}
      />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Camera
          ref={cameraRef}
          style={{
            flex: 1,
            width: "100%",
          }}
          // enable barcode (QR) scanning
          scanBarcode={true}
          onReadCode={(event: any) => {
            const code = event.nativeEvent.codeStringValue;
            if (code) {
              console.log("QR code scanned:", code);
              props.setAppId(code);
            }
          }}
        />
      </View>
    </View>
  );
};
export default ScanQrView;
