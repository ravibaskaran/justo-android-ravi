import { useFocusEffect } from '@react-navigation/native';
import { AddTargetForCpAction, removeAddTarget } from 'app/Redux/Actions/AgencyActions';
import { getClosingManagerList } from 'app/Redux/Actions/ClosingManager';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClosingDetailsView from './components/ClosingManger'
import ErrorMessage from 'app/components/ErrorMessage';
import { GREEN_COLOR } from 'app/components/utilities/constant';

const ClosingDetailScreen = ({ navigation, route }: any) => {
    const {type} = route?.params || {}
    const [status, setStatus] = useState(false)
    const [filterisVisible, setFilterisVisible] = useState(false)
    const [ClosingManagers, setClosingManagers] = useState<any>([])
    const [offSET, setOffset] = useState(0)
    const dispatch: any = useDispatch()
    const { response = {}, list = '' } = useSelector((state: any) => state.ClosingManager) || {}
    const AddTargetForCp = useSelector((state: any) => state.addTargetForCpData);
    const [filterData, setFilterData] = useState({
        start_date: '',
        end_date: '',
        followup_for: ''
    })
    const [isVisible, setIsVisible] = useState<any>(false);
    const [selectedUserForTarget, setSelectedUserForTarget] = useState<any>([]);
    const [roleIdForSelectedUser, setRoleIdForSelectedUser] = useState<any>([]);
    const [targetForm, setTargetForm] = useState<any>({
        // month: "",
        // year: "",
        // site_visit_target: "",
        // visit_target: "",
        // closing_target: "",
        // booking_target: "",
        // registration_target: "",
    });

    useFocusEffect(
        React.useCallback(() => {
            getCMList()
            return () => { };
        }, [navigation])
    );
    useEffect(() => {
        if (response?.status === 200) {
            setClosingManagers(response?.data)
        } else {
            // setClosingManagers([])
        }
    }, [response])
    useEffect(() => {
        if (AddTargetForCp?.response?.status === 200) {
          ErrorMessage({
            msg: AddTargetForCp?.response?.message,
            backgroundColor: GREEN_COLOR
          })
          dispatch(removeAddTarget())
          setTimeout(() => {
            setIsVisible(false);
            // navigation.goBack()
          }, 2000)
         // navigation.navigate("SourcingManager");
        }
      }, [AddTargetForCp]);
    const handleAddTarget = () => {
        dispatch(
          AddTargetForCpAction({
            user_id: selectedUserForTarget,
            ...targetForm,
          })
        );
        // navigation.navigate('PropertyScreenView')
      };
    const onPressEditTarget = (item: any) => {
        setSelectedUserForTarget([item._id]);
        setRoleIdForSelectedUser(item.role_id);
        setIsVisible(true);
      };
    const getCMList = () => {
        dispatch(getClosingManagerList({}))
    }

    const onRefresh = () => {
        getCMList()
    }
    const handleFilterApply = () => {
        getCMList()
    }

    const handleDrawerPress = () => {
        navigation.toggleDrawer();
    };
    const handleAddNewCM = (type: any, data: any) => {
        if (type === 'edit') {
            navigation.navigate('AddNewCM', { type, data })
        } else {
            navigation.navigate('AddNewCM')
        }
    };

    const onPressViews = (item: any) => {
        navigation.navigate('CMDetails', item)
    }

    return (
        <ClosingDetailsView
            handleDrawerPress={handleDrawerPress}
            filterisVisible={filterisVisible}
            setFilterisVisible={setFilterisVisible}
            handleAddNewCM={handleAddNewCM}
            onPressViews={onPressViews}
            status={status}
            setStatus={setStatus}
            ClosingManagers={ClosingManagers}
            onRefresh={onRefresh}
            onPressEditTarget={onPressEditTarget}
            handleAddTarget={handleAddTarget}
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            targetForm={targetForm}
            setTargetForm={setTargetForm}
            roleIdForSelectedUser={roleIdForSelectedUser}
        />
    )
}

export default ClosingDetailScreen