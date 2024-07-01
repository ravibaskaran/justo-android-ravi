import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";

const FastImages = (props: any) => {
  const [isLoading, setIsLoading] = useState(false)
  const { source = {
    uri: "https://unsplash.it/400/400?image=1",
    headers: { Authorization: "someAuthToken" },
    priority: FastImage.priority.normal,
  }, style } = props;
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ?
        (<View style={{ position: 'absolute', zIndex: 999999 }}>
          <ActivityIndicator
            color={props.loaderColor ? props.loaderColor : '#fff'}
          />
        </View>)
        : null
      }
      <FastImage
        style={style}
        source={source}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

export default FastImages;
