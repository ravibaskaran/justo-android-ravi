import React from 'react'
import { View, Text } from 'react-native';
import styles from './styles'
import strings from '../utilities/Localization'

const ComingSoonScreen = (props: any) => {
    return (
        <View style={[styles.centered, { marginTop: 0 }]}>
            <Text style={props.textStyle ? props.textStyle : styles.title}>{strings.comingSoon}</Text>
        </View>
    )

};

export default ComingSoonScreen;