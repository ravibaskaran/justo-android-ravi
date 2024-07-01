import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR } from 'app/components/utilities/constant'
import ComingSoonScreen from 'app/components/CommonScreen/ComingSoon'

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