import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Header from "app/components/Header";
import images from "app/assets/images";
import styles from "./styles";
import { PRIMARY_THEME_COLOR } from "app/components/utilities/constant";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "app/components/SearchBar";
import strings from "app/components/utilities/Localization";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import FastImages from "app/components/FastImage";

const PropertyChatView = (props: any) => {
  const { handleBackPress, chatData } = props;
  const navigation: any = useNavigation();
  // const [filteredData, setFilteredData] = useState(chatData);
  const handleChatPress = (item: any) => {
    navigation.navigate("ChatScreen", item);
  };
  const renderPropertyList = (item: any, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleChatPress(item)}
        style={styles.chatListView}
      >
        <View style={styles.straight}>
          <FastImages
            source={{ uri: item.profile }}
            style={styles.profileImage}
          />
          <Text style={styles.userText}>{item?.name}</Text>
        </View>
        <Image source={images.rightArrow} style={styles.iconStyle} />
      </TouchableOpacity>
    );
  };
  const handleChangeText = (val: any) => {
    // const final = chatData.userName?.filter(function (el: any) {
    // const name = `${el}`;
    // return name?.toLowerCase().indexOf(val.toLowerCase()) > -1;
    // });
    // setFilteredData(final);
  };
  const onSubmit = (val: any) => {
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightFirstImageScr={images.notification}
        rightSecondImageScr={images.addCircle}
        headerText={chatData.property}
        leftImageIconStyle={styles.leftImageIconStyle}
        RightSecondIconStyle={styles.RightSecondIconStyle}
        handleOnLeftIconPress={handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <SearchBar
        placeholderText={strings.searchProperty}
        onChangeText={handleChangeText}
        onSubmit={onSubmit}
      />
      <FlatList
        data={chatData?.userChatData}
        renderItem={({item, index}) => renderPropertyList(item, index)}
        ListEmptyComponent={<EmptyListScreen message={strings.user} />}
      />
    </View>
  );
};

export default PropertyChatView;
