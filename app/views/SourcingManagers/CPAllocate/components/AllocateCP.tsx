import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import Header from "../../../../components/Header";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
  WHITE_COLOR
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import AllocateCPDetails from "./AllocateDetails";
import styles from "./styles";

const AllocateCPView = (props: any) => {
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

  const renderItem = (item: any, index: any) => {
    const getSelected =
      props?.selectedCp?.length === 0
        ? ""
        : props?.selectedCp?.map(({ user_name }: any) => user_name);
    return (
      <View key={index} style={styles.innerBoxVwlist}>
        <Text style={styles.innerBoxVwlistfont}>{item.user_name}</Text>
        <TouchableOpacity
          onPress={() =>
            !getSelected?.toString()?.includes(item.user_name)
              ? props.handleSelects(item)
              : console.log("")
          }
          style={styles.checkBoxVw}
        >
          {/* <Image
          style={styles.checksVw}
          source={
            getSelected?.toString()?.includes(item.user_name)
              ? images.check
              : null
          }
        /> */}
          {getSelected?.toString()?.includes(item.user_name) ? (
            <Image style={styles.checksVw} source={images.check} />
          ) : (
            <View style={styles.checksVw}></View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

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
      <ScrollView style={styles.containerVw}>
        <Text style={styles.headerTxt}>{strings.newAllocateTxt}</Text>
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
                    <Text style={{ maxWidth: "90%" }}>{item.user_name}</Text>
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
            <Text style={styles.noSelectedTxt}>{strings.noCpSelected}</Text>
          )}
        </View>
        <TextInput
          placeholder={strings.search}
          placeholderTextColor={BLACK_COLOR}
          style={styles.searchInputVw}
          onFocus={() => props.setAllList(true)}
          onChangeText={(text: any) => props.handleSearch(text)}
        />
        {props.allList ? (
          props.cpList?.length > 0 ? (
            <View style={{ flex: 1 ,marginBottom:10}}>
              {props.cpList?.map((item: any, index: any) =>
                renderItem(item, index)
              )}
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Text style={[styles.noSelectedTxt, { textAlign: "center" }]}>
                {strings.noCpFound}
              </Text>
            </View>
          )
        ) : null}
      </ScrollView>
      <View style={styles.btncontener}>
        <Button
          width={150}
          height={40}
          btnTxtsize={16}
          buttonText={strings.cpAllocation}
          textTransform={null}
          disabled={props.cpList.length === 0}
          handleBtnPress={() => props.handleCpAllocatePress()}
        />
      </View>
      <AllocateCPDetails
        Visible={props.CPDetails}
        setIsVisible={props.setCPDetails}
        handleAddTarget={() => props.setCPDetails(false)}
      />
      {/* <AddTargetModal
        Visible={props.isVisible}
        setIsVisible={props.setIsVisible}
        targetForm={props.targetForm}
        setTargetForm={props.setTargetForm}
        handleAddTarget={props.handleAddTarget}
      /> */}
    </View>
  );
};
export default AllocateCPView;
