import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import images from "../../../../assets/images";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import FastImages from "../../../../components/FastImage";
import Header from "../../../../components/Header";
import SearchBar from "../../../../components/SearchBar";
import { PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const AddChatView = (props: any) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const compare = (a: any, b: any) => {
    if (a?.user_name < b?.user_name) {
      return -1;
    }
    if (a?.user_name > b?.user_name) {
      return 1;
    }
    return 0;
  };
  useEffect(() => {
    setFilteredData(props?.chatlist?.sort(compare));
    setSearchVal("");
  }, [props.chatlist]);
  const navigation: any = useNavigation();
  const handleChatPress = (item: any) => {
    navigation.navigate("ChatScreen", item);
  };
  const handleChangeText = (val: any) => {
    setSearchVal(val);
    const final = props?.chatlist?.filter(function (el: any) {
      const name = `${el.user_name}`;
      return name?.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
    setFilteredData(final);
  };
  const onSubmit = (val: any) => {};
  const renderChatList = (item: any) => {
    const role =
      item?.roles_slug === "sourcing_tl"
        ? "TL"
        : item?.roles_slug === "sourcing_manager"
        ? "SM"
        : item?.roles_slug === "closing_manager"
        ? "CM"
        : item?.roles_slug === "closing_tl"
        ? "CTL"
        : item?.roles_slug === "channel_partner"
        ? "CP"
        : item?.roles_slug === "receptionist"
        ? "Recp"
        : item?.roles_slug === "cp_agent"
        ? "Agent"
        : item?.roles_slug === "post_sales"
        ? "PS"
        : item?.roles_slug === "site_head"
        ? "SHD"
        : item?.roles_slug === "cluster_head"
        ? "CH"
        : item?.roles_slug === "call_center"
        ? "CC"
        : item?.roles_slug === "super_admin"
        ? "SA"
        : "";

    return (
      <TouchableOpacity
        onPress={() => handleChatPress(item)}
        style={styles.chatListView}
      >
        <View style={styles.straight}>
          <FastImages
            source={{ uri: item.base_url + "/" + item.profile_picture }}
            style={styles.profileImage}
          />
          <Text
            style={styles.propertyText}
          >{`${item.user_name} (${role})`}</Text>
        </View>
        <Image source={images.rightArrow} style={styles.iconStyle} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.addChatHeader}
        leftImageIconStyle={styles.RightFirstIconStyle}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <SearchBar
        placeholderText={strings.searchChat}
        onChangeText={handleChangeText}
        value={searchVal}
        onSubmit={onSubmit}
      />
      <FlatList
removeClippedSubviews={false}
        data={filteredData}
        renderItem={(item) => renderChatList(item.item)}
        ListEmptyComponent={<EmptyListScreen message={strings.chat} />}
        keyboardShouldPersistTaps={'handled'}
      />
    </View>
  );
};

export default AddChatView;
