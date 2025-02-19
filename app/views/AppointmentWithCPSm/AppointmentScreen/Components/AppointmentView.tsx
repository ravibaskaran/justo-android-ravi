import Geolocation from "@react-native-community/geolocation";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import EmptyListScreen from "app/components/CommonScreen/EmptyListScreen";
import ErrorMessage from "app/components/ErrorMessage";
import usePermission from "app/components/utilities/UserPermissions";
import {
  RemoveAppointment,
  updateUserAppointmentStatus,
} from "app/Redux/Actions/AppiontmentWithUserActions";
import AppointmentFilterModal from "app/views/AppointMent/AppintMents/components/AppointmentFilterModal ";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View, useWindowDimensions } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import {
  GREEN_COLOR,
  PRIMARY_THEME_COLOR,
  PRIMARY_THEME_COLOR_DARK,
  ROLE_IDS,
  TABBAR_COLOR,
  todayDate,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import AppointmentModal from "./AppointmentModal";
import MyAppointment from "./MyAppointment";
import SmAppointment from "./SmAppointment";
import styles from "./Styles";

const AppointmentView = (props: any) => {
  const dispatch: any = useDispatch();
  const loadingref = false;
  const { userData = {} } = useSelector((state: any) => state.userData);
  const roleId = userData?.data?.role_id || "";
  const layout = useWindowDimensions();
  const navigation: any = useNavigation();
  const [FilterisVisible, setFilterisVisible] = useState(false);
  const [indexData, setIndexData] = useState({
    index: 0,
    routes: [
      {
        key: "first",
        title:
          roleId === ROLE_IDS.sourcingtl_id ||
          roleId === ROLE_IDS.sourcing_head_id
            ? "My Appointment"
            : "Today Appointment",
      },
      {
        key: "second",
        title:
          roleId === ROLE_IDS.sourcingtl_id ||
          roleId === ROLE_IDS.sourcing_head_id
            ? "SM Appointment With CP"
            : "All Appointment",
      },
    ],
  });
  const { response = {}, list = "" } = useSelector(
    (state: any) => state.appointment
  );
  const userEditAppointmentData = useSelector(
    (state: any) => state.userEditAppointmentData
  );

  // For Check the user role id's
  const [visitorList, setVisiitorList] = useState<any>([]);
  const [isVisible, setIsVisible] = useState<any>(false);
  const [lat, setLat] = useState<any>("");
  const [long, setLong] = useState<any>("");
  const [params, setParams] = useState<any>({
    appointment_id: "",
    appointment_status: "",
    remark: "",
    latitude: "",
    longitude: "",
  });
  useEffect(() => {
    if (list) {
      setVisiitorList(response?.data);
    }
  }, [response]);
  useEffect(() => {
    if (userEditAppointmentData?.response?.status === 200) {
      dispatch(RemoveAppointment());
      // navigation.goBack()
      ErrorMessage({
        msg: userEditAppointmentData?.response?.message,
        backgroundColor: GREEN_COLOR,
      });
    }
  }, [userEditAppointmentData]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        setLong(currentLongitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setLat(currentLatitude);
      }
    );
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      props.setFilterData({
        start_date: "",
        end_date: "",
        customer_name: "",
        status: "",
      });
      const isSourcingRole =
        roleId === ROLE_IDS.sourcingtl_id ||
        roleId === ROLE_IDS.sourcing_head_id;

      if (indexData?.index == 1) {
        if (isSourcingRole) {
          props.getAppointmentList(3, {});
        } else {
          props.getAppointmentList(2, {});
        }
      } else {
        if (isSourcingRole) {
          props.getAppointmentList(2, {});
        } else {
          props.getAppointmentList(2, todayDate);
        }
      }
      return () => {};
    }, [
      navigation,
      indexData,
      userEditAppointmentData,
      props.list,
      props.edit,
      props?.route,
    ])
  );

  const handleIndexChange = (index: any) => {
    setIndexData({
      index: index,
      routes: [
        {
          key: "first",
          title:
            roleId === ROLE_IDS.sourcingtl_id ||
            roleId === ROLE_IDS.sourcing_head_id
              ? "My Appointment"
              : "Today Appointment",
        },
        {
          key: "second",
          title:
            roleId === ROLE_IDS.sourcingtl_id ||
            roleId === ROLE_IDS.sourcing_head_id
              ? "SM Appointment With CP"
              : "All Appointment",
        },
      ],
    });
  };
  const handleOptionPress = (id: any, status: any) => {
    console.log("status: ", status);
    setParams({
      ...params,
      appointment_id: id,
      appointment_status: status,
      latitude: status === 3 ? lat : "",
      longitude: status === 3 ? long : "",
      remark: "",
    });

    setIsVisible(true);
  };
  const handleOnPressYesInModal = () => {
    dispatch(updateUserAppointmentStatus(params));
    setIsVisible(false);
  };
  const onPressApply = (type: any) => {
    const isSourcingRole =
      roleId === ROLE_IDS.sourcingtl_id || roleId === ROLE_IDS.sourcing_head_id;
    if (type === "reset") {
      if (indexData?.index == 1) {
        props.getAppointmentList(isSourcingRole ? 3 : 2, {});
      } else {
        props.getAppointmentList(2, {});
      }
    } else {
      if (indexData?.index == 1) {
        if (isSourcingRole) {
          props.getAppointmentList(3, props.filterData);
        } else {
          props.getAppointmentList(2, props.filterData);
        }
      } else {
        props.getAppointmentList(2, props.filterData);
      }
    }
  };
  // const getVisitorsList = (offset: any, array: any) => {
  //   dispatch(
  //     getUserVisitList({
  //       lead_status: 1,
  //     })
  //   );
  // };

  const renderTabBar = (props: any) => (
    <TabBar
      activeColor={TABBAR_COLOR}
      //inactiveColor={'#F4F4F4'}
      {...props}
      indicatorStyle={{ borderWidth: 2, borderColor: TABBAR_COLOR }}
      style={{ backgroundColor: PRIMARY_THEME_COLOR_DARK }}
    />
  );
  const onPressView = (items: any) => {
    navigation.navigate("AppointmentDetails", items);
  };
  const onPressEdit = (items: any) => {
    navigation.navigate("AddAppointmentScreen", {
      data: items,
      type: strings.edit,
    });
  };
  const onPressAddNew = () => {
    navigation.navigate("AddAppointmentScreen", { type: strings.add });
  };

  const onPressReset = (type: any) => {
    console.log("type: ", type);
    if (type === 0) {
      props.setFilterData(todayDate);
      if (indexData?.index == 1) {
        props.getAppointmentList(3, todayDate);
      } else {
        props.getAppointmentList(2, todayDate);
      }
    } else {
      props.setFilterData({
        start_date: "",
        end_date: "",
        customer_name: "",
        status: "",
      });
      if (indexData?.index == 1) {
        props.getAppointmentList(3, {});
      } else {
        props.getAppointmentList(2, {});
      }
    }
  };

  const FirstRoute = () => (
    <View>
      <Text style={styles.count}>
        Count :{" "}
        {props.appointmentList?.length ? props.appointmentList?.length : 0}
      </Text>
      <FlatList
        data={props.appointmentList}
        renderItem={({ item }) => (
          <MyAppointment
            items={item}
            onPressView={(items: any) => onPressView(item)}
            onPressEdit={(items: any) => onPressEdit(item)}
            handleOptionPress={handleOptionPress}
            roleId={roleId}
          />
        )}
        ListEmptyComponent={<EmptyListScreen message={"Today Appointment"} />}
        onRefresh={() => {
          props.setFilterData({
            start_date: "",
            end_date: "",
            customer_name: "",
            status: "",
          });
          props.getAppointmentList(2, todayDate);
        }}
        refreshing={loadingref}
      />
    </View>
  );
  const SecondRoute = () => (
    <View>
      <Text style={styles.count}>
        Count :{" "}
        {props.appointmentList?.length ? props.appointmentList?.length : 0}
      </Text>
      {roleId === ROLE_IDS.sourcingtl_id ||
      roleId === ROLE_IDS.sourcing_head_id ? (
        <FlatList
          data={props.appointmentList}
          renderItem={({ item }) => (
            <SmAppointment
              items={item}
              onPressView={onPressView}
              handleOptionPress={handleOptionPress}
              role={props.role}
              roleId={roleId}
            />
          )}
          ListEmptyComponent={
            <EmptyListScreen message={"SM Appointment With CP"} />
          }
          onRefresh={() => {
            props.setFilterData({
              start_date: "",
              end_date: "",
              customer_name: "",
              status: "",
            });
            props.getAppointmentList(3);
          }}
          refreshing={loadingref}
        />
      ) : (
        <FlatList
          data={props.appointmentList}
          renderItem={({ item }) => (
            <MyAppointment
              items={item}
              onPressView={(items: any) => onPressView(item)}
              onPressEdit={(items: any) => onPressEdit(item)}
              handleOptionPress={handleOptionPress}
              roleId={roleId}
            />
          )}
          ListEmptyComponent={<EmptyListScreen message={"Appointment"} />}
          onRefresh={() => {
            props.setFilterData({
              start_date: "",
              end_date: "",
              customer_name: "",
              status: "",
            });
            props.getAppointmentList(2);
          }}
          refreshing={loadingref}
        />
      )}
    </View>
  );
  const renderScene = ({ index, route }: any) => {
    switch (route.key) {
      case "first":
        return <FirstRoute />;
      case "second":
        return <SecondRoute />;
    }
  };
  const { create } = usePermission({
    create:
      roleId === ROLE_IDS.sourcingtl_id || roleId === ROLE_IDS.sourcing_head_id
        ? "add_appointment_with_sm"
        : "add_appointment_with_cp",
  });

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.menu}
        rightFirstImageScr={indexData?.index == 1 ? images.filter : null}
        rightSecondImageScr={images.notification}
        headerText={
          roleId === ROLE_IDS.sourcingtl_id ||
          roleId === ROLE_IDS.sourcing_head_id
            ? strings.appointmentWithSMHeader
            : strings.appointmentWithCPHeader
        }
        handleOnLeftIconPress={props.handleDrawerPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        handleOnRightFirstIconPress={() => setFilterisVisible(true)}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <View
        style={{
          marginVertical: 10,
          flexDirection: "row",
          justifyContent:
            roleId === ROLE_IDS.sourcingtl_id ||
            roleId === ROLE_IDS.sourcing_head_id
              ? "space-between"
              : "center",
        }}
      >
        {roleId === ROLE_IDS.sourcingtl_id ||
        roleId === ROLE_IDS.sourcing_head_id ? (
          <Button
            width={120}
            height={30}
            buttonText={
              props?.filterData?.start_date === "" ||
              props?.filterData?.end_date === ""
                ? strings.todayApp
                : strings.reset
            }
            btnTxtsize={14}
            handleBtnPress={() => {
              props?.filterData?.start_date === "" ||
              props?.filterData?.end_date === ""
                ? onPressReset(0)
                : onPressReset(1);
            }}
          />
        ) : null}

        {create && (
          <Button
            width={200}
            height={30}
            buttonText={strings.addNewappointment}
            btnTxtsize={14}
            handleBtnPress={() => onPressAddNew()}
          />
        )}
      </View>
      <View style={styles.propertyListView}>
        <TabView
          renderTabBar={renderTabBar}
          initialLayout={{ width: layout.width }}
          navigationState={indexData}
          renderScene={({ index, route }: any) => renderScene({ index, route })}
          onIndexChange={handleIndexChange}
        />
      </View>
      <AppointmentFilterModal
        Visible={FilterisVisible}
        setIsVisible={setFilterisVisible}
        params={params}
        setParams={setParams}
        onPressApply={onPressApply}
        type={"appWith"}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
      />
      <AppointmentModal
        Visible={isVisible}
        setIsVisible={setIsVisible}
        params={params}
        setParams={setParams}
        onPressApply={onPressApply}
        type={"appWith"}
        setFilterData={props.setFilterData}
        filterData={props.filterData}
        handleOnPressYesInModal={handleOnPressYesInModal}
      />
    </View>
  );
};

export default AppointmentView;
