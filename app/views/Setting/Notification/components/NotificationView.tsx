import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import Header from "../../../../components/Header";
import {
  PRIMARY_THEME_COLOR
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import { notificationRemove } from "../../../../Redux/Actions/NotificationAction";
import styles from "./styles";

const NotificationView = (props: any) => {
  const dispatch: any = useDispatch();
  const { onPressBack, data } = props;
  const { response = [] } =
    useSelector((state: any) => state.notificationData) || [];
  const deleteNotificationData =
    useSelector((state: any) => state.deleteNotificationData) || {};
  const [listData, setListData] = useState<any>([]);

  useEffect(() => {
    if (response?.status === 200) {
      if (response?.data?.length > 0) {
        setListData(response?.data);
      }
    } else {
      setListData([]);
    }
  }, [response]);
  useEffect(() => {
    if (deleteNotificationData?.response?.status === 200 || deleteNotificationData?.response?.status === 201) {
      dispatch(notificationRemove());
      // ErrorMessage({
      //   msg: deleteNotificationData?.response?.message,
      //   backgroundColor: GREEN_COLOR,
      // });
      if (deleteNotificationData?.response?.data?.length > 0) {
        setListData(deleteNotificationData?.response?.data);
      } else {
        setListData([]);
      }
    }
  }, [deleteNotificationData]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (item: any) => {
    // closeRow(rowMap, item["key"] = i + 1);
    // const newData = [...listData];
    // const prevIndex = listData.findIndex((item: any) => item.key === rowKey);
    // newData.splice(prevIndex, 1);
    // setListData(newData);
    props.handleDeleteNotification(item?._id);
  };

  const renderItem = (data: any) => {
    const { subject = "", message = "", createdDate = "" } = data?.item;
    return (
      <View style={styles.rowFront}>
        <View>
          <Text style={styles.subjectText}>{subject}</Text>
          <Text style={styles.messageText}>{message}</Text>
        </View>
        <TouchableOpacity
          style={styles.backRightBtn}
          onPress={() => deleteRow(data?.item)}
        >
          <Image
            source={images.deleteIcon}
            style={styles.trashIconVw}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <View style={styles.timeShwVw}>
          <Text style={styles.timeText}>{moment(createdDate).calendar()}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.notificationHeader}
        headerStyle={styles.headerStyle}
        leftImageSrc={images.backArrow}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      {/* <SwipeListView
          data={listData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={75}
          rightOpenValue={-75}
          disableRightSwipe={true}
          ListEmptyComponent={<EmptyListScreen message={strings.notificationHeader} />}
        /> */}
      <FlatList
removeClippedSubviews={false}
        data={Array.isArray(listData) ? listData : []}
        renderItem={renderItem}
        onRefresh={props.getNotification}
        refreshing={false}
        ListEmptyComponent={
          <EmptyListScreen message={strings.notificationHeader} />
        }
      />
    </View>
  );
};

export default NotificationView;
