import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../../../assets/images";
import {
  getAge,
  PRIMARY_THEME_COLOR,
} from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";
import Header from "../../../../components/Header";
import moment from "moment";
import { useSelector } from "react-redux";

const ProfileView = (props: any) => {
  const { data, HandleBackPress, handleEditProfilePress } = props;
  const allDetailsall = useSelector((state: any) => state.agentData);
  const [allDetails, setAllDetails] = useState<any>({});

  useEffect(() => {
    checkprofile();
  }, [allDetailsall]);

  const checkprofile = () => {
    if (allDetailsall?.response?.status === 200) {
      setAllDetails(allDetailsall?.response?.data);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        headerText={data.heading}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.leftImageIconStyle}
        leftImageIconStyle={styles.leftImageIconStyle}
        handleOnLeftIconPress={HandleBackPress}
        barStyle={"light-content"}
        statusBarColor={PRIMARY_THEME_COLOR}
      />
      <ScrollView style={styles.ProfileView}>
        <View style={styles.roleView}>
          <Text style={styles.CPtext}>
            {strings.userRole} : {allDetails?.role_title}
          </Text>
        </View>
        <View style={styles.userCardView}>
          <View style={styles.usernameWrap}>
            <Image
              style={styles.userImage}
              source={
                allDetails?.profile_picture
                  ? { uri: allDetails?.base_url + allDetails?.profile_picture }
                  : images.user
              }
            />
            <Text style={styles.userNameText}>
              {allDetails?.firstname?.toUpperCase() +
                " " +
                allDetails?.lastname?.toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editImageWrap}
            onPress={handleEditProfilePress}
          >
            <Image style={styles.editIconImage} source={images.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.InformationView}>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Name</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.firstname?.toUpperCase() +
                  " " +
                  allDetails?.lastname?.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Aadhaar No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.adhar_no &&
                allDetails?.adhar_no != "null" &&
                allDetails?.adhar_no != "undefined"
                  ? allDetails?.adhar_no
                  : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Pancard No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.pancard_no &&
                allDetails?.pancard_no != "null" &&
                allDetails?.pancard_no != "undefined"
                  ? allDetails?.pancard_no
                  : strings.notfount}{" "}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Created Date</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.created_date
                  ? moment(allDetails?.created_date).format("DD/MM/YYYY")
                  : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Gender</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.gender === 1 ? strings.male : strings.female}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Date of Birth</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.dateofbirth &&
                allDetails?.dateofbirth !== "Invalid date"
                  ? allDetails?.dateofbirth
                  : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Age</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.dateofbirth &&
                allDetails?.dateofbirth !== "Invalid date"
                  ? getAge(allDetails?.dateofbirth) + " Y"
                  : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Parent Name</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.parent_name
                  ? allDetails?.parent_name
                  : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Mobile No.</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.mobile ? allDetails?.mobile : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>What'sapp No</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.whatsapp_no &&
                allDetails?.whatsapp_no != "null" &&
                allDetails?.whatsapp_no != "undefined"
                  ? allDetails?.whatsapp_no
                  : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Email</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.email ? allDetails?.email : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>City</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.city ? allDetails?.city : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Address</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.address ? allDetails?.address : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.fieldView}>
            <View style={styles.keyView}>
              <Text style={styles.keyText}>Area</Text>
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.valueView}>
              <Text style={styles.valueText}>
                {allDetails?.area ? allDetails?.area : strings.notfount}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileView;
