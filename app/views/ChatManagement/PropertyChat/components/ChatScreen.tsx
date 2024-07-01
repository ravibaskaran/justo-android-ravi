import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Actions,
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import styles from "./styles";
import Header from "app/components/Header";
import images from "app/assets/images";
import {
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
  WHITE_COLOR_LIGHT,
} from "app/components/utilities/constant";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import DocumentPicker from "react-native-document-picker";

const ChatScreen = ({ navigation, route }: any) => {
  const item = route.params || {};
  const [messages, setMessages] = useState<any>([]);
  const [pickerVisible, setPickerVisible] = useState<any>();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderMessage = (data: any) => {
    return (
      <View style={{ backgroundColor: "red" }}>
        <Text>kskjdvj</Text>
      </View>
    );
  };
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            borderTopRightRadius: 15,
            backgroundColor: PRIMARY_THEME_COLOR,
            // marginBottom: 30,
          },
          left: {
            borderTopLeftRadius: 15,
            backgroundColor: WHITE_COLOR,
            // marginBottom: 30,
          },
        }}
        // containerToPreviousStyle={{
        //   right: { borderTopRightRadius: 15 },
        //   left: { borderTopLeftRadius: 15 },
        // }}
        // containerToNextStyle={{
        //   right: { borderTopRightRadius: 15 },
        //   left: { borderTopLeftRadius: 15 },
        // }}
        // containerStyle={{
        //   right: { borderTopRightRadius: 15 },
        //   left: { borderTopLeftRadius: 15 },

        // }}
      />
    );
  };
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendIconView}>
          <Image
            source={images.send}
            resizeMode={"contain"}
            style={styles.sendImage}
          />
        </View>
      </Send>
    );
  };

  const handleAttachPress = async () => {
    const result = await DocumentPicker.pick();
    setMessages([{image: result[0].uri, user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any",
    }}, ...messages,])
    // setMessages((previousMessages: any) =>
    //   GiftedChat.append(previousMessages,[...messages, {image: result[0].uri, user: {
    //     _id: 1,
    //     name: "React Native",
    //     avatar: "https://placeimg.com/140/140/any",
    //   }}])
    // );
    renderMessage(result)
  };
  const renderComposer = (props: any) => {
    return (
      <View style={styles.attachIconView}>
        <Composer {...props} />
        <TouchableOpacity onPress={() => handleAttachPress()}>
          <Image
            source={images.attach}
            // resizeMode={"contain"}
            style={styles.attachIconImage}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={(messages: any) => onSend(messages)}>
          <Image
            source={images.send}
            // resizeMode={"contain"}
            style={styles.attachIconImage}
          />
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderImageMessage = (data: any) => {
    return (
      <View>
        <Image />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        // rightFirstImageScr={images.filter}
        // rightSecondImageScr={images.notification}
        headerText={item.name}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
        }}
        alwaysShowSend
        showUserAvatar
        renderBubble={(data: any) => renderBubble(data)}
        // renderMessageImage={(props: any) => {
        //   return renderImageMessage(props)
        //   // return (
        //   //   <Image source={images.agency} style={{height: 30, width: 30}}/>
        //   // );
        // }}
        renderInputToolbar={(props: any) => {
          return (
            <InputToolbar
              primaryStyle={styles.chatPrimaryInputStyle}
              containerStyle={styles.chatContainerInputStyle}
              {...props}
            />
          );
        }}
        renderSend={renderSend}
        renderComposer={renderComposer}
      />
    </View>
  );
};

export default ChatScreen;
