import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import {
  GRAY_COLOR,
  PRIMARY_THEME_COLOR,
  RED_COLOR,
} from "../../../../components/utilities/constant";
import {
  normalize,
  normalizeHeight,
  normalizeSpacing,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import { ScrollView } from "react-native-gesture-handler";
import strings from "app/components/utilities/Localization";
import Modal from "react-native-modal";
import FastImages from "app/components/FastImage";
import images from "app/assets/images";
import FileViewer from "react-native-file-viewer";
import RNFS from "react-native-fs";
import ErrorMessage from "app/components/ErrorMessage";
import { useNavigation } from "@react-navigation/native";

const PropertyDetailItem = (props: any) => {
  const item = props?.items || {};
  const navigation: any = useNavigation()
  const [isVisible, setIsVisible] = useState(false);
  const [onPressData, setOnPressData] = useState<any>({});
  const reraType = props?.items?.rera_certificate?.substring(
    props?.items?.rera_certificate?.lastIndexOf(".") + 1
  );
  const latterType = props?.items?.propidership_declaration_letter?.substring(
    props?.items?.propidership_declaration_letter?.lastIndexOf(".") + 1
  );
  const chequeType = props?.items?.cancel_cheaque?.substring(
    props?.items?.cancel_cheaque?.lastIndexOf(".") + 1
  );
  const declarationType =
    props?.items?.declaration_letter_of_company?.substring(
      props?.items?.declaration_letter_of_company?.lastIndexOf(".") + 1
    );

  const OpenDoc = async (url: any) => {
    function getUrlExtension(url: any) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }
    const extension = getUrlExtension(url);

    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch((error) => {
        // error
        ErrorMessage({
          msg: error?.message,
          backgroundColor: RED_COLOR,
        });
      });
  };
  console.log("🚀 ~ file: AgentDetailInfo.tsx:82 ~ item?.active_status:",item)

  return (
    <ScrollView>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.status} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.active_status ? strings.active : strings.deactive}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.cpType} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.cp_type === 1 ? strings.individualText : strings.companyText}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.cpCapital + " " + strings.name}{" "}
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.AgentName}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.agency + " " + strings.name}{" "}
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.agency_name ? item?.agency_name : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.mobileNo} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.Mobileno ? item?.Mobileno : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.email} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.Email ? item?.Email : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.whatsappNo} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.whatsappno ? item?.whatsappno : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.RERA + " " + strings.shortNum}{" "}
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.rerano ? item?.rerano : strings.notfount}</Text>
        </View>
      </View>
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.aadhaar} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.aadharno ? item?.aadharno : strings.notfount}</Text>
        </View>
      </View> */}
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.pancard + " " + strings.shortNum}{" "}
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.pancardno ? item?.pancardno : strings.notfount}</Text>
        </View>
      </View> */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.allocatedProperty} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {props?.items?.property_tag?.length > 0 ? (
            <>
              {props?.items?.property_tag.map((item: any) => {
                return (
                  <Text
                    key={item?._id}
                    style={[
                      styles.nameTxt,
                      {
                        borderBottomColor: GRAY_COLOR,
                        borderBottomWidth: 1,
                        width: "100%",
                        marginVertical: normalizeSpacing(5),
                      },
                    ]}
                  >
                    {item?.property_title}
                  </Text>
                );
              })}
            </>
          ) : <Text style={styles.nameTxt}>{strings.notfount}</Text>}
        </View>
      </View>
      {/* {item?.cp_type === 2 ? <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {"Employees"}
          </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <TouchableOpacity style={styles.nameContainer} onPress={() => {navigation.navigate('EmployeeListing', {ID: item?.cp_id})}}>
          <Text style={[styles.nameTxt, {color: PRIMARY_THEME_COLOR}]}>{"See All Employees"}</Text>
        </TouchableOpacity>
      </View> : null} */}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.location} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.location ? item?.location : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.joinNow} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.workingfrom ? item?.workingfrom : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.workingLocation} </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          {props?.items?.workinglocation?.length > 0 ? (
            <>
              {props?.items?.workinglocation.map((item: any) => {
                return (
                  <Text
                    key={item?._id}
                    style={[
                      styles.nameTxt,
                      {
                        borderBottomColor: GRAY_COLOR,
                        borderBottomWidth: 1,
                        width: "100%",
                        marginVertical: normalizeSpacing(5),
                      },
                    ]}
                  >
                    {item?.location}
                  </Text>
                );
              })}
            </>
          ) : <Text style={styles.nameTxt}>{strings.notfount}</Text>}
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.reraCertificate} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={[styles.nameContainer, { alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => {
              if (reraType === "pdf") {
                OpenDoc(props.items.rera_certificate);
              } else {
                // setIsVisible(true);
                // setOnPressData(props.items.rera_certificate);
                OpenDoc(
                    props.items.rera_certificate
                );
              }
            }}
          >
            {reraType === "pdf" ? (
              <Image
                source={images.pdfIcone}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                }}
              />
            ) : (
              <FastImages
                source={{ uri: props.items.rera_certificate }}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.DeclarLttr} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={[styles.nameContainer, { alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => {
              if (latterType === "pdf") {
                OpenDoc(props.items.propidership_declaration_letter);
              } else {
                // setIsVisible(true);
                // setOnPressData(props.items.propidership_declaration_letter);
                OpenDoc(
                    props.items.propidership_declaration_letter
                );
              }
            }}
          >
            {latterType === "pdf" ? (
              <Image
                source={images.pdfIcone}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                }}
              />
            ) : (
              <FastImages
                source={{ uri: props.items.propidership_declaration_letter }}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headingView}>
        <Text style={styles.headingTxt}>
          {(item?.cp_type === 1 ? strings.user : strings.companyText) + " " + strings.bankDetail}
        </Text>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.bankName} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.bank_name ? item?.bank_name : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.accountNo} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.account_no ? item?.account_no : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.branchName} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.branch_name ? item?.branch_name : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.ifscCode} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.ifsc_code ? item?.ifsc_code : strings.notfount}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.cancelCheque} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={[styles.nameContainer, { alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => {
              if (chequeType === "pdf") {
                OpenDoc(props?.items?.base_url + props.items.cancel_cheaque);
              } else {
                // setIsVisible(true);
                // setOnPressData(
                //   props?.items?.base_url + props.items.cancel_cheaque
                // );
                OpenDoc(
                  props?.items?.base_url +
                    props.items.cancel_cheaque
                );
              }
            }}
          >
            {chequeType === "pdf" ? (
              <Image
                source={images.pdfIcone}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                }}
              />
            ) : (
              <FastImages
                source={{
                  uri: props?.items?.base_url + props.items.cancel_cheaque,
                }}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={styles.headingView}>
        <Text style={styles.headingTxt}>
          {strings.company + " " + strings.bankDetail}
        </Text>
      </View> */}
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.bankName} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.comp_bank_name ? item?.comp_bank_name : strings.notfount }</Text>
        </View>
      </View> */}
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {strings.account + " " + strings.number}{" "}
          </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.comp_account_no ? item?.comp_account_no : strings.notfount}</Text>
        </View>
      </View> */}
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.branchName} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.comp_branch_name ? item?.comp_branch_name : strings.notfount}</Text>
        </View>
      </View> */}
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.ifscCode} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{item?.comp_ifsc_code ? item?.comp_ifsc_code : strings.notfount}</Text>
        </View>
      </View> */}
      {item?.cp_type === 2 ? <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.pancard} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={[styles.nameContainer, { alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => {
              // setIsVisible(true);
              // setOnPressData(props?.items?.base_url + props.items.pancard);
              OpenDoc(
                props?.items?.base_url +
                  props.items.pancard
              );
            }}
          >
            <FastImages
              source={{ uri: props.items.pancard }}
              style={{
                width: normalizeWidth(80),
                height: normalizeHeight(80),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: normalize(10),
              }}
            />
          </TouchableOpacity>
        </View>
      </View> : null}
      {/* <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>{strings.declrLttrCom} </Text>
        </View>
        <View style={{ height: "100%" }}>
          <Text>:</Text>
        </View>
        <View style={[styles.nameContainer, { alignItems: "center" }]}>
          <TouchableOpacity
            onPress={() => {
              if (chequeType === "pdf") {
                OpenDoc(
                  props?.items?.base_url +
                    props.items.declaration_letter_of_company
                );
              } else {
                // setIsVisible(true);
                // setOnPressData(
                //   props?.items?.base_url +
                //     props.items.declaration_letter_of_company
                // );
                OpenDoc(
                  props?.items?.base_url +
                    props.items.declaration_letter_of_company
                );
              }
            }}
          >
            {declarationType === "pdf" ? (
              <Image
                source={images.pdfIcone}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                }}
              />
            ) : (
              <FastImages
                source={{
                  uri:
                    props?.items?.base_url +
                    props.items.declaration_letter_of_company,
                }}
                style={{
                  width: normalizeWidth(80),
                  height: normalizeHeight(80),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: normalize(10),
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View> */}
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onBackButtonPress={() => setIsVisible(false)}
      >
        <View>
          {/* <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeIconTouch}>
            <Image source={images.close} style={styles.closeIcon} />
          </TouchableOpacity> */}
          <FastImages
            source={{ uri: onPressData }}
            style={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default PropertyDetailItem;
