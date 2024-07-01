import { View, Text, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import EscalateView from './components/EscalateView'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveTicket, escalateReqTicket, getEscalateUsersList } from 'app/Redux/Actions/SupportActions'
import ErrorMessage from 'app/components/ErrorMessage'
import { GREEN_COLOR, RED_COLOR } from 'app/components/utilities/constant'
import strings from 'app/components/utilities/Localization'

const EscalateScreen = ({ navigation, route }: any) => {
    const data = route?.params || {}
    const dispatch: any = useDispatch()
    const { response = {} } = useSelector((state: any) => state.SupportData)
    const supportAddData = useSelector((state: any) => state.SupportAdd)
    const [escalateUsers, setEscalateUsers] = useState<any>([])
    const [allList, setAllList] = useState([])
    const [cpList, setCpList] = useState<any>([]);
    const [searchUserList, setSearchUserList] = useState<any>([]);
    const [selectedCp, setSelected] = useState<any>([]);
    const [selectedLoginIdCp, setSelectedLoginIdCp] = useState<any>([]);
    useFocusEffect(
        React.useCallback(() => {
            dispatch(
                getEscalateUsersList({
                    ticket_id: data?._id
                })
            );
            return () => { };
        }, [navigation])
    );

    useEffect(() => {
        if (response?.status === 200) {
            setEscalateUsers(response?.data)
            setSearchUserList(response?.data)
        }
    }, [response])


    useEffect(() => {
        if (supportAddData?.response?.status === 200) {
            navigation.goBack()
            dispatch(RemoveTicket())
            ErrorMessage({
                msg: supportAddData?.response?.message,
                backgroundColor: GREEN_COLOR
            })
        }
    }, [supportAddData?.response])
    const validation = () => {
        let isError = true;
        let errorMessage: any = ''
        if (selectedCp.length === 0) {
            isError = false;
            errorMessage = strings.pleaseSelectToEscalate
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

    const handleSelects = (items: any, index: any) => {
        // var array: any[] = [...selectedCp];
        // var arrayLoginID: any[] = [...selectedLoginIdCp];
        // array.push(items);
        // arrayLoginID.push(items._id);
        setSelectedLoginIdCp(items?._id);
        setSelected(items);
    };
    const handleDelete = (items: any, index: any) => {
        // var arrays: any[] = [...selectedCp];
        // var arrayLoginID: any[] = [...selectedLoginIdCp];
        // arrays?.splice(index, 1);
        // arrayLoginID?.splice(index, 1);
        setSelectedLoginIdCp([]);
        setSelected({});
    };
    const handleSearch = (searchKey: any) => {
        if (searchKey !== "") {
            const lowerCased = searchKey.toLowerCase();
            const searchArray = [...escalateUsers];
            const list = searchArray.filter((item) => {
                return item.user_name.toLowerCase().match(lowerCased);
            });
            setEscalateUsers(list);
        } else {
            setEscalateUsers(searchUserList);
        }
    };
    const handleAddTarget = () => {
        if(validation()){
            dispatch(
                escalateReqTicket({
                    ticket_id: data?._id,
                    assign_to: selectedLoginIdCp,
                })
            );
        }
    };



    const handleBackPress = () => {
        navigation.goBack()
    }
    return (
        <EscalateView
            handleBackPress={handleBackPress}
            escalateUsers={escalateUsers}
            handleSelects={handleSelects}
            setSelectedLoginIdCp={setSelectedLoginIdCp}
            selectedLoginIdCp={selectedLoginIdCp}
            cpList={cpList}
            selectedCp={selectedCp}
            handleSearch={handleSearch}
            handleDelete={handleDelete}
            handleAddTarget={handleAddTarget}
            allList={allList} setAllList={setAllList}
        />
    )
}

export default EscalateScreen