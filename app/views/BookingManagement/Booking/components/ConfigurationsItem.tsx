import { normalize } from "@rneui/themed";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import DropdownInput from "app/components/DropDown";
import InputField from "app/components/InputField";
import PicturePickerModal from "app/components/Modals/PicturePicker";
import Styles from "app/components/Modals/styles";
import { RequiredStart } from "app/components/utilities/GlobalFuncations";
import strings from "app/components/utilities/Localization";
import apiEndPoints from "app/components/utilities/apiEndPoints";
import {
  JW_LOGIN,
  JW_PASSWORD,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
} from "app/components/utilities/constant";
import { apiCallJW } from "app/components/utilities/httpClient";
import React, { useEffect, useState } from "react";
import { Keyboard, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button";
import styles from "./styles";

const ConfigurationsItem = (props: any) => {
  const [maininventory, setMainInventory] = useState<any>([]);
  const [floors, setFloors] = useState<any>([]);
  const dispatch: any = useDispatch();
  const [flatTypes, setFlatTypes] = useState<any>([]);
  const [inventory, setInventory] = useState<any>([]);
  const [updateState, setUpdateState] = useState(0);

  const setcofigdataFlat = (item: any, index: any) => {
    var filteredData = maininventory.filter(
      (itemget: any) => itemget["Flat Type"] == item
    );
    const tempFloors = new Set(filteredData.map((el: any) => el["Floor"]));
    setFloors(Array.from(tempFloors));
  };
  useEffect(() => {
    handleGetInventoryList();
  }, [
    props?.flatBooking?.flat_name,
    props?.flatBooking?.flat_type,
    props?.flatBooking?.floor,
  ]);

  const handleGetInventoryList = async () => {
    const params = {
      params: {
        login: JW_LOGIN,
        password: JW_PASSWORD,
        project: props?.getBookingData?.jw_project_id,
        type: props?.flatBooking?.flat_type
          ? props?.flatBooking?.flat_type
          : "",
      },
    };

    dispatch({ type: START_LOADING });
    try {
      const res = await apiCallJW(
        "post",
        apiEndPoints.GET_INVENTORY_JW,
        params
      );
      if (res?.data?.result?.data.length > 0) {
        const temp = res?.data?.result?.data;
        const arr = temp;
        maininventory.length === 0 ? setMainInventory(temp) : null;
        let filteredData = [];
        if (flatTypes.length === 0) {
          const tempFlatType = new Set(temp.map((el: any) => el["Flat Type"]));
          setFlatTypes(Array.from(tempFlatType));
        }
        const tempFloors = new Set(temp.map((el: any) => el["Floor"]));
        setFloors(Array.from(tempFloors));

        if (props?.flatBooking.floor) {
          filteredData = temp.filter(
            (item: any) => item["Floor"] == props?.flatBooking.floor
          );
          setInventory(filteredData);
        } else {
          setInventory(arr);
        }
      } else {
        dispatch({ type: STOP_LOADING });
      }
    } catch (e) {
    } finally {
      dispatch({ type: STOP_LOADING });
    }
  };

  return (
    <View>
      <View style={styles.flatContainer}>
        <View style={styles.sectionContainer}>
          <View style={[styles.inputContainer, { marginRight: 20 }]}>
            <InputField
              disableSpecialCharacters={true}
              require={true}
              placeholderText={"Amount"}
              onChangeText={(data: any) => {
                props.flatBooking.booking_amount = data;
                setUpdateState(updateState + 1);
              }}
              valueshow={props?.flatBooking?.booking_amount}
              keyboardtype={"number-pad"}
              headingText={"Amount"}
            />
          </View>
          <View style={styles.inputContainer}>
            <DropdownInput
              require={true}
              headingText={"Payment Type"}
              data={Array.isArray(props?.masterDatas) ? props?.masterDatas : []}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              onFocus={() => {
                props.getDropDownData(), Keyboard.dismiss();
              }}
              labelField={"title"}
              valueField={"title"}
              placeholder={
                props?.flatBooking?.payment_type
                  ? props?.flatBooking?.payment_type
                  : "Payment Type"
              }
              value={props?.flatBooking?.payment_type}
              onChange={(item: any) => {
                props.flatBooking.payment_type = item.title;
                setUpdateState(updateState + 1);
              }}
              newRenderItem={(item: any) => {
                return (
                  <>
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item.title}</Text>
                    </View>
                  </>
                );
              }}
            />
          </View>
        </View>

        <View style={styles.straightVw}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.titleTxt,
                {
                  bottom:
                    typeof props?.flatBooking?.cheque_image === "object"
                      ? 8
                      : 0,
                },
              ]}
            >
              Attach Photo :
            </Text>
            <RequiredStart />
          </View>
          <View>
            <Button
              width={130}
              height={45}
              buttonText={strings.browse}
              bgcolor={PRIMARY_THEME_COLOR}
              border={14}
              handleBtnPress={() => props.setBrowse(true)}
            />
            {typeof props?.flatBooking?.cheque_image === "object" ? (
              <Text style={{ fontSize: 12, textAlign: "center" }}>
                {"Photo Added"}
              </Text>
            ) : null}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={[styles.inputContainer, { marginRight: 20 }]}>
            <DropdownInput
              require={true}
              headingText={strings.configurations}
              placeholder={
                props?.flatBooking?.flat_type
                  ? props?.flatBooking?.flat_type
                  : strings.configurations
              }
              data={Array.isArray(flatTypes) ? flatTypes : []}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              value={props?.flatBooking?.flat_type}
              onChange={(item: any) => {
                props.flatBooking.flat_type = item;
                props.flatBooking.floor = "";
                props.flatBooking.flat_name = "";
                props.flatBooking.saleable_area = "";
                props.flatBooking.carpet_area = "";
                setcofigdataFlat(item, props?.index);
              }}
              newRenderItem={(item: any) => {
                return item ? (
                  <>
                    <View style={Styles.item}>
                      <Text style={Styles.textItem}>{item}</Text>
                    </View>
                  </>
                ) : null;
              }}
            />
          </View>
          <View style={[styles.inputContainer, { flex: 0.8 }]}>
            <DropdownInput
              require={true}
              headingText={strings.floor}
              placeholder={
                props.flatBooking.floor
                  ? props.flatBooking.floor
                  : strings.floor
              }
              data={Array.isArray(floors) ? floors : []}
              inputWidth={"100%"}
              paddingLeft={16}
              maxHeight={300}
              value={props.flatBooking.floor}
              onChange={(item: any) => {
                props.flatBooking.floor = item;
                props.flatBooking.flat_name = "";
                props.flatBooking.flat_name = "";
                setUpdateState(updateState + 1);
              }}
              newRenderItem={(item: any) => {
                return (
                  item.type !== "" && (
                    <>
                      <View style={Styles.item}>
                        <Text style={Styles.textItem}>{item}</Text>
                      </View>
                    </>
                  )
                );
              }}
            />
          </View>
        </View>
        <View style={styles.inputWrap}>
          <DropdownInput
            require={true}
            headingText={strings.inventory}
            placeholder={
              props?.flatBooking?.flat_name
                ? props?.flatBooking?.flat_name
                : strings.inventory
            }
            data={Array.isArray(inventory) ? inventory : []}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            value={props?.flatBooking?.flat_name}
            onChange={(item: any) => {
              props.flatBooking.flat_name = item["Flat Name"];
              props.flatBooking.saleable_area = item["Saleable Area"];
              props.flatBooking.carpet_area = item["Carpet Area"];
              setUpdateState(updateState + 1);
            }}
            newRenderItem={(item: any) => {
              return item["Flat Name"] ? (
                <>
                  <View style={Styles.item}>
                    <Text style={Styles.textItem}>{item["Flat Name"]}</Text>
                  </View>
                </>
              ) : null;
            }}
          />
        </View>

        <View style={styles.subContainer}>
          <Text style={[styles.projectTxt, { color: PRIMARY_THEME_COLOR }]}>
            Carpet Area :
          </Text>
          <Text style={styles.subTxt}>
            {props?.flatBooking?.saleable_area
              ? `${props?.flatBooking?.carpet_area} Sq. ft.`
              : "__"}
          </Text>
        </View>

        <View style={styles.inputWrap}>
          <InputField
            require={true}
            headingText={"Comment"}
            placeholderText={"Comment"}
            multiline={true}
            inputheight={80}
            onChangeText={(data: any) => {
              props.flatBooking.description = data;
              setUpdateState(updateState + 1);
            }}
            valueshow={props?.flatBooking?.description}
          />
        </View>
      </View>

      {props?.flatBookingLength === props?.index + 1 ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: normalize(20),
          }}
        >
          <Button
            buttonText={"Add More"}
            bgcolor={PRIMARY_THEME_COLOR}
            height={40}
            border={14}
            width={150}
            handleBtnPress={() => props?.addMoreBtnPressed()}
            disabled={props.disabled}
          />
          {props?.flatBookingLength > 1 ? (
            <Button
              buttonText={"Delete"}
              bgcolor={RED_COLOR}
              height={40}
              border={14}
              width={150}
              handleBtnPress={() => props?.onDeleteBtnPress()}
              disabled={props.disabled}
            />
          ) : null}
        </View>
      ) : null}

      <PicturePickerModal
        Visible={props.browse}
        setVisible={props.setBrowse}
        imageData={(data: any) => {
          props.flatBooking.cheque_image = data;
          setUpdateState(updateState + 1);
        }}
      />
    </View>
  );
};

export default ConfigurationsItem;
