import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import images from '../../../../assets/images';
import { normalize, normalizeHeight, normalizeWidth } from '../../../../components/scaleFontSize';
import { FONT_FAMILY_EXTRABOLD, FONT_FAMILY_REGULAR,  } from '../../../../components/utilities/constant';

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
