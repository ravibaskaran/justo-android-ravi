import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import styles from './Styles';
import Modal from "react-native-modal";
import images from 'app/assets/images';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-media-console';


const CustomVideoPlayer = (props: any) => {
  const [hideControls, setHideControls] = useState(true);

  return (
    <View style={{
      width: '100%',
      height: '100%',
    }}>
      <VideoPlayer
        source={{ uri: props?.url + props?.content }}
        navigator={props.navigator}
        repeat={true}
        disableVolume={true}
        disableBack={true}
        fullscreenOrientation='landscape'
        fullscreenAutorotate={true}
        isFullscreen={true}
        toggleResizeModeOnFullscreen={true}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  )
}

export default CustomVideoPlayer