import { normalizeHeight } from "../../../components/scaleFontSize";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

const PostSaleDashboardView = (props: any) => {
    const targetData = props?.dashboardData?.target || {}
    const achieveTargetData = props?.dashboardData?.achievetargetdata || {}
    return (
        <View style={styles.mainContainerWrap}>
            {/* <View style={styles.subTitleVw}>
                <Text style={styles.subTitleTxt}>This Month Incentive</Text>
                <Text style={styles.subTitleTxt}>{props?.dashboardData?.total_insantive}</Text>
            </View> */}
            <View style={styles.secondPortion}>
                {/* <View style={[styles.thirdCardView, {
                    maxHeight: normalizeHeight(150)
                }]}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Booking Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_booking_target}/{targetData?.booking_target}</Text>
                    </View>
                </View>
                <View style={[styles.thirdCardView, {
                    maxHeight: normalizeHeight(150)
                }]}>
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}>Registration Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_registration_target}/{targetData?.registration_target}</Text>
                    </View>
                </View> */}
                {/* <View style={[styles.secondCardView, {
                    maxHeight: normalizeHeight(150)
                }]}>
                    <View style={styles.cardTextView}>
                        <Text style={[styles.cardText, {
                            marginHorizontal: normalizeSpacing(16)
                        }]}>Booking Target</Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.numberText}>{achieveTargetData?.achieve_booking_target}/{targetData?.booking_target}</Text>
                    </View>
                </View> */}
            </View>
            {/* Bottom Section */}
            <View style={styles.thirdPortion}>
                <TouchableOpacity 
                onPress={() => props.onpressBooking('request', 'today')}
                style={[styles.thirdPortioncardView, {
                    maxHeight: normalizeHeight(150)
                }]}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>
                            Today's Booking
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.total_booking}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => props.onpressBooking('register', 'today')}
                style={[styles.thirdPortioncardView, {
                    minHeight: normalizeHeight(150)
                }]}>
                    <View style={styles.thirdPortionCardTextView}>
                        <Text style={styles.thirdPortionCardText}>
                            Today's Registration
                        </Text>
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.thirdPortionNumberText}>{props?.dashboardData?.total_registration}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PostSaleDashboardView;
