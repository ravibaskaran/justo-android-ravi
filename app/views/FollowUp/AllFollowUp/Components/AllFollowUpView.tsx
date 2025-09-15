import React from 'react'
import { FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import images from '../../../../assets/images'
import EmptyListScreen from '../../../../components/CommonScreen/EmptyListScreen'
import Header from '../../../../components/Header'
import strings from '../../../../components/utilities/Localization'
import AllFollowUpItem from './AllFollowUpItem'
import styles from './Styles'

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
removeClippedSubviews={false}
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