import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import Video from "react-native-video";
import styles from "./styles";

const VideoPlayer = (props: any) => {
  const [hideControls, setHideControls] = useState(true);
  return (
    <TouchableWithoutFeedback onPress={() => {setHideControls(!hideControls)}}>
      <Modal isVisible={props.Visible}>
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}></Text>
             <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={styles.borderView} /> */}
          <View style={{ marginHorizontal: 5 }}>
            <Video
              ref={(ref) => {
                this.video = ref;
              }}
              source={{ uri: props?.videoUrl }}
              //poster={item.videos[0].thumbnail}
              // shouldPlay={false}
              repeat
              // onReadyForDisplay={this.loading}
              paused={props.paused}
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
          </View>
          {!hideControls && <View style={styles.playButtonWrap}>
            <TouchableOpacity
              onPress={() => props.handlePlayPause()}
              style={styles.playbutton}
            >
              <Image
                source={props.paused ? images.playbuttonIcon : images.pause}
                style={styles.playicon}
              />
            </TouchableOpacity>
          </View>}
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default VideoPlayer;
