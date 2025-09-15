import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import images from '../../../../assets/images'
import Button from '../../../../components/Button'
import EmptyListScreen from '../../../../components/CommonScreen/EmptyListScreen'
import Header from '../../../../components/Header'
import strings from '../../../../components/utilities/Localization'
import { GREEN_COLOR, PRIMARY_THEME_COLOR, PURPLE_COLOR, RED_COLOR, WHITE_COLOR } from '../../../../components/utilities/constant'
import styles from './styles'

const ShowReply = () => {
  const navigation: any = useNavigation()
  const [replyData, setReplyData] = useState<any>([])
  const { response = {}, detail = false } = useSelector((state: any) => state.SupportData) || []
  const { userData = {} } = useSelector((state: any) => state.userData)

  useFocusEffect(
    React.useCallback(() => {
      setReplyData(response.data)
      return () => { };
    }, [navigation])
  )

  const onPressStatusUpdate = (data: any) => {
    navigation.navigate('TicketStatusUpdate', {data: {...data, ticket_id: replyData?._id, reply_ticket_id: data?._id}, type: 'edit'})
  }


  const handleBackPress = () => {
    navigation.goBack()
  }
  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.ticketReply}
        handleOnLeftIconPress={() => handleBackPress()}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={'light-content'}
      />
      <ScrollView>
        <View style={styles.topDetailsView}>
          <View style={styles.topTxtView}>
            <Text style={styles.topTxt}>Ticket No. </Text>
            <Text style={styles.topTxt}>{replyData?.ticket_number ? replyData?.ticket_number : strings.notfount}</Text>
          </View>
        </View>
        <View>
          <FlatList
removeClippedSubviews={false}
            data={Array.isArray(replyData?.reply_support_ticket) ? replyData?.reply_support_ticket : []}
            renderItem={({ item }: any) => {
              return (
                <View style={styles.replyView}>
                  <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                      <Text style={styles.projectTxt}>Update By </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt}>{item.update_by_name ? item.update_by_name : strings.notfount}</Text>
                    </View>
                  </View>
                  <View style={styles.Txtview}>
                    <View style={styles.projectContainer}>
                      <Text style={styles.projectTxt}>Status </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                      <Text style={[styles.nameTxt, {
                        color: item.status === 1 ? GREEN_COLOR : RED_COLOR
                      }]}>
                        {
                          item.status === 1 ? 'Open' :
                            item.status === 2 && 'Close'
                        }
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.Txtview, { borderBottomWidth: 0 }]}>
                    <View style={styles.projectContainer}>
                      <Text style={styles.projectTxt}>Description </Text>
                    </View>
                    <View><Text>:</Text></View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt}>{item.remark ? item.remark : strings.notfount}</Text>
                    </View>
                  </View>
                  {userData?.data?.user_id === item?.create_by ?
                    (<View style={styles.buttonContainer}>
                      <Button
                        width={120}
                        height={30}
                        bgcolor={WHITE_COLOR}
                        bordercolor={PURPLE_COLOR}
                        borderWidth={1}
                        btnTxtcolor={PURPLE_COLOR}
                        buttonText={strings.edit}
                        btnTxtsize={14}
                        border={10}
                        handleBtnPress={() => {
                          onPressStatusUpdate(item)
                        }}
                      />
                    </View>)
                    : null
                  }
                </View>
              )
            }}
            ListEmptyComponent={() => (
              <EmptyListScreen message={strings.ticketReply} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default ShowReply