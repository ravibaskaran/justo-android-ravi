import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import strings from '../../../../components/utilities/Localization';
import { BLACK_COLOR, YELLOW_COLOR } from '../../../../components/utilities/constant';

const FollowUpListItem = (props: any) => {
    return (
        <View style={styles.IteamView}>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.followUpBy} :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.followupBy}</Text>
                </View>
            </View>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.status} :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.status}</Text>
                </View>
            </View>
            <View style={styles.Txtview} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.dateTime} :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.date}</Text>
                </View>
            </View>
            <View style={[styles.Txtview, { borderBottomWidth: 0 }]} >
                <View style={styles.projectContainer}>
                    <Text style={styles.projectTxt}>{strings.description} :</Text>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{props.items.description}</Text>
                </View>
            </View>
        </View>
    );
};

export default FollowUpListItem;
