import React, { useState } from 'react';
import { View } from 'react-native';
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