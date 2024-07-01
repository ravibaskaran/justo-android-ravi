import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Header from 'app/components/Header'
import images from 'app/assets/images'
import strings from 'app/components/utilities/Localization'
import { GREEN_COLOR, PRIMARY_THEME_COLOR, RED_COLOR } from 'app/components/utilities/constant'
import Button from 'app/components/Button'
import InputField from 'app/components/InputField'
import DropdownInput from 'app/components/DropDown'
import { normalizeSpacing } from 'app/components/scaleFontSize'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicket, updateTicketStatus } from 'app/Redux/Actions/SupportActions'
import ErrorMessage from 'app/components/ErrorMessage'

const TicketStatusUpdate = ({ route }: any) => {
  const { data, type } = route?.params || {}
  const [statusUpdate, setStatusUpdate] = useState<any>([])
  const navigation: any = useNavigation()
  const dispatch: any = useDispatch()
  const { response = {} } = useSelector((state: any) => state.SupportAdd)

  useFocusEffect(
    React.useCallback(() => {
      if (type === 'edit') {
        setStatusUpdate({
          status: data?.status,
          remark: data?.remark,
          ticket_id: data?.ticket_id ? data?.ticket_id : data?._id,
          reply_support_ticket_id: data?.reply_ticket_id
        })
      }

      return () => { };
    }, [navigation])
  )

  useEffect(() => {
    if (response?.status === 200) {
      if (type === 'edit') {
        navigation.navigate('Support')
      } else {
        navigation.goBack()
      }
      dispatch(RemoveTicket())
      ErrorMessage({
        msg: response?.message,
        backgroundColor: GREEN_COLOR
      })
    }
  }, [response])

  const handleBackPress = () => {
    navigation.goBack();
  };
  const validation = () => {
    let isError = true;
    let errorMessage: any = "";
    if (statusUpdate.status == undefined || statusUpdate.status == "") {
      isError = false;
      errorMessage = "Status is require. Please Choose the Status";
    } else if (statusUpdate.remark == undefined || statusUpdate.remark == "") {
      isError = false;
      errorMessage = "Description is require. Please Enter the Description";
    }

    if (errorMessage !== "") {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR,
      });
    }
    return isError;
  };

  const handleUpdateStaus = () => {
    if (validation()) {
      dispatch(
        updateTicketStatus({
          ticket_id: type === 'edit' ? statusUpdate?.ticket_id : data?._id,
          status: statusUpdate?.status,
          remark: statusUpdate?.remark,
          reply_support_ticket_id: statusUpdate?.reply_support_ticket_id
        })
      );
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        leftImageSrc={images.backArrow}
        rightSecondImageScr={images.notification}
        headerText={strings.ticketStatusUpdate}
        handleOnLeftIconPress={() => handleBackPress()}
        headerStyle={styles.headerStyle}
        RightFirstIconStyle={styles.RightFirstIconStyle}
        leftImageIconStyle={styles.RightFirstIconStyle}
        statusBarColor={PRIMARY_THEME_COLOR}
        barStyle={"light-content"}
      />
      <View style={styles.topItemsVw}>
        <View style={styles.inputWrap}>
          <DropdownInput
            require={true}
            headingText={"Status"}
            placeholder={"Status"}
            data={[
              { value: 1, lable: "Open" },
              { value: 2, lable: "Close" },
            ]}
            inputWidth={"100%"}
            paddingLeft={16}
            maxHeight={300}
            labelField="lable"
            valueField={"value"}
            value={statusUpdate?.status}
            onChange={(item: any) => {
              setStatusUpdate({
                ...statusUpdate,
                status: item.value,
              });
            }}
            newRenderItem={(item: any) => {
              return (
                <View style={styles.item}>
                  <Text style={styles.textItem}>{item.lable}</Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.inputWrap}>
          <InputField
            require={true}
            headingText={"Description"}
            placeholderText={"Description"}
            handleInputBtnPress={() => { }}
            onChangeText={(val: any) => {
              setStatusUpdate({
                ...statusUpdate,
                remark: val,
              });
            }}
            multiline={true}
            inputheight={100}
            valueshow={statusUpdate.remark}
          />
        </View>
        <View style={{ marginTop: normalizeSpacing(20) }}>
          <Button
            buttonText={strings.updateStatus}
            handleBtnPress={() => {
              handleUpdateStaus();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TicketStatusUpdate;
