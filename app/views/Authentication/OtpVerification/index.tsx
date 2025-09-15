import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../../components/ErrorMessage';
import { GREEN_COLOR, RED_COLOR } from '../../../components/utilities/constant';
import strings from '../../../components/utilities/Localization';
import { otpVerify, Resendotp } from '../../../Redux/Actions/AuthActions';
import { OTPVERIFY_NULL } from '../../../Redux/types';
import OtpVerificationView from './components/OtpVerificationView';

const OtpVerificationScreen = ({ navigation, route }: any) => {
  const { type, email } = route?.params || {}
  const dispatch: any = useDispatch()
  const [otp, setOtp] = useState('');
  // const [email, setEmail,] = useState();
  const [isloading, setIsloading] = useState(false)
  const handleOtpChange = (value: any) => {
    setOtp(value);
  }

  const otpVerifySelector = useSelector((state: any) => state.otpVerifyResponce);
  //const loading = otpVerifySelector.loading

  useEffect(() => {
    checkverify()
  }, [otpVerifySelector])

  const checkverify = async () => {
    if (otpVerifySelector.response && otpVerifySelector?.otpverify) {
      if (otpVerifySelector?.response.status === 200) {
        dispatch({
          type: OTPVERIFY_NULL,
          payload: []
        })
        setIsloading(otpVerifySelector.loading)
        if (!otpVerifySelector?.resend) {
          if (type == strings.registration) {
            navigation.navigate('LoginScreenView');
          } else {
            navigation.navigate('ChangePasswordScreenView', email);
          }
        } else {

          ErrorMessage({
            msg: otpVerifySelector.response.message,
            backgroundColor: GREEN_COLOR
          })

        }
      } else {
        if (otpVerifySelector?.error) {
          dispatch({
            type: OTPVERIFY_NULL,
            payload: []
          })
          setIsloading(otpVerifySelector.loading)
          ErrorMessage({
            msg: otpVerifySelector.response.message,
            backgroundColor: RED_COLOR
          })
        }
      }
    }/* else {
        ErrorMessage({
          msg: otpVerifySelector.response.message,
          backgroundColor: RED_COLOR
        })
        
      } */
  }


  const OnpressConfirm = () => {
    if (validation()) {
      setIsloading(true)
      const params = {
        email: email,
        otp: otp
      }
      dispatch(otpVerify(params))
      //navigation.navigate('ChangePasswordScreenView')
    }
  }
  const handleResendOtp = () => {
    setIsloading(true)
    const params = {
      email: email,
    }
    dispatch(Resendotp(params))
  }

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''

    if (otp == undefined || otp == '') {
      isError = false;
      errorMessage = strings.otprequired
    }

    if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }

  return (
    <>
      <OtpVerificationView
        otp={otp}
        setOtp={setOtp}
        OnpressConfirm={OnpressConfirm}
        handleOtpChange={handleOtpChange}
        handleResendOtp={handleResendOtp}
        email={email}
      />
    </>
  )
}

export default OtpVerificationScreen