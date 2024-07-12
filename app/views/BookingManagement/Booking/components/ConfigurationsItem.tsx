import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import DropdownInput from "app/components/DropDown";
import styles from "./styles";
import strings from "app/components/utilities/Localization";
import Styles from "app/components/Modals/styles";
import {
  JW_LOGIN,
  JW_PASSWORD,
  PRIMARY_THEME_COLOR,
} from "app/components/utilities/constant";
import { normalize } from "@rneui/themed";
import Button from "../../../../components/Button";
import { useDispatch } from "react-redux";
import { START_LOADING, STOP_LOADING } from "app/Redux/types";
import { apiCallJW } from "app/components/utilities/httpClient";
import apiEndPoints from "app/components/utilities/apiEndPoints";

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
      <View
        style={{
          padding: 5,
          backgroundColor: "#e3e6e8",
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, marginRight: 20, marginTop: 10 }}>
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
          <View style={{ flex: 0.8, marginTop: 10 }}>
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

        <View style={styles.inputWrap}>
          <View style={styles.IteamView}>
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text
                  style={[styles.projectTxt, { color: PRIMARY_THEME_COLOR }]}
                >
                  Carpet Area :
                </Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {props?.flatBooking?.saleable_area
                    ? `${props?.flatBooking?.carpet_area} Sq. ft.`
                    : "__"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {props?.flatBookingLength === props?.index + 1 ? (
        <View style={{ marginVertical: normalize(20) }}>
          <Button
            buttonText={"Add More"}
            bgcolor={PRIMARY_THEME_COLOR}
            height={40}
            border={14}
            handleBtnPress={() => props?.addMoreBtnPressed()}
            disabled={props.disabled}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ConfigurationsItem;
