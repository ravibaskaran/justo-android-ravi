import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ErrorMessage from '../../../components/ErrorMessage'
import { RED_COLOR } from '../../../components/utilities/constant'
import strings from '../../../components/utilities/Localization'
import { forgotemailverify } from '../../../Redux/Actions/AuthActions'
import { FORGOT_NULL } from '../../../Redux/types'
import ForgotPasswordView from './components/ForgotPasswordView'

const ForgotPassword = ({navigation}: any) => {
  const dispatch: any = useDispatch()
  const [email, setEmail] = useState('')
  const [isloading, setIsloading] = useState(false)

  const forgotSelector = useSelector((state: any) => state.forgotResponce);
  useEffect(() => {
    checklogin()
  }, [forgotSelector])

  const checklogin = async () => {
      if (forgotSelector.response && forgotSelector.forgot) {
        if (forgotSelector.response.status === 200) {
              dispatch({
                type: FORGOT_NULL,
                payload: []
            })
            setIsloading(forgotSelector.loading)
           navigation.navigate('OtpVerificationScreenView',{email: email?.trim()});
        } else {
          if(forgotSelector.error){
            setIsloading(forgotSelector.loading)
            ErrorMessage({
              msg: forgotSelector.response.message,
              backgroundColor: RED_COLOR
            })
          }
        }
      }/* else {
        ErrorMessage({
          msg: forgotSelector.response.message,
          backgroundColor: RED_COLOR
        })
        
      } */
  }

  const validation = () => {
    let isError = true;
    let errorMessage: any = ''
   
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email?.trim()) === false) {
      isError = false;
      errorMessage = strings.correctemail
    }
    if (email == undefined || email?.trim() == '') {
      isError = false;
      errorMessage = strings.emailrequired
  }
   
   if (errorMessage !== '') {
      ErrorMessage({
        msg: errorMessage,
        backgroundColor: RED_COLOR
      })
    }
    return isError;
  }
  
  const handleOtp = () => {
    if(validation()){
      setIsloading(true)
      const params = {
        email:email?.trim()
      }
      dispatch(forgotemailverify(params))

       //navigation.navigate('OtpVerificationScreenView')
    }
  }
  return (
    <>
   <ForgotPasswordView
    handleOtp={handleOtp} 
    email={email} 
    setEmail={setEmail}/> 
  </>
  )
}

export default ForgotPassword