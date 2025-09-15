import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import ConfirmModal from "../../../../components/Modals/ConfirmModal";
import {
  ROLE_IDS
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import FilterModal from "./AgencyFilterModel";
import AgencyListItem from "./AgencyListItem";
import styles from "./styles";

import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import EmptyListScreen from "../../../../components/CommonScreen/EmptyListScreen";
import AddPropertyModel from "../../../../components/Modals/AddPropertyModel";
import { normalizeWidth } from "../../../../components/scaleFontSize";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import usePermission from "../../../../components/utilities/UserPermissions";

const AgencyView = (props: any) => {
  const loadingref = false;
  const [isVisible, setIsVisible] = useState(false);
  const [newVisitor, setNewVisitor] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const { userData = {} } = useSelector((state: any) => state.userData);
  const [status, setStatus] = useState(false);
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
        <Text style={styles.count}>Count : {props?.moreData}</Text>
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
        {allocate &&
          userData?.data?.role_id !== ROLE_IDS.sourcingmanager_id && (
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
                  Allocate CP to SM
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
removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
            data={Array.isArray(props?.agentList) ? props?.agentList : []}
            ListEmptyComponent={<EmptyListScreen message={strings.agency} />}
            renderItem={({ item }) => (
              <AgencyListItem
                items={item}
                setIsVisible={setIsVisible}
                setStatus={setStatus}
                setIsVerify={setIsVerify}
                onPressView={props.onPressView}
                setChangeStatus={props.setChangeStatus}
                setNewVisitor={setNewVisitor}
                openAllocatePropertyModal={props.openAllocatePropertyModal}
                onAddEmployeeButtonPress={props.onAddEmployeeButtonPress}
                onPressSeeEmployee={props.onPressSeeEmployee}
                userData={userData}
              />
            )}
            onEndReached={() => {
              if (props?.agentList?.length < props?.moreData) {
                props.getAgencyList(
                  props?.agentList?.length >= 5 ? props.offSET + 1 : 0,
                  props.filterData
                );
              }
            }}
            refreshing={loadingref}
            onRefresh={() => onRefresh()}
          />
        </View>
      </View>
      {/* NO LEAD CP */}
      <ConfirmModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        stringshow={strings.confirmation}
        textshow={
          status
            ? `${strings.deactivconfirmation} ${strings.cpCapital}?`
            : `${strings.activeconfirmation} ${strings.cpCapital}?`
        }
        confirmtype={"CONFIRMATION"}
        setStatusChange={props.setChangeStatus}
        handleYesResponse={() => props.handleStatusChange(props.changeStatus)}
      />
      <ConfirmModal
        Visible={newVisitor}
        setIsVisible={setNewVisitor}
        stringshow={strings.confirmation}
        textshow={
          status
            ? `${strings.deactivconfirmation} ${strings.cpCapital}?`
            : `${strings.activeconfirmation} ${strings.cpCapital}?`
        }
        confirmtype={"CONFIRMATION"}
        setStatusChange={props.setChangeStatus}
        handleYesResponse={() => props.onPressDeactivates(props.changeStatus)}
      />

      <ConfirmModal
        Visible={isVerify}
        setIsVisible={setIsVerify}
        stringshow={strings.confirmation}
        textshow={`Are you sure you want to verify this ${strings.cpCapital}?`}
        confirmtype={"CONFIRMATION"}
        setStatusChange={props.setChangeStatus}
        handleYesResponse={() => props.onPressVerify(props.changeStatus)}
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
