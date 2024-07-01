import { View, Text, Share } from "react-native";
import React from "react";
import SeparateLinkView from "./components/SeparateLinkView";
import { useSelector } from "react-redux";

const SeparateLinkScreen = ({ navigation, route }: any) => {
  const { response = {} } =
    useSelector((state: any) => state.dashboardData) || {};
  const handleBackPress = () => {
    navigation.goBack();
  };
  const options = {
    title: 'QR',
    url: '',
  };
  const onSharePress = async (customOptions = options) => {
    try {
      await Share.share(customOptions);
    } catch (err) {
    }
  };
  return (
    <SeparateLinkView
      data={route.params}
      handleBackPress={handleBackPress}
      response={response?.data}
      onSharePress={onSharePress}
    />
  );
};

export default SeparateLinkScreen;
