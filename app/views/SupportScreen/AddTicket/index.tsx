import { View, Text, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddTicketForm from './Components/AddTicketForm'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMaster } from 'app/Redux/Actions/MasterActions'
import ErrorMessage from 'app/components/ErrorMessage'
import { GREEN_COLOR, RED_COLOR } from 'app/components/utilities/constant'
import { AddNewTicket, EditTicket, RemoveTicket } from 'app/Redux/Actions/SupportActions'
import strings from 'app/components/utilities/Localization'

const AddTicketScreen = ({ navigation, route }: any) => {
    const { data, type } = route?.params || {}
    const dispatch: any = useDispatch()
    const [addTicketData, setAddTicketData] = useState<any>({})
    const [masterData, setMasterData] = useState([])
    const { response = {} } = useSelector((state: any) => state.masterData)
    const SupportResponse = useSelector((state: any) => state.SupportAdd)

    useFocusEffect(
        React.useCallback(() => {
            dispatch(getAllMaster({
                type: 11
            }))
            return () => { };
        }, [navigation])
    );

    useEffect(() => {
        if (response?.status === 200) {
            if (response?.data?.length > 0) {
                setMasterData(response?.data)
            }
        }
        setAddTicketData({
            ticket_id: data?._id,
            reason: data?.reason,
            title: data?.title,
            remark: data?.remark
        })
    }, [response, data])

    useEffect(() => {
        if (SupportResponse?.response?.status === 200) {
            navigation.goBack()
            dispatch(RemoveTicket())
            ErrorMessage({
                msg: SupportResponse?.response?.message,
                backgroundColor: GREEN_COLOR
            })
        }
    }, [SupportResponse])

    const validation = () => {
        let isError = true;
        let errorMessage: any = ''
        if (addTicketData.reason == undefined || addTicketData.reason == '') {
            isError = false;
            errorMessage = "Issue is require. Please Choose the Issue"
        }
        else if (addTicketData.title == undefined || addTicketData.title?.trim() == '') {
            isError = false;
            errorMessage = "Title is require. Please Enter the Title"
        }
        else if (addTicketData.remark == undefined || addTicketData.remark?.trim() == '') {
            isError = false;
            errorMessage = "Description is require. Please Enter the Description"
        }

        if (errorMessage !== '') {
            ErrorMessage({
                msg: errorMessage,
                backgroundColor: RED_COLOR
            })
        }
        if(!isError){
            Keyboard.dismiss()
          }
        return isError;
    }
    const onPressAddTicket = () => {

        if (validation()) {
            const formData: any = new FormData()
            if (type === strings.edit) {
                formData.append("ticket_id", addTicketData?.ticket_id)
            }
            formData.append("reason", addTicketData?.reason)
            formData.append("title", addTicketData?.title?.trim())
            formData.append("remark", addTicketData?.remark?.trim())
            formData.append("image", addTicketData?.image)
            if (type === strings.edit) {
                dispatch(EditTicket(formData))
            } else {
                dispatch(AddNewTicket(formData))
            }
        }
    }
    const handleBackPress = () => {
        navigation.goBack()
    }
    return (
        <AddTicketForm
            handleBackPress={handleBackPress}
            addTicketData={addTicketData}
            setAddTicketData={setAddTicketData}
            masterData={masterData}
            onPressAddTicket={onPressAddTicket}
            type={type}
        />
    )
}

export default AddTicketScreen