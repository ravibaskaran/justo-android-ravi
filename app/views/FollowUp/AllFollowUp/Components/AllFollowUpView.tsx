import { View, Text, StatusBar, FlatList } from 'react-native'
import React from 'react'
import styles from './Styles'
import { PRIMARY_THEME_COLOR, PRIMARY_THEME_COLOR_DARK } from '../../../../components/utilities/constant'
import Header from '../../../../components/Header'
import images from '../../../../assets/images'
import strings from '../../../../components/utilities/Localization'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AllFollowUpItem from './AllFollowUpItem'
import { useSelector } from 'react-redux'
import EmptyListScreen from 'app/components/CommonScreen/EmptyListScreen'

const AllFollowUpView = (props: any) => {
  const { response = {}, list = '' } = useSelector((state: any) => state.followUp)
  return (
    <View style={styles.mainConatiner}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.allfollowup}
        handleOnLeftIconPress={props.handleBackPres}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
      />
      <View style={styles.iteamView}>
        <FlatList
          data={Array.isArray(props?.allFollowUpList) ? props?.allFollowUpList : []}
          ListEmptyComponent={<EmptyListScreen message={strings.allfollowup} />}
          renderItem={({ item }) => <AllFollowUpItem items={item} />}
          onEndReached={() => {
            if (props?.allFollowUpList?.length < response?.total_data) {
              props.getAllFollowupList(props?.allFollowUpList?.length >= 3 ? props.offSET + 1 : 0)
            }
          }}
          onRefresh={() => props.getAllFollowupList(0, {})}
          refreshing={false}
        />
      </View>
    </View>
  )
}

export default AllFollowUpView