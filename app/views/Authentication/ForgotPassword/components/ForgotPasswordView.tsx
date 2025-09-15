import React from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'
import images from '../../../../assets/images'
import Button from '../../../../components/Button'
import InputField from '../../../../components/InputField'
import strings from '../../../../components/utilities/Localization'
import styles from './Styles'
// import LogoView from '../../Logoview'
import CheckBox from '@react-native-community/checkbox'
import { ScrollView } from 'react-native-gesture-handler'
import { Isios, PRIMARY_THEME_COLOR } from '../../../../components/utilities/constant'

const ForgotPasswordView = (props: any) => {
  return (
    <ScrollView style={styles.mainContainer}>
      
      {/* <View style={styles.logoView}>
         <LogoView/>
      </View> */}
      <View style={styles.logoView}>
          <Image style={styles.logoImage} source={images.logoWhiteBG} />
      </View>
      
      <View style={styles.inputView}>
        <View style={styles.inputWrap}>
          <InputField
            placeholderText={strings.email + " " + strings.address}
            headingText={strings.email + " " + strings.address}
            rightImgSrc={images.emailIcon}
            isSecureText={false}
            onChangeText={(val: any) => {
              props.setEmail(val)
            }}
          />
        </View>
     
      <View style={styles.btnView}>
        <Button
            buttonText={strings.sendotp}
            capitalize={true}
            handleBtnPress={props.handleOtp}
         />
      </View>
      </View>
      {/* <View style={styles.bottomView}>
      <Text style={styles.bottomText}>{strings.byCreating}</Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.and} </Text>
        <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.bottomView}>
        <CheckBox
          value={true}
          disabled={true}
          tintColors={{true: PRIMARY_THEME_COLOR}}
          style={{ transform: Isios ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]  : [{ scaleX: 1 }, { scaleY: 1 }]}}
          // onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
        <Text style={styles.bottomText}>{strings.iAknowledge}</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://justoverse.com/termandcondition')}  style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.termsAndCondition} </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> {strings.applicable} </Text>
        {/* <TouchableOpacity style={styles.spanTouch}>
          <Text style={styles.spanText}> {strings.privacyPolicy} </Text>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  )
}

export default ForgotPasswordView