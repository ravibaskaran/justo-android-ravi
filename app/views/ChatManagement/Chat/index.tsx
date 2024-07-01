import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  getAllUserChatList,
  getRecentChatList,
} from "app/Redux/Actions/ChatActions";
import React, { useEffect, useLayoutEffect } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ChatView from "./components/ChatView";

const ChatViewScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();

  const { response = {} } = useSelector(
    (state: any) => state.recentChatListData
  );

  const dispatch: any = useDispatch();

  const handleGetRecentChatList = () => {
    dispatch(getRecentChatList({}));
  };

  useFocusEffect(
    React.useCallback(() => {
      handleGetRecentChatList();
      return () => {};
    }, [navigation])
  );

  const handleDrawerPress = () => {
    Keyboard.dismiss()
    navigation.toggleDrawer();
  };
  return (
    <>
      <ChatView
        chatlist={response?.data}
        handleDrawerPress={handleDrawerPress}
        handleGetRecentChatList={handleGetRecentChatList}
      />
    </>
  );
};

export default ChatViewScreen;
