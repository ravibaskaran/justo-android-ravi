import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { normalize } from "../../../../components/scaleFontSize";
import strings from "../../../../components/utilities/Localization";
import styles from "./Styles";

const RecoveryDetailItem = (props: any) => {
  const appdetail = props?.data || {};
  return (
    <ScrollView>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>{strings.visitorScore} </Text>
          <Text style={styles.topTxt}>
            {appdetail?.leads?.lead_score ? appdetail?.leads?.lead_score : 0}
          </Text>
        </View>
        <View style={styles.topBtnView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking?.openURL(`tel:${appdetail?.leads?.customer?.mobile}`);
            }}
          >
            <Text style={styles.buttonTxt}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking?.openURL(`sms:${appdetail?.leads?.customer?.mobile}`);
            }}
          >
            <Text style={styles.buttonTxt}>SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking?.openURL(
                `https:wa.me/${appdetail?.leads?.customer?.whatsapp_no}`
              );
            }}
          >
            <Text style={[styles.buttonTxt, { fontSize: normalize(10) }]}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.configurations}</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail?.configuration
              ? appdetail?.configuration
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Area (in sq. ft.)</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail?.area ? appdetail?.area : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Budget</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail?.leads?.budget_amount
              ? appdetail.leads.budget_amount
              : appdetail?.leads?.budget?.min_budget ||
                appdetail?.leads?.budget?.max_budget
              ? `${appdetail?.leads?.budget?.min_budget || ""} ${
                  appdetail?.leads?.budget?.min_budget_type || ""
                } - ${appdetail?.leads?.budget?.max_budget || ""} ${
                  appdetail?.leads?.budget?.max_budget_type || ""
                }`
              : strings.notfount}
          </Text>
        </View>
      </View>

      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Current Status</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{"Recovery"}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Property Name</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail.properties?.property_title
              ? appdetail.properties?.property_title
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Visitor Name</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail.leads?.customer?.first_name
              ? appdetail.leads?.customer?.first_name
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Source</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail?.leads?.visitcreateby?.user_name
              ? appdetail?.leads?.visitcreateby?.user_name
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Closing Date</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {appdetail.closingDate ? appdetail.closingDate : strings.notfount}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default RecoveryDetailItem;
