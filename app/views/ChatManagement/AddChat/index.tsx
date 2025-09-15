import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserChatList } from "../../../Redux/Actions/ChatActions";
import AddChatView from "./components/AddChatView";

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
