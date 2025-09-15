import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Video from "react-native-video";
import { useDispatch } from "react-redux";
import images from "../../../../assets/images";
import styles from "../../../../components/Modals/styles";
import strings from "../../../../components/utilities/Localization";

const Videoplay = (props: any) => {
  const dispatch: any = useDispatch();
  return (
    <View>
      <Modal isVisible={props.Visible}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.playVideo}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 5 }}>
            {props.itemDetail?.document_type === "video" ? (
              <Video
                ref={(ref) => {
                  this.video = ref;
                }}
                source={{ uri: props?.base_url + props.itemDetail?.document }}
                //poster={item.videos[0].thumbnail}
                // shouldPlay={false}
                repeat
                // onReadyForDisplay={this.loading}
                //paused={this.state.stop ? true : this.state.paused}
                //isLooping
                resizeMode="contain"
                // posterResizeMode={"contain"}
                style={{
                  height: 500,
                  width: "100%",
                }}
                selectedVideoTrack={{
                  type: "resolution",
                  value: 480,
                }}
              />
            ) : (
              props.itemDetail?.document && (
                <Image
                  source={{
                    uri:
                      props.itemDetail?.base_url + props.itemDetail?.document,
                  }}
                />
              )
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Videoplay;
