import images from "app/assets/images";
import {
  BLACK_COLOR,
  CONST_IDS,
  DATE_BY_DAY,
  DATE_TIME_FORMAT,
  getCPLeadType,
  Isios,
  ROLE_IDS,
} from "app/components/utilities/constant";
import moment from "moment";
import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import {
  normalize,
  normalizeWidth,
} from "../../../../components/scaleFontSize";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const BookingDetailsItem = (props: any) => {
  const getLoginType = useSelector((state: any) => state.login);
  const item = props?.item[0] || {};
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>{strings.visitorScore} </Text>
          <Text style={styles.topTxt}>
            {item?.leads?.lead_score === "" ||
            item?.leads?.lead_score === null ||
            item?.leads?.lead_score === undefined
              ? strings.notfount
              : item?.leads?.lead_score}
          </Text>
        </View>
        <View style={styles.topBtnView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking?.openURL(`tel:${item?.leads?.customer?.mobile}`);
            }}
          >
            <Text style={styles.buttonTxt}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking?.openURL(`sms:${item?.leads?.customer?.mobile}`);
            }}
          >
            <Text style={styles.buttonTxt}>SMS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, Isios ? { width: normalizeWidth(80) } : {}]}
            onPress={() => {
              Linking?.openURL(
                `https:wa.me/${item?.leads?.customer?.whatsapp_no}`
              );
            }}
          >
            <Text style={[styles.buttonTxt, { fontSize: normalize(10) }]}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <>
        {props?.type === "readyToBook" ? (
          <>
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Book Date</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {item?.booking_date === "" ||
                  item?.booking_date === undefined ||
                  item?.booking_date === null
                    ? strings.notfount
                    : moment(item?.booking_date).format(DATE_BY_DAY)}
                </Text>
              </View>
            </View>
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Other Details</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {item?.description ? item?.description : strings.notfount}
                </Text>
              </View>
            </View>
          </>
        ) : null}
        {getLoginType?.response?.data?.role_id === ROLE_IDS.postsales_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.admin_id ||
        getLoginType?.response?.data?.role_id === ROLE_IDS.sitehead_id ? (
          <>
            <View style={[styles.Txtview, { alignItems: "flex-start" }]}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Location</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item?.properties?.area}</Text>
              </View>
            </View>
          </>
        ) : null}
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Customer Name</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.leads?.customer?.first_name
                ? item?.leads?.customer?.first_name
                : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Lead Created By</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.visit_create_by?.user_name} (
              {item?.visit_create_by?.role_title})
            </Text>
          </View>
        </View>

        {item?.created_for_sm_name?.length > 0 && (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Sourced by</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item?.created_for_sm_name} ({item?.created_for_sm_role})</Text>
            </View>
          </View>
        )}

        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>{strings.configurations}</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.configuration ? item?.configuration : strings.notfount}
            </Text>
          </View>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Area (in sq.ft)</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {item?.area
                ? item?.area
                : item?.leads?.areain_sqlft
                ? item?.leads?.areain_sqlft
                : strings.notfount}
            </Text>
          </View>
        </View>
        {getLoginType?.response?.data?.role_id !== ROLE_IDS.postsales_id ||
        getLoginType?.response?.data?.role_id !== ROLE_IDS.admin_id ||
        getLoginType?.response?.data?.role_id !== ROLE_IDS.sitehead_id ? (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Budget</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.leads?.budget?.min_budget ||
                item?.leads?.budget?.max_budget
                  ? `${item?.leads?.budget?.min_budget} ${item?.leads?.budget?.min_budget_type} - ${item?.leads?.budget?.max_budget} ${item?.leads?.budget?.max_budget_type}`
                  : strings.notfount}
              </Text>
            </View>
          </View>
        ) : null}
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Current Status</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            {/* booking_status: {//1= Panding, 2 = Confirm, 3= Compleat, 4 =booking cancel} */}
            <Text
              style={[
                styles.nameTxt,
                {
                  color:
                    item?.booking_status === 1 || item?.booking_status === 4
                      ? "red"
                      : BLACK_COLOR,
                },
              ]}
            >
              {item?.leads?.lead_status === 5 || props?.type === "register"
                ? "Registered"
                : item?.booking_status === 1
                ? "Pending"
                : item?.booking_status === 2
                ? "Booking Confirm"
                : item?.booking_status === 3
                ? "Completed"
                : item?.booking_status === 4 && "Booking Cancel"}
            </Text>
          </View>
        </View>
      </>
      {getLoginType?.response?.data?.role_id !== ROLE_IDS.postsales_id ||
      getLoginType?.response?.data?.role_id !== ROLE_IDS.admin_id ||
      getLoginType?.response?.data?.role_id !== ROLE_IDS.sitehead_id ? (
        <>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Property Name</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.properties?.property_title}
              </Text>
            </View>
          </View>
        </>
      ) : null}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Lead Source</Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {item?.lead_source_name
              ? item?.lead_source_name == "Reference" &&
                item?.referrel_partner == 1
                ? "Referral Partner"
                : item?.lead_source_name
              : strings.notfount}{" "}
            {getCPLeadType(item?.cp_lead_type)}
          </Text>
        </View>
      </View>

      {item?.lead_source_name == "Reference" ? (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Referrer</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{item?.referrer_name}</Text>
          </View>
        </View>
      ) : null}

      {item?.leads?.lead_source === CONST_IDS.cp_lead_source_id ? (
        <>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>CP Name</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.cp_name ? item?.cp_name : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>CP Employee Name </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.cp_emp_name && item?.cp_emp_name?.length > 0
                  ? item?.cp_emp_name
                  : strings.notfount}
              </Text>
            </View>
          </View>
        </>
      ) : null}
      {props?.type !== "readyToBook" && props?.type !== "register" ? (
        <>
          <View style={styles.headdingView}>
            <Text style={styles.headdingTxt}>{strings.bookingDetails}</Text>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Booking No.</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item?.booking_no}</Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>
                {props.type === "cancel" ? "Cancel Booking By" : "Booking By"}
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.booking_by_name
                  ? item?.booking_by_name
                  : strings.notfount}{" "}
                ({item?.creaters?.role_title})
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>
                {props.type === "cancel"
                  ? "Cancel Booking Date"
                  : "Booking Date"}
              </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props.type === "cancel"
                  ? item?.canceldate === "" ||
                    item?.canceldate === null ||
                    item?.canceldate === undefined
                    ? strings.notfount
                    : moment.utc(item?.canceldate).format(DATE_TIME_FORMAT)
                  : item?.booking_date === "" ||
                    item?.booking_date === null ||
                    item?.booking_date === undefined
                  ? strings.notfount
                  : moment.utc(item?.booking_date).format(DATE_TIME_FORMAT)}
              </Text>
            </View>
          </View>

          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Agreement Value</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.agreement_value === "" ||
                item?.agreement_value === null ||
                item?.agreement_value === undefined
                  ? strings.notfount
                  : item?.agreement_value}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Booking Amount</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.booking_amount === "" ||
                item?.booking_amount === null ||
                item?.booking_amount === undefined
                  ? strings.notfount
                  : item?.booking_amount}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Rate achieved</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.rate_achieved === "" ||
                item?.rate_achieved === null ||
                item?.rate_achieved === undefined
                  ? strings.notfount
                  : item?.rate_achieved}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Payment Type</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.payment_type === "1"
                  ? "Cash"
                  : item?.payment_type === "2"
                  ? "Cheque"
                  : item?.payment_type}
              </Text>
            </View>
          </View>
          {item?.payment_type === "Cheque" && (
            <View style={styles.Txtview}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Cheque No.</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>
                  {item?.tranjection_upi_cheque_number === "" ||
                  item?.tranjection_upi_cheque_number === null ||
                  item?.tranjection_upi_cheque_number === undefined
                    ? strings.notfount
                    : item?.tranjection_upi_cheque_number}
                </Text>
              </View>
            </View>
          )}
          {/* <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Configuration Qty</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {item?.configuration ?
                                    `${item?.configuration} / ${item?.quantity}` : strings.notfount}</Text>
                        </View>
                    </View> */}
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Configuration</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.flat_type ? item?.flat_type : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Floor</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.floor ? item?.floor : strings.notfount}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Flat Number</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.flat_no ? item?.flat_no : strings.notfount}
              </Text>
            </View>
          </View>
          {/* <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Saleble Area</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {item?.saleable_area ?
                                    item?.saleable_area : strings.notfount}</Text>
                        </View>
                    </View> */}
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Carpet Area :</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item.carpet_area ? item.carpet_area : strings.notfount}
              </Text>
            </View>
          </View>
        </>
      ) : null}
      {props?.type === "register" ? (
        <>
          <View style={styles.headdingView}>
            <Text style={styles.headdingTxt}>{"Registration Details"}</Text>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Booking By</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.bookings?.booking_by?.user_name
                  ? item?.bookings?.booking_by?.user_name
                  : null}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Register Amount</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.total_amount && item?.total_amount_type
                  ? item?.total_amount + " " + item?.total_amount_type
                  : null}
              </Text>
            </View>
          </View>
          {/* <View style={styles.Txtview}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Register No.</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {item?.booking_no ?
                                    item?.booking_no : strings.notfount}</Text>
                        </View>
                    </View> */}
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Register By</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.register_by_name ? item?.register_by_name : null}
              </Text>
            </View>
          </View>
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Configuration Qty</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {item?.configuration
                  ? `${item?.configuration} / ${item?.quantity}`
                  : strings.notfount}
              </Text>
            </View>
          </View>
          {props?.type === "register" ? (
            <View style={[styles.Txtview, { alignItems: "flex-start" }]}>
              <View style={styles.projectContainer}>
                <Text style={styles.projectTxt}>Documents</Text>
              </View>
              <View>
                <Text>:</Text>
              </View>
              {item?.documents?.length > 0 ? (
                <View style={styles.nameContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.docsVwSty}>
                      {item?.documents?.map((itm: any) => {
                        return (
                          <View style={styles.docsVw}>
                            {itm?.document_type === "document" ? (
                              <TouchableOpacity
                                onPress={() =>
                                  props.OpenDoc(
                                    `${item?.register_document_base_url}${itm?.document}`
                                  )
                                }
                              >
                                <Image
                                  source={images.pdfIcone}
                                  style={styles.imageVw}
                                />
                              </TouchableOpacity>
                            ) : (
                              <>
                                {itm?.document_type === "image" ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      props.OpenDoc(
                                        `${
                                          item?.register_document_base_url +
                                          "/" +
                                          itm?.document
                                        }`
                                      )
                                    }
                                  >
                                    <Image
                                      source={{
                                        uri:
                                          item?.register_document_base_url +
                                          "/" +
                                          itm?.document,
                                      }}
                                      style={styles.imageVw}
                                      resizeMode={"contain"}
                                    />
                                  </TouchableOpacity>
                                ) : null}
                              </>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              ) : null}
            </View>
          ) : null}
        </>
      ) : null}
    </ScrollView>
  );
};

export default BookingDetailsItem;
