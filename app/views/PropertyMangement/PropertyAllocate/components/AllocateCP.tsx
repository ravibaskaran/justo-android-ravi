import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import images from "../../../../assets/images";
import Header from "../../../../components/Header";
import { Checkbox } from "react-native-paper";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  GREEN_COLOR,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
  ROLE_IDS,
  WHITE_COLOR,
} from "../../../../components/utilities/constant";
import styles from "./styles";
import Button from "../../../../components/Button";
import strings from "../../../../components/utilities/Localization";
import AllocateCPDetails from "./AllocateDetails";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ErrorMessage from "app/components/ErrorMessage";
import { useNavigation } from "@react-navigation/native";
import AddTargetModal from "app/components/Modals/AddTargetModal";

const AllocateCPView = (props: any) => {
  const { userData = {} } = useSelector((state: any) => state.userData);

  const navigation: any = useNavigation();
  const { response = {}, allocated } =
    useSelector((state: any) => state.propertyData) || [];
  // useEffect(() => {
  //     if(response.status === 200) {
  //       ErrorMessage({
  //         msg: response.message,
  //         backgroundColor: GREEN_COLOR
  //       })
  //     } else {
  //       ErrorMessage({
  //         msg: response.message,
  //         backgroundColor: RED_COLOR
  //       })
  //     }
  //   }, [allocated])

  useEffect(() => {
    let ordersData = props?.selectedCp?.map((data: any) => {
      return data?._id;
    });
    props.setSelectedLoginIdCp(ordersData);
  }, [props.selectedCp]);

  return (
    <View style={styles.mainContainer}>
      <Header
        headerText={strings.allocation}
        headerStyle={styles.headerStyle}
        headerTextStyle={styles.headerTextStyle}
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        RightSecondIconStyle={{ tintColor: WHITE_COLOR }}
        leftImageIconStyle={{ tintColor: WHITE_COLOR }}
        handleOnLeftIconPress={props.onPressBack}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView>
      <View style={styles.containerVw}>
        <Text style={styles.headerTxt}>
          {userData?.data?.role_title === "Sourcing TL"
            ? "Allocate to New SM"
            : userData?.data?.role_title === "Closing TL"
            ? "Allocate to New CM"
            : strings.newAllocateTxt}
        </Text>
        <View style={styles.selectedBox}>
          {props?.selectedCp?.length > 0 ? (
            <>
              {props?.selectedCp?.map((item: any, index: any) => {
                /*    var arrayLoginID: any[] = [...props.selectedLoginIdCp];
                                    
                                    arrayLoginID.push(item?._id);
                                    props.setSelectedLoginIdCp(arrayLoginID);  */

                //props.setSelectedLoginIdCp([...props.selectedLoginIdCp,item._id])

                return (
                  <View
                    style={[
                      styles.innerBoxVw,
                      { justifyContent: "flex-start" },
                    ]}
                  >
                    <Text style={styles.userNameTxt}>
                      {item.user_name}
                      </Text>
                    <TouchableOpacity
                      onPress={() => props.handleDelete(item, index)}
                    >
                      <Image source={images.close} style={styles.crossVw} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          ) : (
            <Text style={styles.noSelectedTxt}>
              {userData?.data?.role_title === "Sourcing TL"
                ? "No SM Selected"
                : userData?.data?.role_title === "Closing TL"
                ? "Allocate to New CM"
                : strings.noCpSelected}
            </Text>
          )}
        </View>
        <TextInput
          placeholder={strings.searchByName}
          placeholderTextColor={BLACK_COLOR}
          style={styles.searchInputVw}
          onFocus={() => props.setAllList(true)}
          onChangeText={(text: any) => props.handleSearch(text)}
        />
        <View
          style={{
            flex: 5,
          }}
        >
          {props.allList ? (
            <FlatList
              //   contentContainerStyle={{}}
              data={props.cpList}
              // data={response?.data}
              renderItem={({ item, index }: any) => {
                const getSelected =
                  props?.selectedCp?.length === 0
                    ? ""
                    : props?.selectedCp?.map(({ user_name }: any) => user_name);
                return (
                  <View style={styles.innerBoxVwlist}>
                    <Text style={styles.innerBoxVwlistfont}>
                      {item.user_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        !getSelected?.toString()?.includes(item.user_name)
                          ? props.handleSelects(item)
                          : console.log("")
                      }
                      style={styles.checkBoxVw}
                    >
                      {getSelected?.toString()?.includes(item.user_name) ? <Image
                        style={styles.checksVw}
                        source={images.check}
                      /> :
                       <View style={styles.checksVw}></View>}
                    </TouchableOpacity>
                  </View>
                );
              }}
              ListEmptyComponent={() => {
                return (
                  <Text style={[styles.noSelectedTxt, { textAlign: "center" }]}>
                    {userData?.data?.role_title === "Sourcing TL"
                      ? "No SM Found"
                      : userData?.data?.role_title === "Closing TL"
                      ? "No CM Found"
                      : strings.noCpFound}
                  </Text>
                );
              }}
            />
          ) : null}
        </View>
      </View>

      </ScrollView>
        <View style={styles.btncontener}>
          <Button
            width={150}
            height={40}
            btnTxtsize={16}
            buttonText={
              userData?.data?.role_title === "Sourcing TL"
                ? "SM Allocation"
                : userData?.data?.role_title === "Closing TL"
                ? "CM Allocation"
                : strings.cpAllocation
            }
            textTransform={null}
            handleBtnPress={() => props.handleSmAllocationPress()}
          />
        </View>

      <AllocateCPDetails
        Visible={props.CPDetails}
        setIsVisible={props.setCPDetails}
        handleAddTarget={() => props.setCPDetails(false)}
      />
      {userData?.data?.role_id !== ROLE_IDS.sourcingmanager_id ? (
        <AddTargetModal
          Visible={props.isVisible}
          setIsVisible={props.setIsVisible}
          targetForm={props.targetForm}
          setTargetForm={props.setTargetForm}
          handleAddTarget={props.handleAddTarget}
        />
      ) : null}
    </View>
  );
};
export default AllocateCPView;
