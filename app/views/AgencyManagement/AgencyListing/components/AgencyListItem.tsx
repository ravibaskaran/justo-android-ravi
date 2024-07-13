import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "../../../../components/utilities/Localization";
import {
  BLACK_COLOR,
  GREEN_COLOR,
  Isios,
  PURPLE_COLOR,
  RED_COLOR,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import usePermission from "app/components/utilities/UserPermissions";

const AgencyListItem = (props: any) => {
  const { view, edit, status } = usePermission({
    view: "view_channelpartner",
    edit: "edit_channelpartner",
    status: "channelpartner_status_update",
  });
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.cpCapital + " " + strings.name} :
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items.agent_name}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.cpType} :
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props?.items?.cp_type
                ? `${
                    props?.items?.cp_type === 2 ? "Company" : "Individual"
                  }`
                : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.location} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.location === "" || props.items.location === undefined
              ? strings.notfount
              : props.items.location}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.RERA + " " + strings.shortNum} :
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.rera_certificate_no === "" ||
            props.items.rera_certificate_no === undefined
              ? strings.notfount
              : props.items.rera_certificate_no}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.totalVisitor} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.total_visit === "" ||
            props.items.total_visit === undefined
              ? strings.notfount
              : props.items.total_visit}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.totalSiteVisit} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.total_site_visit === "" ||
            props.items.total_site_visit === undefined
              ? strings.notfount
              : props.items.total_site_visit}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.totalCloseVisit} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.total_closing_lead === "" ||
            props.items.total_closing_lead === undefined
              ? strings.notfount
              : props.items.total_closing_lead}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.status} :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.nameTxt,
              {
                color: BLACK_COLOR,
              },
            ]}
          >
            {props.items.active_status ? strings.active : strings.deactive}
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
            handleBtnPress={() => props.onPressView(props.items, "edit")}
          />
        )}
         {status && (
          <Button
            width={78}
            height={30}
            bgcolor={WHITE_COLOR}
            bordercolor={props.items.active_status ? RED_COLOR : GREEN_COLOR}
            borderWidth={1}
            btnTxtcolor={props.items.active_status ? RED_COLOR : GREEN_COLOR}
            buttonText={
              props.items.active_status ? strings.deactive : strings.active
            }
            btnTxtsize={14}
            border={10}
            handleBtnPress={() => {
              if (props.items.total_visit === 0) {
                props.setIsVisible(true);
                props?.setChangeStatus(props.items);
              } else {
                props.setNewVisitor(true);
                props?.setChangeStatus(props.items);
              }
            }}
          />
        )} 
        {view && (
          <TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView(props.items, "view")}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{alignItems: 'flex-start', marginBottom: 10, flexDirection: 'row'}}>
        <Button
          width={Isios ? 160 : 120}
          height={45}
          bgcolor={WHITE_COLOR}
          bordercolor={PURPLE_COLOR}
          borderWidth={1}
          btnTxtcolor={PURPLE_COLOR}
          buttonText={strings.allocateProperty}
          btnTxtsize={14}
          border={10}
          handleBtnPress={() => props.openAllocatePropertyModal(props.items?._id)}
        />
        {props?.items?.cp_type === 2 ? <Button
          width={Isios ? 140 : 110}
          height={45}
          bgcolor={WHITE_COLOR}
          bordercolor={PURPLE_COLOR}
          borderWidth={1}
          btnTxtcolor={PURPLE_COLOR}
          buttonText={"See Employees"}
          btnTxtsize={14}
          border={10}
          handleBtnPress={() => props.onPressSeeEmployee(props.items?._id)}
        /> : null}
      </View>
    </View>
  );
};

export default AgencyListItem;
