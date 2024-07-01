import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, } from "react-native";
import styles from "./styles";
import strings from "../../../components/utilities/Localization";
import { ROLE_IDS } from "app/components/utilities/constant";

const SourcingDashboardView = (props: any) => {
    const targetData = props?.dashboardData?.target || {}
    const achieveTargetData = props?.dashboardData?.achievetarget || {}
    const role = props?.getLoginType?.response?.data?.role_id || null
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.secondPortion}>
                {/* <View style={styles.firstCardView}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Visit Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_visit_target}/{targetData?.visit_target}</Text>
                    </View>
                </View>
                <View style={styles.secondCardView}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Site Visit Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_site_visit_target}/{targetData?.site_visit_target}</Text>
                    </View>
                </View> */}
            </View>
            {/* Bottom Section */}
            <View style={styles.thirdPortion}>
                <TouchableOpacity
                    onPress={() => props.onPressTodayVisit('today')}
                    style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>{strings.todayLead}</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.today_visit}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.onPressSiteVisit('today')}
                    style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText} numberOfLines={2}>
                            Today's Site Visit
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.today_site_visit}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        role === ROLE_IDS.sourcingtl_id ?
                        props.onPressSMList() :
                        props.onPressCPList()
                    }}
                    style={styles.thirdPortioncardView}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>{role === ROLE_IDS.sourcingtl_id ? 'Active SM' : 'Active CP'}</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{
                            role === ROLE_IDS.sourcingtl_id ? props?.dashboardData?.total_sorcing_manager : props?.dashboardData?.active_cp
                        }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SourcingDashboardView;
