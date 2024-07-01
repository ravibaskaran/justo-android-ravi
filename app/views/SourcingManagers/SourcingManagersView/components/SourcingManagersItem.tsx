import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./styles";
import {
  BLACK_COLOR,
  BLUE_COLOR,
  GREEN_COLOR,
  Isios,
  PRIMARY_THEME_COLOR,
  PURPLE_COLOR,
  RED_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import strings from "../../../../components/utilities/Localization";
import Button from "../../../../components/Button";
import usePermission from "app/components/utilities/UserPermissions";

const SourcingManagersItem = (props: any) => {
  const { view, edit, allocate } = usePermission({
    view: "manager_details",
    edit: "edit_manager",
    allocate: "allocate_cp",
  });
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Name :</Text>
        </View>
        {/* <View><Text>:</Text></View> */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.user_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          {/* <Text style={styles.projectTxt}>{strings.total + " " + strings.visit} :</Text> */}
          <Text style={styles.projectTxt}>{strings.totalVisitor} :</Text>
        </View>
        {/* <View><Text>:</Text></View> */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          {/* <Text style={styles.projectTxt}>{strings.total + " " + strings.siteVisit} :</Text> */}
          <Text style={styles.projectTxt}>{strings.totalSiteVisit} :</Text>
        </View>
        {/* <View><Text>:</Text></View> */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_site_visit}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          {/* <Text style={styles.projectTxt}>{strings.total + " " + strings.booking} :</Text> */}
          <Text style={styles.projectTxt}>{strings.totalCloseVisit} :</Text>
        </View>
        {/* <View><Text>:</Text></View> */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.total_closing_lead}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.closingPrcntg} :</Text>
        </View>
        {/* <View><Text>:</Text></View> */}
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color: BLACK_COLOR,
              },
            ]}
          >
            {props.items.total_closing_percentage}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {edit && (
          <Button
            width={78}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={PURPLE_COLOR}
            borderWidth={1}
            btnTxtcolor={PURPLE_COLOR}
            buttonText={strings.edit}
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => props.onPressEditSM("edit")}
          />
        )}
        {allocate && (
          <Button
            width={110}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={PRIMARY_THEME_COLOR}
            borderWidth={1}
            btnTxtcolor={PRIMARY_THEME_COLOR}
            buttonText={strings.allocateCp}
            btnTxtsize={14}
            textTransform={null}
            border={10}
            handleBtnPress={() => props.onPressAllocate()}
          />
        )}
        {view && (
          <TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView()}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        )}
      </View>
      {/* <View style={{alignItems: 'flex-start', marginVertical: 10}}>
          <Button
            width={110}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={BLUE_COLOR}
            borderWidth={1}
            btnTxtcolor={BLUE_COLOR}
            buttonText={strings.editTarget}
            btnTxtsize={14}
            textTransform={null}
            border={10}
            handleBtnPress={() => props.onPressEditTarget(props.items)}
          />
      </View> */}
    </View>
  );
};

export default SourcingManagersItem;
