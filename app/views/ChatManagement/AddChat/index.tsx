import { View, Text } from "react-native";
import React from "react";
import AddChatView from "./components/AddChatView";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import { getAllUserChatList } from "app/Redux/Actions/ChatActions";
import { useSelector, useDispatch } from "react-redux";

const AddChatScreen = ({ navigation, route }: any) => {
  const isFocused = useIsFocused();

  const { response = {} } = useSelector((state: any) => state.chatData);

  const dispatch: any = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(
        getAllUserChatList({})
      );
      return () => {};
    }, [navigation])
  );
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <AddChatView chatlist={response?.data} handleBackPress={handleBackPress} />
  );
};

export default AddChatScreen;
