import moment from "moment";
import React from "react";
import { View, Text } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../../../components/utilities/constant";
import strings from "../../../../components/utilities/Localization";
import styles from "./styles";

const StatsView = (props: any) => {
    const item = props?.items || {}
    const current_target = item?.current_target?.length > 0 ? item?.current_target?.[0] : []
    const achievetargetdata = item?.achievetargetdata?.length > 0 ? item?.achievetargetdata?.[0] : []
    return (
        <ScrollView>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.total + " " + strings.visit}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.total_visit}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.total + " " + strings.siteVisit}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.total_site_visit}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.total + " " + strings.booking}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.total_closing_lead}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.closingPrcntg}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.total_closing_percentage}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>Last Login</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{moment(item?.user_states?.last_login).format(DATE_TIME_FORMAT)}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.last + " " + strings.leadCreate} </Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.last_visit ?
                        moment(item?.user_states?.last_visit).format(DATE_TIME_FORMAT)
                        : strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.last + " " + strings.siteVisit}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item?.user_states?.last_site_visit ?
                        moment(item?.user_states?.last_site_visit).format(DATE_TIME_FORMAT) :
                        strings.notfount}</Text>
                </View>
            </View>
            <View style={styles.Txtview}>
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.last + " " + strings.closeVisit}</Text>
                </View>
                <View><Text>:</Text></View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{
                        item?.user_states?.last_closing_lead ?
                            moment(item?.user_states?.last_closing_lead).format(DATE_TIME_FORMAT) :
                            strings.notfount
                    }</Text>
                </View>
            </View>
            { item?.current_target?.length > 0 &&
            (
                <>
                    <Text style={styles.bigTitlesTxt}>Current Target</Text>
                    <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Visit target</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {current_target?.visit_target ?

                                    `${achievetargetdata?.achieve_visit_target ? achievetargetdata?.achieve_visit_target : 0} / ${current_target?.visit_target ? current_target?.visit_target : 0}`
                                    : strings.notfount
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.Txtview, { borderTopWidth: 1 }]}>
                        <View style={styles.projectContainer}>
                            <Text style={styles.projectTxt}>Site visit target</Text>
                        </View>
                        <View><Text>:</Text></View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt}>
                                {current_target?.site_visit_target  ?

                                    `${achievetargetdata?.achieve_site_visit_target ? achievetargetdata?.achieve_site_visit_target : 0} / ${current_target?.site_visit_target ? current_target?.site_visit_target : 0}`
                                    : strings.notfount
                                }
                            </Text>
                        </View>
                    </View>
                </>
            )}
        </ScrollView>
    )
}
export default StatsView