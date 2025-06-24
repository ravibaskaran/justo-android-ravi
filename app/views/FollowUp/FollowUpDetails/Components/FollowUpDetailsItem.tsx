import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "./Styles";
import strings from "../../../../components/utilities/Localization";
import moment from "moment";
import {
  capitalizeWords,
  DATE_TIME_FORMAT,
} from "app/components/utilities/constant";

const FollowUpDetailsItem = (props: any) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>Lead No. </Text>
          <Text style={styles.topTxt}>
            {props?.data?.lead_no ? props?.data?.lead_no : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.topDetailsView}>
        <View style={styles.topTxtView}>
          <Text style={styles.topTxt}>{strings.visitorScore} </Text>
          <Text style={styles.topTxt}>
            {props?.data?.lead_score ? props?.data?.lead_score : 0}
          </Text>
        </View>
      </View>
      {props?.data?.property && (
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Property Name </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.data?.property?.property_title
                ? props?.data?.property?.property_title
                : strings.notfount}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Last Interacted </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.data?.followup_date
              ? moment(props?.data?.followup_date).format(DATE_TIME_FORMAT)
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Source </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.data?.created_name
              ? props?.data?.created_name
              : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status </Text>
        </View>
        <View>
          <Text>:</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props?.data?.followup_status_title
              ? props?.data?.followup_status_title
              : strings.notfount}
          </Text>
        </View>
      </View>
      {/* Property Required */}
      <>
        {props?.data?.configuration ||
        props?.data?.areain_sqlft ||
        (props?.data?.min_budget && props?.data?.max_budget) ||
        props?.data?.funding_type ||
        props?.data?.purpose ? (
          <View style={styles.headdingView}>
            <Text style={styles.headdingTxt}>{strings.propertyrequired}</Text>
          </View>
        ) : null}
        {props?.data?.configuration && (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>{strings.configurations}</Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props?.data?.configuration ||
                props?.data?.configuration === null
                  ? props?.data?.configuration
                  : strings.notfount}
              </Text>
            </View>
          </View>
        )}
        {props?.data?.areain_sqlft && (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Area (in sq.ft) </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props?.data?.areain_sqlft
                  ? props?.data?.areain_sqlft
                  : strings.notfount}
              </Text>
            </View>
          </View>
        )}
        {(props?.data?.budget_amount ||
          props?.data?.min_budget ||
          props?.data?.max_budget) && (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Budget </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props?.data?.budget_amount
                  ? props.data.budget_amount
                  : props?.data?.min_budget || props?.data?.max_budget
                  ? `${props?.data?.min_budget || ""} ${
                      props?.data?.min_budget_type || ""
                    } - ${props?.data?.max_budget || ""} ${
                      props?.data?.max_budget_type || ""
                    }`
                  : strings.notfount}
              </Text>
            </View>
          </View>
        )}
        {props?.data?.funding_type && (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Nature Of Funding </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props?.data?.funding_type
                  ? props?.data?.funding_type
                  : strings.notfount}
              </Text>
            </View>
          </View>
        )}
        {props?.data?.purpose && (
          <View style={styles.Txtview}>
            <View style={styles.projectContainer}>
              <Text style={styles.projectTxt}>Purpose </Text>
            </View>
            <View>
              <Text>:</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {props?.data?.purpose ? props?.data?.purpose : strings.notfount}
              </Text>
            </View>
          </View>
        )}
      </>
      {/* Customer Details */}
      <>
        <View style={styles.headdingView}>
          <Text style={styles.headdingTxt}>{strings.Customerdetails}</Text>
        </View>
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Visitor Name</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>{`${
              props?.data?.customer?.first_name
                ? props?.data?.customer?.first_name
                : strings.notfount
            }`}</Text>
          </View>
        </View>
        <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Resident Location</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.location ? props?.data?.customer?.location : strings.notfount}</Text>
                    </View>
                </View>
        {/* <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Age </Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.data?.customer?.age
                ? props?.data?.customer?.age
                : strings.notfount}
            </Text>
          </View>
        </View> */}
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Gender</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.data?.customer?.gender
                ? props?.data?.customer?.gender == 1
                  ? "Male"
                  : "Female"
                : strings.notfount}
            </Text>
          </View>
        </View>
        {/* <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Locality</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.locality ? props?.data?.customer?.locality : strings.notfount}</Text>
                    </View>
                </View> */}
      </>
      {/* Company Details */}
      <>
        {/* <View style={styles.headdingView}>
                    <Text style={styles.headdingTxt}>{strings.companydetails}</Text>
                </View> */}
        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Ethnicity</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.data?.customer?.ethnicity === "" ||
              props?.data?.customer?.ethnicity === undefined ||
              props?.data?.customer?.ethnicity === "undefined" ||
              props?.data?.customer?.ethnicity === null
                ? strings.notfount
                : props?.data?.customer?.ethnicity}
            </Text>
          </View>
        </View>

        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Visiting With</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.data?.customer?.visit_with === "" ||
              props?.data?.customer?.visit_with === undefined ||
              props?.data?.customer?.visit_with === "undefined" ||
              props?.data?.customer?.visit_with === null
                ? strings.notfount
                : capitalizeWords(props?.data?.customer?.visit_with)}
            </Text>
          </View>
        </View>

        <View style={styles.Txtview}>
          <View style={styles.projectContainer}>
            <Text style={styles.projectTxt}>Nature of Occupation</Text>
          </View>
          <View>
            <Text>:</Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt}>
              {props?.data?.customer?.occupation
                ? props?.data?.customer?.occupation
                : strings.notfount}
            </Text>
          </View>
        </View>
        {/* <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Company Name</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.coumpany_name ? props?.data?.customer?.coumpany_name : strings.notfount}</Text>
                    </View>
                </View> */}
        {/* <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Designation</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.desigantion ? props?.data?.customer?.desigantion : strings.notfount}</Text>
                    </View>
                </View> */}
        <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Work Location</Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.data?.customer?.office_address ? props?.data?.customer?.office_address : strings.notfount}</Text>
                    </View>
                </View>
      </>
    </ScrollView>
  );
};

export default FollowUpDetailsItem;
