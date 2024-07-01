import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import Header from "app/components/Header";
import images from "app/assets/images";
import strings from "app/components/utilities/Localization";
import {
  BLACK_COLOR,
  PRIMARY_THEME_COLOR,
} from "app/components/utilities/constant";
import styles from "./styles";
import Button from "app/components/Button";
import { normalize } from "app/components/scaleFontSize";

const EscalateView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.escalate}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={styles.containerVw}>
        <Text style={styles.headerTxt}>{strings.escalatetonew}</Text>
        <View style={styles.selectedBox}>
          {props?.selectedCp?.user_name ? (
            <View style={[styles.innerBoxVw, { justifyContent: "flex-start" }]}>
              <Text>{props.selectedCp.user_name}</Text>
              <TouchableOpacity
                onPress={() =>
                  props.handleDelete(
                    props.selectedCpitem,
                    props.selectedCp.index
                  )
                }
              >
                <Image source={images.close} style={styles.crossVw} />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.noSelectedTxt}>{strings.nouserselected}</Text>
          )}
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder={strings.search}
            placeholderTextColor={BLACK_COLOR}
            style={styles.searchInputVw}
            onFocus={() => props.setAllList(true)}
            onChangeText={(text: any) => props.handleSearch(text)}
          />
          {/* {props.allList ? */}
          <FlatList
            data={props.escalateUsers}
            renderItem={({ item, index }: any) => {
              const getSelected =
                props?.selectedCp?.length === 0
                  ? ""
                  : props?.selectedCp?.user_name;

              const role =
                item?.role_slug === "sourcing_tl"
                  ? "TL"
                  : item?.role_slug === "sourcing_manager"
                  ? "SM"
                  : item?.role_slug === "closing_manager"
                  ? "CM"
                  : item?.role_slug === "closing_tl"
                  ? "CTL"
                  : item?.role_slug === "channel_partner"
                  ? "CP"
                  : item?.role_slug === "receptionist"
                  ? "Recp"
                  : item?.role_slug === "cp_agent"
                  ? "Agent"
                  : item?.role_slug === "post_sales"
                  ? "PS"
                  : item?.role_slug === "site_head"
                  ? "SHD"
                  : item?.role_slug === "cluster_head"
                  ? "CH"
                  : item?.role_slug === "call_center"
                  ? "CC"
                  : item?.role_slug === "vice_president"
                  ? "VP"
                  : "";
              return (
                <View style={styles.innerBoxVwlist}>
                  <Text style={styles.innerBoxVwlistfont}>
                    {item.user_name} ({role})
                  </Text>
                  {item?.assign_status === false ? (
                    <TouchableOpacity
                      onPress={() =>
                        !getSelected?.toString()?.includes(item.user_name)
                          ? props.handleSelects(item, index)
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
                  ) : (
                    <TouchableOpacity disabled style={styles.checkBoxVw}>
                      <Image style={styles.checksVw} source={images.check} />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
          {/* : null
                } */}
        </View>
        <View style={styles.btncontener}>
          <Button
            width={150}
            height={40}
            btnTxtsize={16}
            buttonText={strings.escalate}
            textTransform={null}
            handleBtnPress={() => props.handleAddTarget()}
          />
        </View>
      </View>
    </View>
  );
};

export default EscalateView;
