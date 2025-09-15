import moment from 'moment'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DATE_TIME_FORMAT, WHITE_COLOR } from '../../../../components/utilities/constant'
import strings from '../../../../components/utilities/Localization'
import styles from './Styles'

const AllFollowUpItem = (props: any) => {

    return (
        <ScrollView>
            <View style={{marginBottom: 20,borderBottomWidth:8,borderBottomColor:WHITE_COLOR}}>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Follow-Up By </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props.items.creator_name}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Status </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props.items.followup_status}</Text>
                    </View>
                </View>
                <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Date </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{moment(props.items.followup_date).format(DATE_TIME_FORMAT)}</Text>
                    </View>
                </View>
                {props?.items?.resiontitle?.length > 0 ? <View style={styles.Txtviewlast}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Disposition </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props?.items?.resiontitle?.length > 0 ? props?.items?.resiontitle[0] : strings.notfount}</Text>
                    </View>
                </View> : null}
                <View style={styles.Txtviewlast}>
                    <View style={styles.projectContainer}>
                        <Text style={styles.projectTxt}>Description </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt}>{props.items.remark ? props.items.remark : strings.notfount}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AllFollowUpItem