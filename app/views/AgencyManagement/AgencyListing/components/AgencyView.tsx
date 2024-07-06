import { View, Text, StatusBar, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AgencyListItem from "./AgencyListItem";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../../components/Header";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import FilterModal from "./AgencyFilterModel";
import { PRIMARY_THEME_COLOR_DARK } from "../../../../components/utilities/constant";

import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import { TouchableOpacity } from "react-native-gesture-handler";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import { useSelector } from "react-redux";
import { normalizeWidth } from "app/components/scaleFontSize";
import usePermission from "app/components/utilities/UserPermissions";
import AddPropertyModel from "app/components/Modals/AddPropertyModel";

const AgencyView = (props: any) => {
  const loadingref = false;
  const [isVisible, setIsVisible] = useState(false);
  const [newVisitor, setNewVisitor] = useState(false);
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const { userData = {} } = useSelector((state: any) => state.userData);
  const navigation: any = useNavigation();
  const onPressView = () => {
    navigation.navigate("AgencyDetails");
  };
  const ShowPendinglist = () => {
    navigation.navigate("PendingAgencyList");
  };
  const onPressAddnewAgency = () => {
    navigation.navigate("AddnewAgency", { type: "add" });
  };
  const onPressAllow = () => {
    navigation.navigate("AllowAgencyListing");
  };
  const onRefresh = () => {
    props.setFilterData({
      startdate: "",
      enddate: "",
      search_by_name: "",
      search_by_location: "",
      mobile_no: "",
      rera_no: "",
      status: "",
    });
    props.getAgencyList(0, {});
  };
  const onReset = () => {
    props.setFilterData({
      startdate: "",
      enddate: "",
      search_by_name: "",
      search_by_location: "",
      mobile_no: "",
      rera_no: "",
      status: "",
    });
    setFilterisVisible(false);
    props.getAgencyList(0, {});
  };

  const { create, approve, allocate } = usePermission({
    create: "add_channelpartner",
    approve: "approve_new_channelpartner",
    allocate: "allocate_property_channelpartner",
  });

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={images.filter}
        rightSecondImageScr={images.notification}
        headerText={strings.agencyHeader}
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View style={styles.propertyListView}>
        <Text style={styles.count}>
          Count : {props?.agentList?.length ? props?.agentList?.length : 0}
        </Text>
        <View style={styles.btnView}>
          {/* Add New Cp */}
          {create && (
            <TouchableOpacity
              onPress={() => onPressAddnewAgency()}
              style={[
                styles.button,
                {
                  borderColor: BLACK_COLOR,
                  backgroundColor: PRIMARY_THEME_COLOR,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    color: WHITE_COLOR,
                  },
                ]}
              >
                {strings.addnewAgency}
              </Text>
            </TouchableOpacity>
          )}

          {approve && (
            <TouchableOpacity
              onPress={() => ShowPendinglist()}
              style={[
                styles.button,
                {
                  borderColor: BLACK_COLOR,
                  backgroundColor: PRIMARY_THEME_COLOR,
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    color: WHITE_COLOR,
                  },
                ]}
              >
                {strings.pendingconfirm}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {allocate && (
          <View style={styles.btnView1}>
            <TouchableOpacity
              onPress={() => onPressAllow()}
              style={[
                styles.button,
                {
                  borderColor: BLACK_COLOR,
                  backgroundColor: PRIMARY_THEME_COLOR,
                  width: normalizeWidth(180),
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    color: WHITE_COLOR,
                  },
                ]}
              >
                {strings.AllocateRequest}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* {userData?.data?.role_title !== 'Sourcing Manager' ?
          (<View style={styles.btnView1}>
            <TouchableOpacity
              onPress={() => onPressAllow()}
              style={[
                styles.button,
                {
                  borderColor: BLACK_COLOR,
                  backgroundColor: PRIMARY_THEME_COLOR,
                  width: normalizeWidth(180),
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonTxt,
                  {
                    color: WHITE_COLOR,
                  },
                ]}
              >
                {strings.AllocateRequest}
              </Text>
            </TouchableOpacity>
          </View>)
          : null
        } */}
        <View style={styles.propertyListViewsec}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Array.isArray(props?.agentList) ? props?.agentList : []}
            ListEmptyComponent={<EmptyListScreen message={strings.agency} />}
            renderItem={({ item }) => (
              <AgencyListItem
                items={item}
                setIsVisible={setIsVisible}
                onPressView={props.onPressView}
                setChangeStatus={props.setChangeStatus}
                setNewVisitor={setNewVisitor}
                openAllocatePropertyModal={props.openAllocatePropertyModal}
                onAddEmployeeButtonPress={props.onAddEmployeeButtonPress}
                onPressSeeEmployee={props.onPressSeeEmployee}
              />
            )}
            onEndReached={() => {
              if (props?.agentList?.length < props?.moreData) {
                props.getAgencyList(
                  props?.agentList?.length > 6 ? props.offSET + 1 : 0,
                  props.filterData
                );
              }
            }}
            refreshing={loadingref}
            onRefresh={() => onRefresh()}
          />
        </View>
      </View>
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        stringshow={strings.confirmation}
        textshow={`${strings.deactivconfirmation} ${strings.cpCapital}?`}
        confirmtype={"CONFIRMATION"}
        setStatusChange={props.setChangeStatus}
        handleYesResponse={() => props.handleStatusChange(props.changeStatus)}
      />
      <ConfirmModal
        Visible={newVisitor}
        setIsVisible={setNewVisitor}
        stringshow={strings.confirmation}
        textshow={`${strings.deactivconfirmation} ${strings.cpCapital}?`}
        confirmtype={"CONFIRMATION"}
        setStatusChange={props.setChangeStatus}
        handleYesResponse={() => props.onPressDeactivates(props.changeStatus)}
      />
      <FilterModal
        getAgencyList={props.getAgencyList}
        onReset={onReset}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
      />
      <AddPropertyModel
        isVisible={props.isPropertyVisible}
        setIsVisible={props.setIsPropertyVisible}
        handleSearch={props.handleSearch}
        finalPropertyList={props.finalPropertyList}
        handleSelects={props.handleSelects}
        handleDelete={props.handleDelete}
        selectedProperty={props.selectedProperty}
        handleAllocateProperty={props.handleAllocateProperty}
      />
    </View>
  );
};

export default AgencyView;
