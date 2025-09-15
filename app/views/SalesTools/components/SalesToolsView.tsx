import React from 'react'
import { View } from 'react-native'
import images from '../../../assets/images'
import ComingSoonScreen from '../../../components/CommonScreen/ComingSoon'
import Header from '../../../components/Header'
import strings from '../../../components/utilities/Localization'
import { PRIMARY_THEME_COLOR } from '../../../components/utilities/constant'
import styles from './styles'

const SalesToolsView = (props: any) => {
    return (
        <View style={styles.mainContainer}>
            <Header
                leftImageSrc={images.menu}
                // rightFirstImageScr={images.filter}
                // rightSecondImageScr={images.notification}
                headerText={strings.saleToolHeader}
                handleOnLeftIconPress={props.handleDrawerPress}
                headerStyle={styles.headerStyle}
                RightFirstIconStyle={styles.RightFirstIconStyle}
                statusBarColor={PRIMARY_THEME_COLOR}
                barStyle={'light-content'}
            />
            <ComingSoonScreen />
        </View>
    )
}

export default SalesToolsView