import React from 'react';
import { Text, View } from 'react-native';
import { normalize } from '../../../../components/scaleFontSize';
import { FONT_FAMILY_EXTRABOLD, FONT_FAMILY_REGULAR, } from '../../../../components/utilities/constant';
import styles from './styles';

const LeaderBoardCPItems = (props: any) => {
    const index = props?.indexs + 1 || 0
    const item = props?.items || {}
    return (
        <View style={styles.IteamView}>
            <Text style={[styles.txtStyle, {
                flex: 1,
                fontFamily: props?.userDataResp?._id?.toString() === item?.user_id?.toString() ?
                    FONT_FAMILY_EXTRABOLD : FONT_FAMILY_REGULAR
            }]}>{props?.userDataResp?._id?.toString() === item?.user_id?.toString() ?
                "Your Name" : "CP Name " + index}</Text>
            <Text style={[styles.txtStyle, {
                flex: 1,
                textAlign: 'center',
                marginLeft: normalize(30),
                fontFamily: props?.userDataResp?._id?.toString() === item?.user_id?.toString() ?
                    FONT_FAMILY_EXTRABOLD : FONT_FAMILY_REGULAR
            }]}>{index}</Text>
            <Text style={[styles.txtStyle, {
                flex: 1,
                textAlign: 'right',
                marginRight: normalize(10),
                fontFamily: props?.userDataResp?._id?.toString() === item?.user_id?.toString() ?
                    FONT_FAMILY_EXTRABOLD : FONT_FAMILY_REGULAR
            }]}>{item?.total_sold}</Text>
        </View>
    );
};

export default LeaderBoardCPItems;
