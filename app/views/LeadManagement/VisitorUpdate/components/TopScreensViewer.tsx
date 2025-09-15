
import React from "react";
import { Text, View } from 'react-native';
import { BG_MAIN_COLOUR, PRIMARY_THEME_COLOR } from "../../../../components/utilities/constant";
import styles from "./styles";

const TopScreensViewer = (props: any) => {
    return (
        <View style={styles.topScreensVw}>
            <View style={[styles.topItemsVw, {
                backgroundColor: props.type >= 0 ? PRIMARY_THEME_COLOR : BG_MAIN_COLOUR
            }]}>
                <Text style={styles.topTxts}>1</Text>
            </View>
            <View style={[styles.borders, {
                backgroundColor: props.type >= 0 ? PRIMARY_THEME_COLOR : BG_MAIN_COLOUR
            }]} />
            <View style={[styles.topItemsVw, {
                backgroundColor: props.type >= 1 ? PRIMARY_THEME_COLOR : BG_MAIN_COLOUR
            }]}>
                <Text style={styles.topTxts}>2</Text>
            </View>
            <View style={[styles.borders, {
                backgroundColor: props.type >= 1 ? PRIMARY_THEME_COLOR : BG_MAIN_COLOUR
            }]} />
            <View style={[styles.topItemsVw, {
                backgroundColor: props.type === 2 ? PRIMARY_THEME_COLOR : BG_MAIN_COLOUR
            }]}>
                <Text style={styles.topTxts}>3</Text>
            </View>
        </View>
    )
}
export default TopScreensViewer