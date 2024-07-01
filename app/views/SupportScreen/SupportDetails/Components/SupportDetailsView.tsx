import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styles from './styles'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { PRIMARY_THEME_COLOR } from 'app/components/utilities/constant'
import SupportDetailsItem from './SupportDetailsItem'
import Button from 'app/components/Button'

const SupportDetailsView = (props: any) => {
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.ticketDetails}
        handleOnLeftIconPress={props.handleBackPress}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={'light-content'}
      />
      <View style={{ flex: 1 }}>
        <SupportDetailsItem item={props.ticketDetailsData} />
      </View>
      <View style={styles.btnContainer}>
        {props.type === 0 && props?.ticketDetailsData?.status === 1 ?
          (
            <>
              <Button
                width={160}
                height={50}
                buttonText={strings.escalate}
                btnTxtsize={15}
                handleBtnPress={() => props.onPressEscalate(props.ticketDetailsData)}
              />
              <Button
                width={160}
                height={50}
                buttonText={strings.Statusupdate}
                btnTxtsize={15}
                handleBtnPress={() => props.onPressStatusUpdate()}
              />
            </>
          )
          :
          <Button
            width={160}
            height={50}
            buttonText={strings.showreply}
            btnTxtsize={15}
            handleBtnPress={() => props.onPressReply()}
          />
        }
      </View>
      {props.type === 0 && props?.ticketDetailsData?.status === 1 ?
        (<View style={styles.btnContainer}>
          <Button
            width={160}
            height={50}
            buttonText={strings.showreply}
            btnTxtsize={15}
            handleBtnPress={() => props.onPressReply()}
          />
        </View>)
        : null
      }
    </View>
  )
}

export default SupportDetailsView