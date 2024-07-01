import { View, Text, Image, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'
import Button from 'app/components/Button'
import strings from 'app/components/utilities/Localization'
import { WHITE_COLOR, PRIMARY_THEME_COLOR, CALL_COLOR, PURPLE_COLOR, BLUE_COLOR, BLACK_COLOR, GREEN_COLOR, RED_COLOR } from 'app/components/utilities/constant'
import images from 'app/assets/images'
import moment from 'moment'

const SupportItem = (props: any) => {
  return (
    <View style={styles.IteamView}>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Ticket No :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.ticket_number ? props.items.ticket_number : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Ticket :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.title ? props.items.title : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Create By :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.create_by_name ? props.items.create_by_name : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Issue :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.reason_title ? props.items.reason_title : strings.notfount}
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Date :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.nameTxt}>
            {props.items.createdDate ?
              moment(props.items.createdDate).format("DD-MM-YYYY")
              : strings.notfount
            }
          </Text>
        </View>
      </View>
      <View style={styles.Txtview}>
        <View style={styles.projectContainer}>
          <Text style={styles.projectTxt}>Status :</Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[styles.nameTxt, {
            color: props.items.status === 1 ? GREEN_COLOR : RED_COLOR
          }]}>
            {
              props.items.status === 1 ? 'Open' :
                props.items.status === 2 && 'Close'
            }
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {
        props.index === 0 && props.items.status === 1 ? (
          <>
            <Button
              width={120}
              height={30}
              bgcolor={WHITE_COLOR}
              bordercolor={BLUE_COLOR}
              borderWidth={1}
              btnTxtcolor={BLUE_COLOR}
              buttonText={strings.updatestatus}
              btnTxtsize={14}
              border={10}
              handleBtnPress={() => { props.onPressStatusUpdate(props.items) }}
            />
            <Button
              width={120}
              height={30}
              bgcolor={WHITE_COLOR}
              bordercolor={BLACK_COLOR}
              borderWidth={1}
              btnTxtcolor={BLACK_COLOR}
              buttonText={strings.escalate}
              btnTxtsize={14}
              border={10}
              handleBtnPress={() => { props.onPressEscalate(props.items) }}
            />
          </>
        )
          :
          props.items.status === 1 ?
          (
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
                props.handleEditTicket(props.items)
              }}
            />
          )
          : <View />
        }
        <TouchableOpacity style={styles.Viewbutton}
          onPress={() => props.onPressView(props.items)}
        >
          <Image
            source={images.forwardArrow}
            style={styles.arrow}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SupportItem