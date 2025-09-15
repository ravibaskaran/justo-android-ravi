import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import DropdownInput from "../../../../components/DropDown";
import InputCalender from "../../../../components/InputCalender";
import styles from "../../../../components/Modals/styles";
import {
  DATE_FORMAT,
  Isios,
  ROLE_IDS,
} from "../../../../components/utilities/constant";
import { SearchByTeam } from "../../../../components/utilities/DemoData";
import strings from "../../../../components/utilities/Localization";
import { getUsersListForSiteHead } from "../../../../Redux/Actions/UserManagerActions";
const FilterModal = (props: any) => {
  const today = new Date();
  const yesterday = new Date(today);
  const { userData = {} } = useSelector((state: any) => state.userData);
  const [usersList, setUsersList] = useState<any>([]);
  const [TLusersList, setTLUsersList] = useState<any>([]);
  yesterday.setDate(today.getDate() - 1);
  const data = [
    { label: strings.active, value: 2 },
    { label: strings.inActive, value: 1 },
  ];
  const roleId = userData?.data?.role_id || "";

  const dispatch: any = useDispatch();
  const { response = {}, list = "" } =
    useSelector((state: any) => state.UserManager) || {};

  useEffect(() => {
    if (
      roleId === ROLE_IDS.sitehead_id ||
      roleId === ROLE_IDS.admin_id ||
      roleId === ROLE_IDS.clusterhead_id ||
      roleId === ROLE_IDS.businesshead_id
    ) {
      dispatch(getUsersListForSiteHead({}));
    }
  }, []);
  useEffect(() => {
    let arr: any;
    let TLarr: any;
    if (response?.status === 200) {
      arr = response?.data?.filter(
        (el: any) =>
          el.role_id === ROLE_IDS.sourcingmanager_id ||
          el.role_id === ROLE_IDS.closingmanager_id
      );
      TLarr = response?.data?.filter(
        (el: any) =>
          el.role_id === ROLE_IDS.sourcingtl_id ||
          el.role_id === ROLE_IDS.sourcing_head_id ||
          el.role_id === ROLE_IDS.closingtl_id
      );
      setUsersList(arr);
      if (props?.filterData?.by_team) {
        handleOnChangeByTeam(props?.filterData?.by_team);
      } else {
        setTLUsersList(TLarr);
      }
    } else {
      setUsersList([]);
    }
  }, [response, props?.filterData?.property_id, props.Visible]);
  const handleOnChangeByTeam = (value: any) => {
    let arr = [];
    let TLarr = [];
    if (value === 1) {
      arr = response?.data?.filter(
        (el: any) => el.role_id === ROLE_IDS.sourcingmanager_id
      );
      TLarr = response?.data?.filter(
        (el: any) =>
          el.role_id === ROLE_IDS.sourcingtl_id ||
          el.role_id === ROLE_IDS.sourcing_head_id
      );
    } else if (value === 2) {
      arr = response?.data?.filter(
        (el: any) => el.role_id === ROLE_IDS.closingmanager_id
      );
      TLarr = response?.data?.filter(
        (el: any) =>
          el.role_id === ROLE_IDS.closingtl_id ||
          el.role_id === ROLE_IDS.closing_head_id
      );
    }

    if (props?.filterData?.parent_id) {
      handleParentList(props?.filterData?.parent_id);
    } else {
      setUsersList(arr);
    }
    setTLUsersList(TLarr);
  };
  //   const handleFilter = () => {
  //     props.setIsVisible(false);
  //   };

  const handleParentList = (id: any) => {
    console.log("🚀 ~ file: ReportFilterModal.tsx:97 ~ id:", id);
    let arr = [];
    arr = response?.data?.filter((el: any) => el.parent_id[0] === id);
    console.log("🚀 ~ file: ReportFilterModal.tsx:100 ~ arr:", arr);
    setUsersList(arr);
  };
  return (
    <Modal isVisible={props.Visible}>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        automaticallyAdjustKeyboardInsets={Isios ? true : false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.topTxt}>{strings.filterData}</Text>
            <View>
              <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Image source={images.close} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                placeholderText={strings.startDate}
                headingText={strings.startDate}
                editable={false}
                maximumDate={new Date()}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    startdate: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.startdate}
              />
            </View>
            <View style={styles.inputWrap}>
              <InputCalender
                mode={"date"}
                leftIcon={images.event}
                placeholderText={strings.endDate}
                headingText={strings.endDate}
                editable={false}
                maximumDate={new Date()}
                dateData={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format(DATE_FORMAT),
                  });
                }}
                setDateshow={(data: any) => {
                  props.setFilterData({
                    ...props.filterData,
                    enddate: moment(data).format(DATE_FORMAT),
                  });
                }}
                value={props?.filterData?.enddate}
              />
            </View>

            {roleId === ROLE_IDS.sitehead_id ||
            roleId === ROLE_IDS.admin_id ||
            roleId === ROLE_IDS.clusterhead_id ||
            roleId === ROLE_IDS.businesshead_id ? (
              <View style={[styles.inputWrap]}>
                <DropdownInput
                  headingText={"Search by Property"}
                  placeholder={"Search by Property"}
                  data={props?.propertyListForFilter}
                  inputWidth={"100%"}
                  paddingLeft={16}
                  maxHeight={300}
                  labelField="property_title"
                  valueField={"property_id"}
                  value={props?.filterData?.property_id}
                  onChange={(item: any) => {
                    props.setFilterData({
                      ...props?.filterData,
                      property_id: item.property_id,
                      property_title: item.property_title,
                      user_id: "",
                      parent_id: "",
                      by_team: "",
                    });
                  }}
                  newRenderItem={(item: any) => {
                    return (
                      <>
                        <View style={styles.item}>
                          <Text style={styles.textItem}>
                            {item.property_title}
                          </Text>
                        </View>
                      </>
                    );
                  }}
                />
              </View>
            ) : null}
            {roleId === ROLE_IDS.businesshead_id ? (
              <View style={styles.inputWrap}>
                <DropdownInput
                  headingText={"Search by Cluster name"}
                  placeholder={"Search by Cluster name"}
                  data={props.clusterheadListForFilter}
                  inputWidth={"100%"}
                  paddingLeft={Isios ? 6 : 10}
                  maxHeight={300}
                  labelField="user_name"
                  valueField={"user_id"}
                  // onFocus={() => props.handleEmployeeDropdownPress()}
                  value={props?.filterData?.user_id}
                  onChange={(item: any) => {
                    props.setFilterData({
                      ...props.filterData,
                      user_id: item.user_id,
                    });
                  }}
                  newRenderItem={(item: any) => {
                    return (
                      <View style={styles.item}>
                        <Text style={styles.textItem}>{item?.user_name}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}
            {roleId === ROLE_IDS.sitehead_id ||
            roleId === ROLE_IDS.admin_id ||
            roleId === ROLE_IDS.clusterhead_id ? (
              <View style={styles.inputWrap}>
                <DropdownInput
                  headingText={"Search By Team"}
                  placeholder={"Search By Team"}
                  data={SearchByTeam}
                  inputWidth={"100%"}
                  paddingLeft={Isios ? 6 : 10}
                  maxHeight={300}
                  labelField="label"
                  valueField={"value"}
                  value={props?.filterData?.by_team}
                  onChange={(item: any) => {
                    props.setFilterData({
                      ...props?.filterData,
                      by_team: item.value,
                      user_id: "",
                      parent_id: "",
                    });
                    handleOnChangeByTeam(item.value);
                  }}
                  newRenderItem={(item: any) => {
                    return (
                      <View style={styles.item}>
                        <Text style={styles.textItem}>{item.label}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}
            {roleId === ROLE_IDS.sitehead_id ||
            roleId === ROLE_IDS.admin_id ||
            roleId === ROLE_IDS.clusterhead_id ? (
              <View style={styles.inputWrap}>
                <DropdownInput
                  headingText={"Search by TL name"}
                  placeholder={"Select TL name"}
                  data={TLusersList}
                  inputWidth={"100%"}
                  paddingLeft={Isios ? 6 : 10}
                  maxHeight={300}
                  labelField="user_name"
                  valueField={"user_id"}
                  // onFocus={() => props.handleEmployeeDropdownPress()}
                  value={props?.filterData?.parent_id}
                  onChange={(item: any) => {
                    props.setFilterData({
                      ...props.filterData,
                      parent_id: item.user_id,
                      user_id: "",
                    });
                    handleParentList(item.user_id);
                  }}
                  newRenderItem={(item: any) => {
                    return (
                      <View style={styles.item}>
                        <Text style={styles.textItem}>{item.user_name}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}
            {roleId === ROLE_IDS.sitehead_id ||
            roleId === ROLE_IDS.admin_id ||
            roleId === ROLE_IDS.clusterhead_id ? (
              <View style={styles.inputWrap}>
                <DropdownInput
                  headingText={"Search by Employee name"}
                  placeholder={"Select Employee name"}
                  data={usersList}
                  inputWidth={"100%"}
                  paddingLeft={Isios ? 6 : 10}
                  maxHeight={300}
                  labelField="user_name"
                  valueField={"user_id"}
                  // onFocus={() => props.handleEmployeeDropdownPress()}
                  value={props?.filterData?.user_id}
                  onChange={(item: any) => {
                    props.setFilterData({
                      ...props.filterData,
                      user_id: item.user_id,
                    });
                  }}
                  newRenderItem={(item: any) => {
                    return (
                      <View style={styles.item}>
                        <Text style={styles.textItem}>{item.user_name}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            ) : null}
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                width={135}
                buttonText={strings.reset}
                handleBtnPress={() => {
                  props.onReset();
                  dispatch(getUsersListForSiteHead({}));
                }}
              />
              <Button
                width={135}
                handleBtnPress={() => props.handleFilter()}
                buttonText={strings.apply}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;
