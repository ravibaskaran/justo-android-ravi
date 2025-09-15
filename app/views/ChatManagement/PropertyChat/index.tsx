import React from "react";
import PropertyChatView from "./components/PropertyChatView";

const PropertyChat = ({ navigation, route }: any) => {
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <PropertyChatView
      chatData={route.params}
      handleBackPress={handleBackPress}
    />
  );
};

export default PropertyChat;
