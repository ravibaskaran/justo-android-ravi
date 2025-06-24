import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import styles from "./styles";
import strings from "../../../../components/utilities/Localization";
import {
  BLACK_COLOR,
  CONST_IDS,
  DATE_TIME_FORMAT,
  getCPLeadType,
  GREEN_COLOR,
  PURPLE_COLOR,
  ROLE_IDS,
  WHITE_COLOR,
  YELLOW_COLOR,
} from "../../../../components/utilities/constant";
import images from "../../../../assets/images";
import Button from "../../../../components/Button";
import moment from "moment";
import { useSelector } from "react-redux";
import usePermission from "app/components/utilities/UserPermissions";

const BookingListItem = (props: any) => {
  const getLoginType = useSelector((state: any) => state.login);
  const { view } = usePermission({
    view:
      props?.type === "readyToBook"
        ? "view_ready_to_book"
        : props?.type === "register"
        ? "view_ready_to_book"
        : "view_booking",
  });
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Project :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.property_title}</Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {props?.type === "register"
              ? "Registration Date :"
              : "Booking Date :"}
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.type === "register"
              ? moment
                  .utc(props.items.registration_date)
                  .format(DATE_TIME_FORMAT)
              : moment
                  .utc(
                    props.items.booking_date
                      ? props.items.booking_date
                      : props.items.createdDate
                  )
                  .format(DATE_TIME_FORMAT)}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Customer Name :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>{props.items.customer_first_name}</Text>
        </View>
      </View>
      {/* <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Booking Status :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.booking_status}</Text>
                </View>
            </View> */}
      <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>
            {props.type === "register" ? "Register Status " : "Booking Status "}
            :
          </Text>
        </View>
        <View style={styles.nameContainer}>
          {/* booking_status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 =booking cancel} */}
          <Text
            style={[
              styles.nameTxt,
              {
                color:
                  props?.items?.booking_status === 1 ||
                  props?.items?.booking_status === 4
                    ? "red"
                    : props?.items?.booking_status === 2 ||
                      props?.items?.booking_status === 3
                    ? GREEN_COLOR
                    : BLACK_COLOR,
              },
            ]}
          >
            {props.type === "register"
              ? "Registered"
              : props?.items?.booking_status === 1
              ? "Booking Pending"
              : props?.items?.booking_status === 2
              ? "Booking Confirm"
              : props?.items?.booking_status === 3
              ? "Registered"
              : props?.items?.booking_status === 4 && "Booking Cancel"}
          </Text>
        </View>
      </View>
      {(getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.admin_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id) &&
      props?.type !== "readyToBook" ? (
        <>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Booking No :</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props.items.booking_no
                  ? props.items.booking_no
                  : strings.notfount}
              </Text>
            </View>
          </View>
          {/* <View style={styles.Txtview} >
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Payment Mode :</Text>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>{
                                props.items.payment_type ?
                                    props.items.payment_type : strings.notfount}</Text>
                        </View>
                    </View> */}
          {props.items.payment_type === "Cheque" && (
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Cheque No :</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {props.items.tranjection_upi_cheque_number
                    ? props.items.tranjection_upi_cheque_number
                    : strings.notfount}
                </Text>
              </View>
            </View>
          )}
        </>
      ) : null}
      <>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.configurations} :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.flat_type ? props.items.flat_type : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Floor :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.floor ? props.items.floor : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Flat Number :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.flat_no ? props.items.flat_no : strings.notfount}
            </Text>
          </View>
        </View>
        {/* <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Saleble Area :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.saleable_area
                ? props.items.saleable_area
                : strings.notfount}
            </Text>
          </View>
        </View> */}
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Carpet Area :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.carpet_area
                ? props.items.carpet_area
                : strings.notfount}
            </Text>
          </View>
        </View>
        {props.type === "register" ? null : (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Budget :</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props.items.budget_amount
                  ? props.items.budget_amount
                  : props.items.min_budget || props.items.max_budget
                  ? `${props.items.min_budget || ""}${
                      props.items.min_budget_type || ""
                    } - ${props.items.max_budget || ""}${
                      props.items.max_budget_type || ""
                    }`
                  : strings.notfount}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Agreement Value</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.agreement_value
                ? props.items.agreement_value
                : strings.notfount}
            </Text>
          </View>
        </View>
        {props.type === "request" ? (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Booking Amount</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props.items.booking_amount
                  ? props.items.booking_amount
                  : strings.notfount}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Rate achieved :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.rate_achieved
                ? props.items.rate_achieved
                : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Payment Type :</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props.items.payment_type
                ? props.items.payment_type
                : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Lead Source</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.items?.lead_source_name
                ? props?.items?.lead_source_name == "Reference" &&
                  props?.items?.referrel_partner == 1
                  ? "Referral Partner"
                  : props?.items?.lead_source_name
                : strings.notfount}{" "}
              {getCPLeadType(props?.items?.cp_lead_type)}
            </Text>
          </View>
        </View>

        {props?.items?.lead_source_name == "Reference" ? (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Referrer</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{props?.items?.referrer_name}</Text>
            </View>
          </View>
        ) : null}
        {props.items.lead_source === CONST_IDS.cp_lead_source_id ? (
          <>
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>CP Name :</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {props.items.cp_name ? props.items.cp_name : strings.notfount}
                </Text>
              </View>
            </View>
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>CP Emp Name :</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {props.items.cp_emp_name && props.items.cp_emp_name.length > 0
                    ? props.items.cp_emp_name
                    : strings.notfount}
                </Text>
              </View>
            </View>
          </>
        ) : null}
      </>

      <View style={styles.buttonContainer}>
        <Button
          width={90}
          height={30}
          bgcolor={WHITE_COLOR}
          bordercolor={PURPLE_COLOR}
          borderWidth={1}
          btnTxtcolor={PURPLE_COLOR}
          buttonText={strings.call}
          btnTxtsize={14}
          border={10}
          handleBtnPress={() => {
            Linking?.openURL(`tel:${props.items?.mobile}`);
          }}
        />
        {view && (
          <TouchableOpacity
            style={styles.Viewbutton}
            onPress={() => props.onPressView(props.items)}
          >
            <Image source={images.forwardArrow} style={styles.arrow} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BookingListItem;
